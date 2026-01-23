// Minnesota Data Center Tracker - Application Logic

// Initialize map with light tiles
const map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: true
}).setView([45.0, -93.5], 7);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

let markers = [];
let currentFilter = 'all';

// Get color based on status
function getMarkerColor(project) {
    return statusInfo[project.status]?.color || '#6b7280';
}

// Create custom marker icon with optional secondary indicator
function createMarkerIcon(project) {
    const color = getMarkerColor(project);
    const hasSecondary = project.secondaryStatus;

    // For projects with secondary status, show a combo marker
    if (hasSecondary) {
        const secondaryColor = statusInfo[project.secondaryStatus]?.color || '#6b7280';
        return L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="marker combo-marker" style="background: ${color};">
                <div class="marker-ring" style="border-color: ${secondaryColor};"></div>
            </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
    }

    return L.divIcon({
        className: 'marker-wrapper',
        html: `<div class="marker" style="background: ${color};"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

// Initialize markers
function initializeMarkers() {
    projectData.forEach(project => {
        if (project.lat && project.lng) {
            const marker = L.marker([project.lat, project.lng], {
                icon: createMarkerIcon(project)
            });

            const statusLabel = statusInfo[project.status]?.label || project.status;
            const popupContent = `
                <div class="popup-content">
                    <div class="popup-title">${project.name}</div>
                    <div class="popup-meta">
                        ${project.city}, ${project.county} County<br>
                        <strong>${statusLabel}</strong>
                        ${project.sqft ? ' · ' + formatSqft(project.sqft) : ''}
                    </div>
                    <button class="popup-btn" onclick="openProjectDetail(${project.id})">
                        View Details
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent);
            marker.projectId = project.id;
            marker.status = project.status;
            marker.secondaryStatus = project.secondaryStatus;
            markers.push(marker);
            marker.addTo(map);
        }
    });
}

// Filter markers
function filterMarkers(filterValue) {
    currentFilter = filterValue;

    markers.forEach(marker => {
        let shouldShow = true;

        if (filterValue !== 'all') {
            shouldShow = marker.status === filterValue || marker.secondaryStatus === filterValue;
        }

        if (shouldShow) {
            if (!map.hasLayer(marker)) marker.addTo(map);
        } else {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        }
    });

    // Update filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        const isActive = tab.dataset.filter === filterValue;
        tab.classList.toggle('active', isActive);
    });

    renderProjectList(filterValue);
}

// Format numbers
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    return num.toLocaleString();
}

function formatSqft(sqft) {
    if (!sqft) return '—';
    if (sqft >= 1000000) return (sqft / 1000000).toFixed(1) + 'M SF';
    return formatNumber(sqft) + ' SF';
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Render project list
function renderProjectList(filterValue = 'all') {
    const container = document.getElementById('project-list');
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filtered = projectData;

    // Apply status filter
    if (filterValue !== 'all') {
        filtered = filtered.filter(p => p.status === filterValue || p.secondaryStatus === filterValue);
    }

    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.city.toLowerCase().includes(searchTerm) ||
            p.county.toLowerCase().includes(searchTerm)
        );
    }

    // Sort: litigation first, then by status order, then by date
    filtered.sort((a, b) => {
        const orderA = statusInfo[a.status]?.order || 99;
        const orderB = statusInfo[b.status]?.order || 99;
        if (orderA !== orderB) return orderA - orderB;

        // Then by date (newest first)
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
    });

    container.innerHTML = filtered.map(project => {
        const statusLabel = statusInfo[project.status]?.label || project.status;
        const statusColor = statusInfo[project.status]?.color || '#6b7280';
        const hasLinks = project.sources && project.sources.some(s => s.url);
        const isLitigation = project.status === 'in_litigation';

        // Show secondary badge if exists
        let secondaryBadge = '';
        if (project.secondaryStatus) {
            const secLabel = statusInfo[project.secondaryStatus]?.label || project.secondaryStatus;
            const secColor = statusInfo[project.secondaryStatus]?.color || '#6b7280';
            secondaryBadge = `<span class="project-badge secondary" style="background: ${secColor}15; color: ${secColor};">${secLabel}</span>`;
        }

        return `
            <div class="project-item ${isLitigation ? 'litigation' : ''}" data-id="${project.id}" onclick="openProjectDetail(${project.id})">
                <div class="project-top">
                    <div class="project-name">${project.name}</div>
                    <div class="project-badges">
                        <span class="project-badge" style="background: ${statusColor}15; color: ${statusColor};">${statusLabel}</span>
                        ${secondaryBadge}
                    </div>
                </div>
                <div class="project-meta">
                    <span>${project.city}, ${project.county}</span>
                    ${project.sqft ? `<span>${formatSqft(project.sqft)}</span>` : ''}
                </div>
                <div class="project-status">${project.currentStatus}</div>
                ${project.litigation?.caseNumber ? `<div class="project-case">Case: ${project.litigation.caseNumber}</div>` : ''}
                ${hasLinks ? `
                    <div class="project-links">
                        ${project.sources.filter(s => s.url).slice(0, 2).map(s =>
                            `<a href="${s.url}" class="project-link" target="_blank" onclick="event.stopPropagation();">${s.name} →</a>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get permit status class
function getPermitStatusClass(status) {
    if (status === 'approved') return 'approved';
    if (status === 'in_progress') return 'in-progress';
    if (status === 'not_started') return 'not-started';
    if (status === 'withdrawn') return 'withdrawn';
    if (status === 'blocked') return 'blocked';
    return 'unknown';
}

// Get permit status label
function getPermitStatusLabel(status) {
    const labels = {
        approved: 'Approved',
        in_progress: 'In Progress',
        not_started: 'Not Started',
        withdrawn: 'Withdrawn',
        blocked: 'Blocked',
        unknown: 'Unknown'
    };
    return labels[status] || status;
}

// Open project detail panel
function openProjectDetail(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    const statusLabel = statusInfo[project.status]?.label || project.status;
    const statusColor = statusInfo[project.status]?.color || '#6b7280';

    // Header
    document.getElementById('detail-title').textContent = project.name;
    document.getElementById('detail-badge').textContent = statusLabel;
    document.getElementById('detail-badge').style.background = `${statusColor}15`;
    document.getElementById('detail-badge').style.color = statusColor;

    // Secondary badge
    const secondaryBadgeEl = document.getElementById('detail-secondary-badge');
    if (project.secondaryStatus && secondaryBadgeEl) {
        const secLabel = statusInfo[project.secondaryStatus]?.label || project.secondaryStatus;
        const secColor = statusInfo[project.secondaryStatus]?.color || '#6b7280';
        secondaryBadgeEl.textContent = secLabel;
        secondaryBadgeEl.style.background = `${secColor}15`;
        secondaryBadgeEl.style.color = secColor;
        secondaryBadgeEl.style.display = 'inline-block';
    } else if (secondaryBadgeEl) {
        secondaryBadgeEl.style.display = 'none';
    }

    // Location & Scale
    document.getElementById('detail-city').textContent = project.city;
    document.getElementById('detail-county').textContent = project.county + ' County';
    document.getElementById('detail-acres').textContent = project.acres ? project.acres + ' acres' : '—';
    document.getElementById('detail-sqft').textContent = formatSqft(project.sqft);

    // Status
    document.getElementById('detail-status').textContent = project.currentStatus || '—';

    // Litigation section
    const litigationSection = document.getElementById('litigation-section');
    if (project.litigation?.active && litigationSection) {
        litigationSection.style.display = 'block';
        document.getElementById('detail-case-number').textContent = project.litigation.caseNumber || '—';
        document.getElementById('detail-court').textContent = project.litigation.court || '—';
        document.getElementById('detail-litigation-status').textContent = project.litigation.status || '—';
    } else if (litigationSection) {
        litigationSection.style.display = 'none';
    }

    // Permits
    const permitsContainer = document.getElementById('detail-permits');
    if (project.permits) {
        const permitTypes = [
            { key: 'environmentalReview', label: 'Environmental Review' },
            { key: 'localZoning', label: 'Local Zoning' },
            { key: 'buildingPermit', label: 'Building Permit' },
            { key: 'utilities', label: 'Utility Agreements' }
        ];

        permitsContainer.innerHTML = permitTypes.map(pt => {
            const permit = project.permits[pt.key];
            if (!permit) return '';

            const statusClass = getPermitStatusClass(permit.status);
            const statusLabel = getPermitStatusLabel(permit.status);
            const typeLabel = permit.type ? ` (${permit.type})` : '';

            return `
                <div class="permit-row ${statusClass}">
                    <span class="permit-name">${pt.label}${typeLabel}</span>
                    <span class="permit-status ${statusClass}">${statusLabel}</span>
                </div>
                ${permit.detail ? `<div style="font-size: 0.75rem; color: var(--ink-faint); padding: 0 0.75rem 0.5rem; margin-top: -0.25rem;">${permit.detail}</div>` : ''}
            `;
        }).join('');
    }

    // Timeline
    const timelineSection = document.getElementById('timeline-section');
    const timelineContainer = document.getElementById('detail-timeline');
    if (project.timeline && project.timeline.length > 0) {
        timelineSection.style.display = 'block';
        // Sort by date descending (most recent first)
        const sortedTimeline = [...project.timeline].sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
        timelineContainer.innerHTML = sortedTimeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-date">${formatDate(item.date)}</div>
                <div class="timeline-event">${item.event}</div>
            </div>
        `).join('');
    } else {
        timelineSection.style.display = 'none';
    }

    // Notes
    const notesSection = document.getElementById('notes-section');
    if (project.notes) {
        notesSection.style.display = 'block';
        document.getElementById('detail-notes').textContent = project.notes;
    } else {
        notesSection.style.display = 'none';
    }

    // Sources
    const sourcesList = document.getElementById('detail-sources');
    if (project.sources && project.sources.length > 0) {
        sourcesList.innerHTML = project.sources.map(source => {
            if (source.url) {
                return `<li><a href="${source.url}" target="_blank">${source.name} →</a></li>`;
            } else {
                return `<li><span style="color: var(--ink-faint);">${source.name}</span></li>`;
            }
        }).join('');
    } else {
        sourcesList.innerHTML = '<li><span style="color: var(--ink-faint);">No sources available</span></li>';
    }

    // Show panel
    document.getElementById('detail-panel').classList.add('open');
    document.getElementById('detail-overlay').classList.add('visible');

    // Highlight project item
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.toggle('selected', parseInt(item.dataset.id) === projectId);
    });

    // Pan map
    if (project.lat && project.lng) {
        map.setView([project.lat, project.lng], 10, { animate: true });
        markers.forEach(marker => {
            if (marker.projectId === projectId) {
                marker.openPopup();
            }
        });
    }
}

// Close detail panel
function closeDetailPanel() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-overlay').classList.remove('visible');
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('selected');
    });
}

// Update statistics
function updateStats() {
    const stats = calculateStats();

    document.getElementById('total-projects').textContent = stats.totalProjects;
    document.getElementById('total-sqft').textContent = formatNumber(stats.totalSqft);
    document.getElementById('total-acres').textContent = formatNumber(stats.totalAcres);
    document.getElementById('litigation-count').textContent = stats.countByStatus.in_litigation;

    // Status counts
    document.getElementById('count-litigation').textContent = stats.countByStatus.in_litigation;
    document.getElementById('count-in-review').textContent = stats.countByStatus.in_review;
    document.getElementById('count-review-complete').textContent = stats.countByStatus.review_complete;
    document.getElementById('count-watching').textContent = stats.countByStatus.watching + stats.countByStatus.suspended;

    // Update last updated date
    const today = new Date();
    document.getElementById('last-update').textContent = today.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Download data
function downloadData() {
    const dataStr = JSON.stringify(projectData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mn-datacenter-projects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeMarkers();
    renderProjectList();
    updateStats();

    // Filter tab listeners
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            filterMarkers(filter);
        });
    });

    // Status card listeners (filter by status)
    document.querySelectorAll('.status-card').forEach(card => {
        card.addEventListener('click', () => {
            const status = card.dataset.status;
            filterMarkers(status);
        });
    });

    // Search listener
    document.getElementById('search-input').addEventListener('input', () => {
        renderProjectList(currentFilter);
    });

    // Close panel listeners
    document.getElementById('detail-close').addEventListener('click', closeDetailPanel);
    document.getElementById('detail-overlay').addEventListener('click', closeDetailPanel);

    // Download link
    document.getElementById('download-json').addEventListener('click', (e) => {
        e.preventDefault();
        downloadData();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetailPanel();
    });

    // Fit map to markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
});

window.openProjectDetail = openProjectDetail;
