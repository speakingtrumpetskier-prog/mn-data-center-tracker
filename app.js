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
    // Parse as local date to avoid timezone offset issues
    // Date string format: "YYYY-MM-DD"
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
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
        const isSuspendedWithLitigation = project.status === 'suspended' && project.secondaryStatus === 'in_litigation';
        if (project.secondaryStatus) {
            const secLabel = statusInfo[project.secondaryStatus]?.label || project.secondaryStatus;
            const secColor = statusInfo[project.secondaryStatus]?.color || '#6b7280';
            const secClass = isSuspendedWithLitigation ? 'litigation-secondary' : '';
            secondaryBadge = `<span class="project-badge secondary ${secClass}" style="background: ${secColor}15; color: ${secColor};">${secLabel}</span>`;
        }

        const primaryBadgeClass = isSuspendedWithLitigation ? 'suspended-with-litigation' : '';

        return `
            <div class="project-item ${isLitigation ? 'litigation' : ''}" data-id="${project.id}" onclick="openProjectDetail(${project.id})">
                <div class="project-top">
                    <div class="project-name">${project.name}</div>
                    <div class="project-badges">
                        <span class="project-badge ${primaryBadgeClass}" style="background: ${statusColor}15; color: ${statusColor};">${statusLabel}</span>
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
    const isSuspendedWithLitigation = project.status === 'suspended' && project.secondaryStatus === 'in_litigation';

    const detailBadgeEl = document.getElementById('detail-badge');
    detailBadgeEl.textContent = statusLabel;
    detailBadgeEl.style.background = `${statusColor}15`;
    detailBadgeEl.style.color = statusColor;

    // Add special styling for suspended with litigation
    if (isSuspendedWithLitigation) {
        detailBadgeEl.className = 'project-badge suspended-with-litigation';
    } else {
        detailBadgeEl.className = 'project-badge';
    }

    // Secondary badge
    const secondaryBadgeEl = document.getElementById('detail-secondary-badge');
    if (project.secondaryStatus && secondaryBadgeEl) {
        const secLabel = statusInfo[project.secondaryStatus]?.label || project.secondaryStatus;
        const secColor = statusInfo[project.secondaryStatus]?.color || '#6b7280';
        secondaryBadgeEl.textContent = secLabel;
        secondaryBadgeEl.style.background = `${secColor}15`;
        secondaryBadgeEl.style.color = secColor;
        secondaryBadgeEl.style.display = 'inline-block';

        // Add special styling for litigation secondary badge
        if (isSuspendedWithLitigation) {
            secondaryBadgeEl.className = 'project-badge secondary litigation-secondary';
        } else {
            secondaryBadgeEl.className = 'project-badge secondary';
        }
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
    document.getElementById('count-watching').textContent = stats.countByStatus.watching;

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

// ============================================
// Easter Eggs - Shhh!
// ============================================

// Easter Egg 1: Click title 7 times for swimming loon
(function() {
    let clickCount = 0;
    let clickTimer = null;
    const title = document.querySelector('.masthead-title h1');

    if (title) {
        title.addEventListener('click', function() {
            clickCount++;

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 2000);

            if (clickCount >= 7) {
                clickCount = 0;
                summonLoon();
            }
        });
    }

    function summonLoon() {
        const loon = document.getElementById('loon');

        if (loon && !loon.classList.contains('swimming')) {
            loon.classList.add('swimming');

            // Synthesize a more realistic loon tremolo call
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();

                // Create the haunting wail with reverb
                function createWail(startTime, startFreq, endFreq, duration) {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const vibrato = ctx.createOscillator();
                    const vibratoGain = ctx.createGain();

                    // Add tremolo for warbling effect
                    const tremolo = ctx.createOscillator();
                    const tremoloGain = ctx.createGain();
                    tremolo.frequency.value = 8;
                    tremoloGain.gain.value = 0.3;

                    // Vibrato for pitch modulation
                    vibrato.frequency.value = 5.5;
                    vibratoGain.gain.value = 20;
                    vibrato.connect(vibratoGain);
                    vibratoGain.connect(osc.frequency);

                    osc.connect(tremoloGain);
                    tremolo.connect(tremoloGain.gain);
                    tremoloGain.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';

                    // Volume envelope - fade in and out
                    gain.gain.setValueAtTime(0.001, startTime);
                    gain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.15);
                    gain.gain.setValueAtTime(0.15, startTime + duration - 0.4);
                    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

                    // Pitch: rise then fall (characteristic loon wail)
                    osc.frequency.setValueAtTime(startFreq, startTime);
                    osc.frequency.linearRampToValueAtTime(endFreq, startTime + duration * 0.35);
                    osc.frequency.linearRampToValueAtTime(startFreq * 0.65, startTime + duration);

                    vibrato.start(startTime);
                    tremolo.start(startTime);
                    osc.start(startTime);
                    osc.stop(startTime + duration);
                    vibrato.stop(startTime + duration);
                    tremolo.stop(startTime + duration);
                }

                // Three-part loon call (classic tremolo)
                createWail(ctx.currentTime, 550, 950, 1.4);
                createWail(ctx.currentTime + 1.5, 600, 880, 1.1);
                createWail(ctx.currentTime + 2.8, 520, 820, 1.3);

            } catch (e) {}

            setTimeout(() => {
                loon.classList.remove('swimming');
            }, 10000);
        }
    }
})();

// Easter Egg 2: "Public Version" button - toggles to "Light Industrial Development Watch"
(function() {
    const btn = document.getElementById('public-version-btn');
    const titleSubject = document.getElementById('title-subject');
    const sparkleContainer = document.getElementById('sparkle-container');
    let isPublicVersion = false;

    if (btn && titleSubject) {
        btn.addEventListener('click', function() {
            isPublicVersion = !isPublicVersion;

            // Create sparkles around the title
            createSparkles();

            // Fade out
            titleSubject.classList.add('fade-out');

            setTimeout(() => {
                // Swap text
                titleSubject.textContent = isPublicVersion ? 'Light Industrial Development' : 'Data Center';
                btn.textContent = isPublicVersion ? 'Real Version' : 'Public Version';

                // Fade in
                titleSubject.classList.remove('fade-out');
            }, 300);
        });
    }

    function createSparkles() {
        if (!sparkleContainer || !titleSubject) return;

        const rect = titleSubject.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position around the title
            const angle = (i / 12) * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.animationDelay = (Math.random() * 0.3) + 's';

            sparkleContainer.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => sparkle.remove(), 1500);
        }
    }
})();

// Easter Egg 3: The "98% Power Reduction" (Faribault EAW allegation)
// Click on Faribault's square footage 3 times in detail panel to trigger
(function() {
    let powerEggActive = false;

    // Watch for Faribault project detail opens
    const originalOpenDetail = window.openProjectDetail;
    window.openProjectDetail = function(projectId) {
        originalOpenDetail(projectId);

        const project = projectData.find(p => p.id === projectId);
        if (project && project.name.includes('Faribault')) {
            setTimeout(() => setupPowerEgg(), 100);
        }
    };

    function setupPowerEgg() {
        const sqftEl = document.getElementById('detail-sqft');
        if (!sqftEl || powerEggActive) return;

        let clickCount = 0;
        const handler = function() {
            clickCount++;
            if (clickCount >= 3) {
                activatePowerReduction();
                sqftEl.removeEventListener('click', handler);
            }
        };

        sqftEl.style.cursor = 'pointer';
        sqftEl.addEventListener('click', handler);
    }

    function activatePowerReduction() {
        powerEggActive = true;

        // Create overlay message
        const overlay = document.createElement('div');
        overlay.className = 'power-reduction-overlay';
        overlay.innerHTML = `
            <div class="power-reduction-content">
                <div class="power-reduction-title">⚡ Environmental Review Magic ⚡</div>
                <div class="power-reduction-stats">
                    <div class="power-stat">
                        <div class="power-label">Draft EAW Power Estimate</div>
                        <div class="power-value original">1,000,000 MWh/yr</div>
                    </div>
                    <div class="power-arrow">↓ 98% reduction ↓</div>
                    <div class="power-stat">
                        <div class="power-label">Final EAW Power Estimate</div>
                        <div class="power-value reduced">14,000 MWh/yr</div>
                    </div>
                </div>
                <div class="power-explanation">
                    According to MCEA's appeal, Faribault's greenhouse gas emissions estimate
                    dropped 98% between draft and final EAW—without explanation. The estimated
                    electricity consumption went from 1 million+ MWh/year to just 14,000 MWh/year.
                </div>
                <div class="power-citation">
                    Source: <a href="https://www.hometownsource.com/sun_thisweek/community/dakota_county/mcea-files-appeal-against-faribault-for-proposed-data-centers-inadequate-environmental-review/article_b7b730f0-e369-484b-9692-890b0252789e.html" target="_blank">MCEA Appeal Coverage</a>
                </div>
                <button class="power-close">Close</button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => overlay.classList.add('visible'), 10);

        // Animate the numbers
        setTimeout(() => {
            const originalValue = overlay.querySelector('.power-value.original');
            const reducedValue = overlay.querySelector('.power-value.reduced');

            // Glitch effect on original number
            let glitchCount = 0;
            const glitchInterval = setInterval(() => {
                const randomNum = Math.floor(Math.random() * 1000000);
                originalValue.textContent = `${randomNum.toLocaleString()} MWh/yr`;
                glitchCount++;

                if (glitchCount > 20) {
                    clearInterval(glitchInterval);
                    originalValue.textContent = '1,000,000 MWh/yr';
                    originalValue.classList.add('strikethrough');
                }
            }, 100);

            // Pulse the reduced value
            setTimeout(() => {
                reducedValue.classList.add('pulse');
            }, 2500);
        }, 500);

        // Close handler
        overlay.querySelector('.power-close').addEventListener('click', () => {
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.remove();
                powerEggActive = false;
            }, 300);
        });
    }
})();
