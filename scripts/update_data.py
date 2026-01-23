#!/usr/bin/env python3
"""
Weekly Data Update Script for Minnesota Data Center Watch

This script:
1. Scrapes the latest EQB Monitor for new projects
2. Checks for data center related developments
3. Updates data.js if new projects are found

Run manually or via GitHub Actions.
"""

import json
import os
import re
import requests
from datetime import datetime
from bs4 import BeautifulSoup

# Keywords indicating data center projects
DATA_CENTER_KEYWORDS = [
    'data center', 'datacenter', 'technology park', 'tech park',
    'server', 'hyperscale', 'colocation', 'cloud computing',
    'industrial auar', 'high-tech', 'digital infrastructure'
]

def fetch_latest_monitor():
    """Fetch the latest EQB Monitor bulletin."""
    print("Fetching EQB Monitor page...")

    # Get the main monitor page to find the latest bulletin
    response = requests.get("https://www.eqb.state.mn.us/eqb-monitor", timeout=30)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the current monitor link
    current_link = None
    for link in soup.find_all('a', href=True):
        if 'govdelivery.com' in link['href'] and 'bulletins' in link['href']:
            current_link = link['href']
            break

    if not current_link:
        print("Could not find current monitor link")
        return None

    print(f"Found monitor: {current_link}")

    # Fetch the bulletin
    response = requests.get(current_link, timeout=30)
    return response.text

def parse_monitor_for_projects(html_content):
    """Parse the monitor HTML for project information."""
    soup = BeautifulSoup(html_content, 'html.parser')
    projects = []

    # Look for EQB database links
    for link in soup.find_all('a', href=True):
        href = link['href']
        if 'eqb-search/project-detail' in href:
            # Extract project ID
            match = re.search(r'/project-detail/(\d+)', href)
            if match:
                project_id = match.group(1)

                # Get surrounding text for context
                parent = link.find_parent(['p', 'div', 'td', 'li'])
                context = parent.get_text(strip=True) if parent else ''

                projects.append({
                    'id': project_id,
                    'url': href,
                    'context': context[:500]
                })

    return projects

def is_data_center_related(text):
    """Check if text indicates a data center project."""
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in DATA_CENTER_KEYWORDS)

def load_current_data():
    """Load the current data.js file."""
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data.js')

    with open(data_path, 'r') as f:
        content = f.read()

    # Extract the projectData array
    match = re.search(r'const projectData = (\[[\s\S]*?\]);', content)
    if match:
        # This is a simplified approach - in production you might want proper JS parsing
        return content, match.group(1)

    return content, None

def get_existing_project_ids(data_js_content):
    """Extract existing project IDs from data.js."""
    ids = set()
    # Look for id: patterns
    for match in re.finditer(r'"?id"?\s*:\s*(\d+)', data_js_content):
        ids.add(match.group(1))
    return ids

def update_data_js(content, new_projects):
    """Update the data.js file with new projects."""
    # Update the last updated comment
    today = datetime.now().strftime('%B %d, %Y')
    content = re.sub(
        r'// Last updated:.*',
        f'// Last updated: {today}',
        content
    )

    # Add new projects notification (for now just log)
    # Full integration would require more sophisticated JS manipulation
    print(f"Would add {len(new_projects)} new projects")

    return content

def main():
    print("=" * 60)
    print("Minnesota Data Center Watch - Weekly Update")
    print("=" * 60)
    print()

    # Fetch latest monitor
    monitor_html = fetch_latest_monitor()
    if not monitor_html:
        print("Failed to fetch monitor. Exiting.")
        return

    # Parse for projects
    projects = parse_monitor_for_projects(monitor_html)
    print(f"Found {len(projects)} project links in monitor")

    # Filter for potential data center projects
    dc_projects = []
    for proj in projects:
        if is_data_center_related(proj['context']):
            dc_projects.append(proj)
            print(f"  [DC] Project {proj['id']}: {proj['context'][:100]}...")

    print(f"\nFound {len(dc_projects)} potential data center projects")

    # Load current data
    content, current_data = load_current_data()
    existing_ids = get_existing_project_ids(content) if current_data else set()
    print(f"Currently tracking {len(existing_ids)} projects")

    # Find new projects
    new_projects = [p for p in dc_projects if p['id'] not in existing_ids]

    if new_projects:
        print(f"\n*** FOUND {len(new_projects)} NEW PROJECTS ***")
        for proj in new_projects:
            print(f"  - Project {proj['id']}")

        # Update the data file
        updated_content = update_data_js(content, new_projects)

        # Write back
        data_path = os.path.join(os.path.dirname(__file__), '..', 'data.js')
        with open(data_path, 'w') as f:
            f.write(updated_content)

        print("\ndata.js updated!")
    else:
        print("\nNo new data center projects found.")

    print("\n" + "=" * 60)
    print("Update complete")
    print("=" * 60)

if __name__ == "__main__":
    main()
