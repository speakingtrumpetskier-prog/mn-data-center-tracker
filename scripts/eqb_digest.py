#!/usr/bin/env python3
"""
EQB Monitor Scraper and Analyzer
Automatically monitors the Minnesota Environmental Quality Board's weekly monitor
for data center projects and other interesting environmental reviews.

Uses Playwright for browser automation to access the EQB project database,
which is a JavaScript Single Page Application (SPA) requiring a real browser.
"""

import os
import re
import json
import smtplib
import requests
import time
import tempfile
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import PyPDF2
from io import BytesIO
from anthropic import Anthropic

# Try to import Playwright for browser automation
PLAYWRIGHT_AVAILABLE = False
try:
    from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    print("[INFO] Playwright not installed. Install with: pip install playwright && playwright install chromium")
    print("[INFO] Document downloads from EQB database will be limited without it.")


class EQBMonitorScraper:
    """Scrapes and analyzes the EQB Monitor publication."""

    BASE_URL = "https://www.eqb.state.mn.us/eqb-monitor"

    # Keywords for identifying data center related projects
    DATA_CENTER_KEYWORDS = [
        'data center', 'datacenter', 'server farm', 'colocation',
        'cloud computing', 'hyperscale', 'edge computing',
        'telecommunications facility', 'fiber optic', 'internet exchange'
    ]

    # General keywords for interesting projects
    INTERESTING_KEYWORDS = [
        'solar', 'wind', 'energy storage', 'battery', 'power plant',
        'transmission line', 'substation', 'mining', 'quarry',
        'warehouse', 'distribution center', 'manufacturing',
        'wastewater', 'landfill', 'pipeline'
    ]

    def __init__(self, output_dir: str = None):
        """Initialize scraper with output directory."""
        # Use script directory as base, not current working directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        if output_dir is None:
            self.output_dir = os.path.join(script_dir, "eqb_data")
        else:
            self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

        # Initialize Claude AI if API key is available
        self.anthropic_client = None
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        if api_key:
            print("[OK] Anthropic API key found - AI analysis ENABLED")
            self.anthropic_client = Anthropic(api_key=api_key)
        else:
            print("[!!] No Anthropic API key found - AI analysis DISABLED")
            print("  Set ANTHROPIC_API_KEY environment variable to enable AI features")

    def get_latest_monitor_url(self) -> Optional[Dict[str, str]]:
        """Fetch the URL of the latest monitor edition."""
        try:
            response = self.session.get(self.BASE_URL, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find the current monitor link
            current_monitor = soup.find(text=re.compile(r'Current Monitor:'))
            if current_monitor:
                # Find the parent element and then the link
                parent = current_monitor.find_parent()
                link = parent.find('a', href=re.compile(r'govdelivery\.com'))

                if link:
                    # Extract volume and date info
                    text = parent.get_text()
                    volume_match = re.search(r'Volume (\d+), Number (\d+)', text)
                    date_match = re.search(r'(\w+ \d+, \d{4})', text)

                    return {
                        'url': link['href'],
                        'volume': volume_match.group(1) if volume_match else 'Unknown',
                        'number': volume_match.group(2) if volume_match else 'Unknown',
                        'date': date_match.group(1) if date_match else 'Unknown'
                    }

            print("Could not find current monitor link")
            return None

        except Exception as e:
            print(f"Error fetching monitor index: {e}")
            return None

    def scrape_monitor_content(self, url: str) -> Optional[Dict]:
        """Scrape the content from a monitor bulletin."""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract the main content
            content = soup.find('div', class_='bulletin-content') or soup.find('body')

            if not content:
                print("Could not find bulletin content")
                return None

            # Parse projects
            projects = self._parse_projects(content)

            return {
                'url': url,
                'scraped_at': datetime.now().isoformat(),
                'raw_html': str(content),
                'projects': projects
            }

        except Exception as e:
            print(f"Error scraping monitor content: {e}")
            return None

    def _parse_projects(self, content) -> List[Dict]:
        """Parse individual projects from the monitor content."""
        projects = []
        soup = BeautifulSoup(str(content), 'html.parser')

        # Method 1: Find all links to the EQB project database
        # These are the primary project links in the monitor
        project_links = soup.find_all('a', href=re.compile(r'webapp\.pca\.state\.mn\.us/eqb-search/project-detail'))

        print(f"DEBUG: Found {len(project_links)} project database links")

        for link in project_links:
            project = {}
            project['project_url'] = link.get('href', '')
            project['title'] = link.get_text(strip=True)

            # Find the project section - look for nearest h3 or containing block
            # Each project has its own h3, so find that and get the NEXT sibling content
            h3_parent = link.find_parent('h3')

            if h3_parent:
                # Collect all content after this h3 until the next h3 (or end)
                section_elements = []
                for sibling in h3_parent.find_next_siblings():
                    # Stop at next h3 (next project)
                    if sibling.name == 'h3':
                        break
                    section_elements.append(sibling.get_text('\n', strip=True))

                section_text = '\n'.join(section_elements)
                project['raw_text'] = section_text

                # Extract location
                location_match = re.search(r'Location[:\s]+([^\n]+)', section_text, re.IGNORECASE)
                if location_match:
                    project['location'] = location_match.group(1).strip()
                else:
                    # Fallback: use title if no location found
                    project['location'] = project['title']

                # Extract review type
                for review_type in ['EAW', 'EIS', 'AUAR', 'Alternative Review', 'Alternative review', 'Large AUAR']:
                    if review_type.lower() in section_text.lower():
                        project['review_type'] = review_type
                        break

                # Find all URLs in the project section
                urls = []
                if h3_parent:
                    for sibling in h3_parent.find_next_siblings():
                        if sibling.name == 'h3':
                            break
                        for a in sibling.find_all('a', href=True):
                            href = a['href']
                            if href.startswith('http'):
                                urls.append(href)

                if urls:
                    project['document_urls'] = urls

            # Check for data center relevance
            text_lower = project.get('raw_text', '').lower() + ' ' + project.get('title', '').lower()
            project['is_data_center_related'] = self._check_keywords(
                text_lower, self.DATA_CENTER_KEYWORDS
            )

            # Check for general interest
            project['is_interesting'] = self._check_keywords(
                text_lower, self.INTERESTING_KEYWORDS
            )

            if project.get('raw_text') and len(project['raw_text']) > 50:
                projects.append(project)

        # Method 2: If we didn't find structured projects, fall back to parsing all paragraphs
        if len(projects) == 0:
            print("DEBUG: No structured projects found, using fallback paragraph parsing")
            paragraphs = soup.find_all(['p', 'div'], class_=lambda x: x != 'footer')

            for para in paragraphs:
                text = para.get_text('\n', strip=True)
                if len(text) < 100:
                    continue

                # Look for signs this is a project description
                if any(keyword in text.lower() for keyword in ['location:', 'eaw', 'eis', 'auar', 'review']):
                    project = {
                        'raw_text': text,
                        'title': text.split('\n')[0][:100] if text else 'Unknown'
                    }

                    # Extract location
                    location_match = re.search(r'Location:\s*([^\n]+)', text, re.IGNORECASE)
                    if location_match:
                        project['location'] = location_match.group(1).strip()

                    # Find URLs
                    urls = [a['href'] for a in para.find_all('a', href=True) if a['href'].startswith('http')]
                    if urls:
                        project['document_urls'] = urls

                    # Keywords
                    text_lower = text.lower()
                    project['is_data_center_related'] = self._check_keywords(text_lower, self.DATA_CENTER_KEYWORDS)
                    project['is_interesting'] = self._check_keywords(text_lower, self.INTERESTING_KEYWORDS)

                    projects.append(project)

        print(f"DEBUG: Parsed {len(projects)} total projects")
        return projects

    def _check_keywords(self, text: str, keywords: List[str]) -> bool:
        """Check if any keywords appear in text."""
        return any(keyword.lower() in text for keyword in keywords)

    def download_document(self, url: str) -> Optional[str]:
        """Download a PDF document and extract text."""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()

            # Check if it's a PDF
            if 'application/pdf' in response.headers.get('content-type', ''):
                pdf_file = BytesIO(response.content)
                reader = PyPDF2.PdfReader(pdf_file)

                text = ""
                for page in reader.pages:
                    text += page.extract_text()

                return text
            else:
                # If it's HTML, extract text
                soup = BeautifulSoup(response.text, 'html.parser')
                return soup.get_text()

        except Exception as e:
            print(f"Error downloading document from {url}: {e}")
            return None

    def analyze_projects(self, projects: List[Dict], monitor_info: Dict = None) -> Dict:
        """Analyze projects and generate findings."""
        analysis = {
            'total_projects': len(projects),
            'data_center_related': [],
            'interesting_projects': [],
            'all_projects': projects,
            'ai_insights': None,
            'monitor_date': monitor_info.get('date', 'Unknown') if monitor_info else 'Unknown'
        }

        for project in projects:
            if project.get('is_data_center_related'):
                analysis['data_center_related'].append(project)

            if project.get('is_interesting'):
                analysis['interesting_projects'].append(project)

        # Download and extract full document content for relevant projects
        if self.anthropic_client:
            print("\n" + "=" * 70)
            print("AI ANALYSIS ENABLED - Starting deep document analysis")
            print("=" * 70)
            try:
                print("\nStep 1: Downloading linked documents...")
                self._enrich_projects_with_documents(analysis)

                print("\nStep 2: Sending to Claude AI for analysis...")
                analysis['ai_insights'] = self._generate_ai_insights(analysis)

                if analysis['ai_insights']:
                    print("\n[OK] AI analysis completed successfully!")
                else:
                    print("\n[X] AI analysis returned no results (check errors above)")
            except Exception as e:
                print(f"\n[X] ERROR during AI analysis: {e}")
                import traceback
                traceback.print_exc()
        else:
            print("\n" + "=" * 70)
            print("AI ANALYSIS DISABLED - No API key found")
            print("=" * 70)

        return analysis

    def _download_document_via_api(self, project_url: str) -> Optional[str]:
        """
        Use the EQB API directly to get project details and download documents.
        This is more reliable than browser automation.
        Returns the extracted text from the downloaded PDF.
        """
        # Extract project ID from URL (e.g., /project-detail/70928 -> 70928)
        project_id_match = re.search(r'/project-detail/(\d+)', project_url)
        if not project_id_match:
            print(f"       [X] Could not extract project ID from URL")
            return None

        project_id = project_id_match.group(1)

        # EQB API endpoints
        api_base = "https://web-api.pca.state.mn.us/eqb-submittal"

        try:
            # First, get project details to find the document handle
            print(f"       Fetching project details via API (ID: {project_id})...")
            details_url = f"{api_base}/projects/details/{project_id}?si-id=0"

            response = requests.get(details_url, headers={
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }, timeout=30)

            if response.status_code != 200:
                print(f"       [X] API returned status {response.status_code}")
                return None

            data = response.json()

            # The API returns a nested array [[{...}, {...}]]
            if not data or not data[0]:
                print(f"       [X] No project data in API response")
                return None

            # Get the first (most recent) document entry with a valid handle
            doc_handle = None
            doc_extension = None

            for entry in data[0]:
                if entry.get('onbaseDocHandle') and entry.get('onbaseDocExtension'):
                    doc_handle = entry['onbaseDocHandle']
                    doc_extension = entry['onbaseDocExtension']
                    print(f"       Found document: handle={doc_handle}, ext={doc_extension}")
                    break

            if not doc_handle:
                print(f"       [X] No document handle found in project data")
                return None

            # Download the actual PDF
            print(f"       Downloading PDF...")
            doc_url = f"{api_base}/projects/attached-doc/{doc_handle}?doc-extension={doc_extension}"

            doc_response = requests.get(doc_url, headers={
                'Accept': 'application/pdf,*/*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }, timeout=120)  # Longer timeout for large PDFs

            if doc_response.status_code != 200:
                print(f"       [X] Document download returned status {doc_response.status_code}")
                return None

            # Check content type
            content_type = doc_response.headers.get('Content-Type', '')
            if 'pdf' not in content_type.lower() and len(doc_response.content) < 1000:
                print(f"       [X] Response doesn't appear to be a PDF (type: {content_type})")
                return None

            # Save to temp file and extract text
            download_dir = tempfile.mkdtemp()
            pdf_path = os.path.join(download_dir, f"doc_{doc_handle}.pdf")

            with open(pdf_path, 'wb') as f:
                f.write(doc_response.content)

            print(f"       Downloaded {len(doc_response.content):,} bytes")

            # Extract text from PDF
            try:
                with open(pdf_path, 'rb') as f:
                    reader = PyPDF2.PdfReader(f)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text() or ""

                # Clean up temp file
                os.remove(pdf_path)
                os.rmdir(download_dir)

                if len(text) > 100:
                    print(f"       [OK] Extracted {len(text):,} characters")
                    return text
                else:
                    print(f"       [X] PDF had minimal text ({len(text)} chars)")
                    return None

            except Exception as e:
                print(f"       [X] Error extracting PDF text: {e}")
                # Clean up
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                if os.path.exists(download_dir):
                    os.rmdir(download_dir)
                return None

        except requests.Timeout:
            print(f"       [X] API request timed out")
            return None
        except Exception as e:
            print(f"       [X] API error: {e}")
            return None

    def _download_document_via_browser(self, project_url: str, monitor_url: str = None) -> Optional[str]:
        """
        Use Playwright to navigate to the EQB project page and download the document.

        IMPORTANT: The Angular SPA only loads properly when navigating FROM the EQB Monitor page.
        We must start at the monitor, then click through to the project detail page.

        Returns the extracted text from the downloaded PDF.
        """
        if not PLAYWRIGHT_AVAILABLE:
            print("       [X] Playwright not available - cannot download from EQB database")
            return None

        # Extract project ID from URL (e.g., /project-detail/70928 -> 70928)
        project_id_match = re.search(r'/project-detail/(\d+)', project_url)
        if not project_id_match:
            print(f"       [X] Could not extract project ID from URL")
            return None

        project_id = project_id_match.group(1)

        # Create temp directory for downloads first
        download_dir = tempfile.mkdtemp()
        downloaded_file = None

        try:
            with sync_playwright() as p:
                # Use headless browser with download path configured
                browser = p.chromium.launch(headless=True)
                context = browser.new_context(
                    accept_downloads=True,
                    viewport={'width': 1280, 'height': 900}
                )
                page = context.new_page()

                # Track any PDF URLs we see in network requests
                pdf_urls = []

                def capture_request(request):
                    url = request.url
                    if 'attached-doc' in url or '.pdf' in url.lower():
                        pdf_urls.append(url)

                page.on('request', capture_request)

                # CRITICAL: Start from the EQB Monitor page, not the search page
                # The Angular app initializes properly when following links from the Monitor
                print(f"       Loading EQB Monitor page first...")

                # Use the most recent monitor URL if available, otherwise use latest
                start_url = monitor_url or "https://www.eqb.state.mn.us/eqb-monitor"
                page.goto(start_url, wait_until='networkidle', timeout=60000)
                time.sleep(2)

                # Now navigate directly to the project detail page
                print(f"       Navigating to project {project_id}...")
                page.goto(project_url, wait_until='networkidle', timeout=60000)

                # Wait for Angular to render - look for the table with document rows
                print(f"       Waiting for document table to load...")
                try:
                    # Wait for table rows that contain the download buttons
                    page.wait_for_selector('table tbody tr', timeout=30000)
                    time.sleep(3)  # Additional time for Angular to fully render
                except PlaywrightTimeout:
                    print(f"       [X] Document table did not load")
                    browser.close()
                    return None

                # Find the cloud download icons - they're in the "Download document" column
                # Look for mat-icon elements containing 'cloud_download' text
                cloud_buttons = page.query_selector_all('mat-icon')
                download_buttons = []
                for icon in cloud_buttons:
                    text = icon.inner_text() or ''
                    if 'cloud' in text.lower():
                        download_buttons.append(icon)

                if not download_buttons:
                    # Try alternative: look for buttons with cloud icons via class
                    buttons = page.query_selector_all('button mat-icon, a mat-icon')
                    for btn in buttons:
                        text = btn.inner_text() or ''
                        if 'cloud' in text.lower():
                            download_buttons.append(btn)

                if not download_buttons:
                    print(f"       [X] No download buttons found on page")
                    # Debug: print what we see
                    body_text = page.inner_text('body')[:300]
                    print(f"       Page content: {body_text}")
                    browser.close()
                    return None

                print(f"       Found {len(download_buttons)} download button(s)")

                # Click the LAST download button (bottom row = most recent document)
                # This corresponds to "EIS need decision" or similar latest step
                button = download_buttons[-1]

                # Scroll to make sure it's visible
                button.scroll_into_view_if_needed()
                time.sleep(1)

                # Clear captured URLs before clicking
                pdf_urls.clear()

                try:
                    # Try standard download flow
                    with page.expect_download(timeout=30000) as download_info:
                        button.click()
                        print(f"       Clicked download button, waiting for download...")

                    download = download_info.value
                    downloaded_file = os.path.join(download_dir, download.suggested_filename)
                    download.save_as(downloaded_file)
                    print(f"       Downloaded: {download.suggested_filename}")

                except PlaywrightTimeout:
                    print(f"       [X] Standard download timed out, checking alternatives...")

                    # Check if we captured any PDF URLs from network
                    if pdf_urls:
                        pdf_url = pdf_urls[-1]
                        print(f"       Found PDF URL: {pdf_url[:70]}...")

                        # Download using requests with browser cookies
                        cookies = context.cookies()
                        cookie_str = '; '.join([f"{c['name']}={c['value']}" for c in cookies])

                        resp = requests.get(pdf_url, headers={
                            'Cookie': cookie_str,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }, timeout=60)

                        if resp.status_code == 200 and len(resp.content) > 1000:
                            downloaded_file = os.path.join(download_dir, f"doc_{project_id}.pdf")
                            with open(downloaded_file, 'wb') as f:
                                f.write(resp.content)
                            print(f"       Downloaded via URL: {len(resp.content):,} bytes")
                        else:
                            print(f"       [X] Download failed: status {resp.status_code}")
                    else:
                        # Try clicking again and check for new tab
                        print(f"       Trying popup/new tab detection...")
                        try:
                            with context.expect_page(timeout=15000) as new_page_info:
                                button.click()
                            new_page = new_page_info.value
                            new_page.wait_for_load_state('networkidle', timeout=30000)
                            new_url = new_page.url

                            if '.pdf' in new_url.lower() or 'attached' in new_url.lower():
                                print(f"       Found PDF in new tab")
                                resp = requests.get(new_url, timeout=60)
                                if resp.status_code == 200 and len(resp.content) > 1000:
                                    downloaded_file = os.path.join(download_dir, f"doc_{project_id}.pdf")
                                    with open(downloaded_file, 'wb') as f:
                                        f.write(resp.content)
                            new_page.close()
                        except PlaywrightTimeout:
                            print(f"       [X] No popup detected")

                browser.close()

                # Extract text from downloaded PDF
                if downloaded_file and os.path.exists(downloaded_file):
                    try:
                        with open(downloaded_file, 'rb') as f:
                            reader = PyPDF2.PdfReader(f)
                            text = ""
                            for page_obj in reader.pages:
                                text += page_obj.extract_text() or ""

                        # Clean up
                        os.remove(downloaded_file)
                        try:
                            os.rmdir(download_dir)
                        except:
                            pass

                        if len(text) > 100:
                            print(f"       [OK] Extracted {len(text):,} characters")
                            return text
                        else:
                            print(f"       [X] PDF had minimal text ({len(text)} chars)")
                            return None
                    except Exception as e:
                        print(f"       [X] Error extracting PDF text: {e}")
                        return None

                return None

        except PlaywrightTimeout:
            print(f"       [X] Browser timeout")
            return None
        except Exception as e:
            print(f"       [X] Browser error: {e}")
            return None

    def _fetch_project_documents_from_database(self, project_url: str) -> List[str]:
        """
        Fetch document URLs from the EQB project detail page.
        NOTE: This is a legacy function - we now use _download_document_via_api() directly.
        """
        # The EQB site is a JavaScript SPA - BeautifulSoup can't see the rendered content
        # We now use the API directly via _download_document_via_api()
        return []

    def _enrich_projects_with_documents(self, analysis: Dict):
        """Download and extract TEXT from project documents (no images/tokens wasted)."""
        # Download documents for ALL projects (up to reasonable limit)
        # Don't pre-filter - let Claude decide what's interesting
        all_projects = analysis['all_projects'][:10]  # Top 10 by recency

        print(f"\nScanning {len(all_projects)} projects for documents...")

        if PLAYWRIGHT_AVAILABLE:
            print("[INFO] Playwright available - will use browser to download from EQB database")
        else:
            print("[INFO] Playwright not available - limited to direct PDF links only")

        projects_with_docs = 0
        for i, project in enumerate(all_projects, 1):
            location = project.get('location', project.get('title', 'Unknown'))[:40]
            print(f"\n  [{i}/{len(all_projects)}] {location}")

            project_url = project.get('project_url')
            document_urls = project.get('document_urls', [])
            document_text = None

            # METHOD 1: If this is an EQB database link, try API first (faster/more reliable)
            if project_url and 'webapp.pca.state.mn.us' in project_url:
                print(f"       Trying EQB API to download document...")
                document_text = self._download_document_via_api(project_url)

                # Fall back to browser automation if API fails
                if not document_text and PLAYWRIGHT_AVAILABLE:
                    print(f"       API failed, trying browser automation...")
                    document_text = self._download_document_via_browser(project_url)

                if document_text:
                    project['document_full_text'] = document_text
                    projects_with_docs += 1
                    continue  # Got document, move to next project

            # METHOD 2: Try direct PDF links from the monitor email
            if document_urls:
                # Filter to actual downloadable PDFs
                direct_pdfs = [url for url in document_urls if '.pdf' in url.lower()]
                download_links = [url for url in document_urls
                                 if '/download' in url.lower()
                                 and url not in direct_pdfs]
                doc_viewers = [url for url in document_urls
                              if 'document' in url.lower()
                              and '/api/' not in url.lower()
                              and url not in direct_pdfs
                              and url not in download_links]

                pdf_urls = direct_pdfs + download_links + doc_viewers

                if pdf_urls:
                    print(f"       Found {len(pdf_urls)} direct document link(s)")
                    doc_url = pdf_urls[0]
                    print(f"       Downloading: {doc_url[:60]}...")

                    document_text = self.download_document(doc_url)
                    if document_text:
                        project['document_full_text'] = document_text
                        projects_with_docs += 1
                        print(f"       [OK] Extracted {len(document_text):,} characters")
                        continue

            # METHOD 3: Follow RGU website links to find PDF documents
            if document_urls and not document_text:
                rgu_links = [url for url in document_urls
                            if not url.endswith('.pdf')
                            and 'mailto:' not in url
                            and 'webapp.pca.state.mn.us' not in url
                            and 'govdelivery' not in url]

                for rgu_url in rgu_links[:2]:  # Only try first 2 RGU links
                    print(f"       Checking RGU website for PDFs: {rgu_url[:50]}...")
                    try:
                        resp = requests.get(rgu_url, timeout=15, headers={
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        })
                        if resp.status_code == 200:
                            # Find PDF links on the page
                            from urllib.parse import urljoin
                            page_soup = BeautifulSoup(resp.text, 'html.parser')
                            pdf_links = []
                            for a in page_soup.find_all('a', href=True):
                                href = a['href']
                                if '.pdf' in href.lower():
                                    full_url = urljoin(rgu_url, href)
                                    # Prefer EAW/EIS PDFs
                                    if any(kw in href.lower() for kw in ['eaw', 'eis', 'auar', 'assessment', 'worksheet']):
                                        pdf_links.insert(0, full_url)
                                    else:
                                        pdf_links.append(full_url)

                            if pdf_links:
                                print(f"       Found {len(pdf_links)} PDF(s) on RGU site")
                                document_text = self.download_document(pdf_links[0])
                                if document_text:
                                    project['document_full_text'] = document_text
                                    projects_with_docs += 1
                                    print(f"       [OK] Extracted {len(document_text):,} characters from RGU site")
                                    break
                    except Exception as e:
                        print(f"       [X] Error checking RGU site: {e}")

            # No document found
            if not document_text:
                if project_url and 'webapp.pca.state.mn.us' in project_url and not PLAYWRIGHT_AVAILABLE:
                    print(f"       [X] EQB database link - needs Playwright to download")
                else:
                    print(f"       [X] No downloadable documents found")

        print(f"\n{'='*70}")
        print(f"Summary: Successfully extracted documents from {projects_with_docs}/{len(all_projects)} projects")
        print(f"{'='*70}")

        if projects_with_docs == 0:
            print("\nWARNING: No documents could be extracted!")
            if not PLAYWRIGHT_AVAILABLE:
                print("TIP: Install Playwright to download from EQB database:")
                print("     pip install playwright && playwright install chromium")
            print("Claude will analyze based on monitor summaries only.")

    def _analyze_project_batch(self, projects: List[Dict], batch_num: int, total_batches: int) -> str:
        """Analyze a batch of projects and return summary."""
        prompt_parts = [
            f"You are analyzing BATCH {batch_num} of {total_batches} from Minnesota's EQB Monitor.",
            "Provide a detailed analysis of each project below.",
            "",
            "For each project, note:",
            "- Key facts: MW, acres, gallons/day, tons, jobs, dollars, timelines",
            "- Is it a data center? (Look for signs even if not explicitly stated)",
            "- Environmental concerns or red flags",
            "- One-sentence summary",
            "",
            "ACCURACY REQUIREMENTS:",
            "- ONLY cite numbers that appear VERBATIM in the document text below",
            "- ONLY attribute comments to an agency if the document explicitly names that agency",
            "- If you can't find the exact number, say 'not specified in document'",
            "- When citing agency comments, quote directly: 'DNR stated: \"[exact text]\"'",
            "- Do NOT estimate, infer, or round numbers - use exact figures from the source",
            "",
            "=" * 70
        ]

        for i, p in enumerate(projects, 1):
            prompt_parts.append(f"\n[Project {i}]")
            prompt_parts.append(f"Location: {p.get('location', 'Unknown')}")
            prompt_parts.append(f"Review Type: {p.get('review_type', 'Unknown')}")
            prompt_parts.append(f"\nMonitor Listing: {p.get('raw_text', '')[:500]}")
            if p.get('document_full_text'):
                prompt_parts.append(f"\n--- FULL DOCUMENT ---")
                # Give each project in batch generous space (40k chars)
                prompt_parts.append(p['document_full_text'][:40000])
                prompt_parts.append("--- END DOCUMENT ---\n")

        prompt_parts.append("\nProvide your analysis in a structured format for each project.")
        prompt_parts.append("Remember: cite only what's in the documents. Say 'not specified' if unsure.")

        message = self.anthropic_client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=2000,
            messages=[{"role": "user", "content": "\n".join(prompt_parts)}]
        )
        return message.content[0].text

    def _generate_ai_insights(self, analysis: Dict) -> Optional[str]:
        """Use Claude AI to generate insightful analysis. Uses batching for large monitors."""
        try:
            # Get ALL projects with documents (up to 15)
            projects_with_docs = [
                p for p in analysis['all_projects'][:15]
                if p.get('document_full_text')
            ]

            projects_without_docs = [
                p for p in analysis['all_projects'][:15]
                if not p.get('document_full_text')
            ]

            num_projects = len(projects_with_docs)
            BATCH_THRESHOLD = 6  # If more than 6 projects with docs, use batching

            # Decide whether to use batching
            if num_projects > BATCH_THRESHOLD:
                print(f"  Large monitor ({num_projects} projects) - using batched analysis")
                return self._generate_batched_insights(analysis, projects_with_docs, projects_without_docs)

            # Standard single-query approach for smaller monitors
            monitor_date = analysis.get('monitor_date', 'Unknown')
            prompt_parts = [
                "You are analyzing Minnesota's Environmental Quality Board Monitor.",
                f"MONITOR DATE: {monitor_date}",
                "(Use this exact date in your response header. Do not make up a different date.)",
                "",
                "IMPORTANT: Don't assume you know which projects are 'data centers' based on keywords.",
                "Read the actual documents carefully. Sometimes a 'telecommunications facility' is a ",
                "data center. Sometimes a 'warehouse' is a data center. Sometimes things that sound",
                "like data centers are just... warehouses. Let the documents tell you.",
                "",
                f"This monitor contains {analysis['total_projects']} total projects.",
                f"Full documents retrieved for: {len(projects_with_docs)} projects",
                "",
                "=" * 70,
                "ALL PROJECTS WITH FULL DOCUMENTS:",
                "=" * 70
            ]

            # With fewer projects, give each more space
            chars_per_project = min(50000, 150000 // max(num_projects, 1))
            print(f"  Token budget: {chars_per_project:,} chars per project ({num_projects} projects)")

            for i, p in enumerate(projects_with_docs, 1):
                prompt_parts.append(f"\n[Project {i}]")
                prompt_parts.append(f"Location: {p.get('location', 'Unknown')}")
                prompt_parts.append(f"Review Type: {p.get('review_type', 'Unknown')}")
                prompt_parts.append(f"\nMonitor Listing: {p.get('raw_text', '')[:400]}")
                prompt_parts.append(f"\n--- FULL DOCUMENT (TEXT EXTRACTED FROM PDF) ---")
                doc_text = p['document_full_text'][:chars_per_project]
                if len(p['document_full_text']) > chars_per_project:
                    doc_text += f"\n[...truncated, {len(p['document_full_text']) - chars_per_project:,} chars omitted...]"
                prompt_parts.append(doc_text)
                prompt_parts.append("--- END DOCUMENT ---\n")

            if projects_without_docs:
                prompt_parts.append("\n" + "=" * 70)
                prompt_parts.append("OTHER PROJECTS (monitor listing only, no full docs):")
                prompt_parts.append("=" * 70)
                for i, p in enumerate(projects_without_docs, 1):
                    prompt_parts.append(f"\n[{i}] {p.get('location', 'Unknown')}")
                    prompt_parts.append(f"{p.get('raw_text', '')[:200]}...")

            prompt_parts.extend([
                "",
                "=" * 70,
                "YOUR TASK:",
                "=" * 70,
                "",
                "Write a policy briefing in THREE sections:",
                "",
                "SECTION 1 - OVERVIEW (2-3 sentences):",
                "State what's in the monitor. No throat-clearing. No 'deserves scrutiny' or",
                "'raises questions'. Just: what projects, what they are, any red flags.",
                "Start with facts, not commentary.",
                "",
                "SECTION 2 - PROJECT ANALYSIS (300-400 words):",
                "Your job: surface what the monitor itself doesn't highlight. Focus on:",
                "   - AGENCY COMMENTS: What did DNR, Met Council, MPCA, etc. flag? These are gold.",
                "   - RED FLAGS: What looks off? Inconsistent numbers, vague descriptions, suspicious timing?",
                "   - WHAT IT ACTUALLY IS: Especially data centers hiding as 'tech campus' or 'industrial'",
                "   - KEY NUMBERS: MW, acres, gallons/day, tons, but only the ones that matter",
                "",
                "Keep it tight. Each project gets 1-2 paragraphs max. Skip projects that are routine.",
                "Don't summarize what the monitor already says clearly. Add value.",
                "",
                "CRITICAL - ACCURACY REQUIREMENTS (read carefully!):",
                "   - ONLY cite numbers that appear VERBATIM in the source documents above",
                "   - ONLY attribute comments to agencies if the document explicitly names that agency",
                "   - If you're unsure which agency said something, say 'one commenter noted' not 'DNR said'",
                "   - If a number isn't in the documents, say 'not specified' - do NOT estimate or infer",
                "   - When citing a specific fact, you can quote the source: 'The EAW states: \"[exact text]\"'",
                "   - Double-check your numbers against the source before including them",
                "   - It is MUCH better to say 'the document discusses water usage' than to cite a wrong number",
                "   - Common errors to avoid: mixing up projects, attributing comments to wrong agencies,",
                "     confusing maximum vs. average values, or citing numbers from the wrong scenario",
                "",
                "IMPORTANT - DETECTING HIDDEN DATA CENTERS:",
                "AUARs (Alternative Urban Areawide Reviews) for 'industrial parks' or 'tech campuses'",
                "have historically been used to obscure data center development. Be suspicious of:",
                "   - Generic names like 'technology campus', 'industrial park', 'business park'",
                "   - Unusually high water usage (millions of gallons/day for 'light industrial')",
                "   - Noise analysis focused on HVAC/ventilation/cooling equipment",
                "   - Large electrical infrastructure (substations, MW capacity) for the stated use",
                "   - References to 'mission critical', 'redundant power', 'backup generators'",
                "   - Vague tenant descriptions or 'flexible' building specifications",
                "   - Comments from utilities about grid capacity or power infrastructure",
                "If you see these signs, flag the project as a potential data center even if not stated.",
                "",
                "SECTION 3 - QUICK HITS:",
                "One sentence per project. Factual, specific, useful.",
                "",
                "SECTION 4 - WEEKLY VISUAL (required! this is the fun part!):",
                "",
                "Create ONE data visualization using EMAIL-SAFE HTML (tables with inline styles).",
                "",
                "CRITICAL: Email clients (Gmail, Outlook) DO NOT support SVG or <style> blocks!",
                "You MUST use HTML tables with inline styles only. This is the only way it will render.",
                "",
                "EXAMPLE - a horizontal bar chart comparing water usage:",
                "<div class='weekly-visual'>",
                "<table width='100%' cellpadding='8' cellspacing='0' style='font-family: Arial, sans-serif; font-size: 14px;'>",
                "  <tr>",
                "    <td width='140' style='color: #2d2d2d;'>Monticello</td>",
                "    <td><div style='background: #4a5f4e; height: 24px; width: 85%; border-radius: 4px;'></div></td>",
                "    <td width='80' style='color: #666; text-align: right;'>3.4 MGD</td>",
                "  </tr>",
                "  <tr>",
                "    <td style='color: #2d2d2d;'>Typical Industrial</td>",
                "    <td><div style='background: #6b8e73; height: 24px; width: 20%; border-radius: 4px;'></div></td>",
                "    <td style='color: #666; text-align: right;'>0.8 MGD</td>",
                "  </tr>",
                "</table>",
                "<p class='caption' style='text-align: center; color: #666; font-size: 13px; margin-top: 12px;'>",
                "  Water demand comparison: one of these is not like the others.",
                "</p>",
                "</div>",
                "",
                "IDEAS (pick one that fits this week's data):",
                "   - Horizontal bar chart comparing project sizes (acres, MGD, MW)",
                "   - Stacked comparison table with colored cells",
                "   - Simple gauge using nested divs (filled vs empty)",
                "   - County/region breakdown as colored table rows",
                "   - Before/after comparison with two columns",
                "",
                "REQUIREMENTS:",
                "   - Use ONLY: <table>, <tr>, <td>, <div>, <span>, <p>",
                "   - ALL styles must be inline (style='...' on each element)",
                "   - NO <style> blocks, NO <svg>, NO @keyframes",
                "   - Use colors: #4a5f4e (dark green), #6b8e73 (light green), #2d2d2d (text)",
                "   - Include a caption explaining what the visual shows",
                "   - Wrap everything in <div class='weekly-visual'>",
                "",
                "VERY IMPORTANT: Do NOT use markdown code blocks!",
                "Output the raw HTML directly. This MUST render in Gmail.",
                "",
                "=" * 70,
                "WRITING STYLE - READ CAREFULLY:",
                "=" * 70,
                "",
                "Model your voice on Matt Levine's Bloomberg 'Money Stuff' newsletter:",
                "   - Conversational and lively, but focused. Not dry, not jokey.",
                "   - You can be opinionated. Say what you think is going on.",
                "   - Humor emerges from the material itself, never forced.",
                "   - Explain complex things simply without condescension.",
                "   - Use concrete details; avoid vague assessments.",
                "   - Short sentences mixed with longer ones. Vary the rhythm.",
                "   - If something is absurd, state it plainly. Don't editorialize.",
                "   - KEEP IT READABLE. White space is good. Don't write walls of text.",
                "",
                "ABSOLUTELY DO NOT USE THESE AI TELLS:",
                "   - Em dashes (--) - use commas, periods, or parentheses instead",
                "   - 'This isn't your typical...' or 'We're talking about...'",
                "   - 'What's genuinely interesting...' or 'What's particularly noteworthy...'",
                "   - 'deserves particular scrutiny' or 'warrants attention' or 'bears watching'",
                "   - 'unusual combination of X and Y' - just state what X and Y are",
                "   - Words: delve, tapestry, vibrant, landscape, realm, embark, pivotal,",
                "     robust, comprehensive, multifaceted, navigate, foster, leverage,",
                "     elevate, underscore, nuanced, paradigm, testament, beacon, symphony,",
                "     scrutiny, notable, noteworthy, remarkable, extraordinary",
                "   - Rule of three lists ('X, Y, and Z' repeatedly)",
                "   - Rhetorical questions",
                "   - Sarcastic asides or snark ('because nothing says X like Y')",
                "   - Starting sentences with 'Meanwhile,' or 'Interestingly,'",
                "   - The word 'seems' when you mean 'is'",
                "   - Passive voice hedging ('it could be argued that...')",
                "   - Fluffy intros that 'set up' the analysis - just start with the facts",
                "",
                "Good example: 'The quarry will produce 750,000 tons of aggregate annually",
                "and generate 160 truck trips per day. The site is 800 feet from Lost Valley",
                "Prairie, a state Scientific and Natural Area. DNR flagged concerns about",
                "blasting impacts on rare species. The township approved it anyway.'",
                "",
                "Bad example: 'This isn't your typical gravel pit--we're talking about an",
                "industrial-scale mining operation that seems intent on transforming the",
                "vibrant natural landscape into something far less picturesque.'",
                "",
                "Write like a well-informed person explaining things to a smart friend.",
                "Be direct. Be specific. Let the facts speak."
            ])

            full_prompt = "\n".join(prompt_parts)

            print("Sending documents to Claude for analysis...")
            print(f"  Prompt size: {len(full_prompt):,} characters")
            print(f"  Analyzing {len(projects_with_docs)} projects with full documents")

            message = self.anthropic_client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=5000,  # Plenty of room for analysis + full SVG visual
                messages=[{
                    "role": "user",
                    "content": full_prompt
                }]
            )

            result = message.content[0].text
            # Strip any accidental markdown code blocks
            result = re.sub(r'```html\s*', '', result)
            result = re.sub(r'```\s*$', '', result)
            result = re.sub(r'```', '', result)
            return result

        except Exception as e:
            print(f"Error generating AI insights: {e}")
            import traceback
            traceback.print_exc()
            return None

    def _generate_batched_insights(self, analysis: Dict, projects_with_docs: List[Dict],
                                    projects_without_docs: List[Dict]) -> Optional[str]:
        """Handle large monitors by analyzing in batches, then synthesizing."""
        try:
            # Split projects into batches of 3-4
            batch_size = 3
            batches = [projects_with_docs[i:i+batch_size]
                      for i in range(0, len(projects_with_docs), batch_size)]

            print(f"  Splitting into {len(batches)} batches of ~{batch_size} projects each")

            # Analyze each batch
            batch_summaries = []
            for i, batch in enumerate(batches, 1):
                print(f"  Analyzing batch {i}/{len(batches)}...")
                summary = self._analyze_project_batch(batch, i, len(batches))
                batch_summaries.append(summary)

            # Now synthesize all batch summaries into final digest
            print(f"  Synthesizing final analysis from {len(batches)} batches...")

            monitor_date = analysis.get('monitor_date', 'Unknown')
            synthesis_prompt = [
                "You have analyzed Minnesota's EQB Monitor in batches. Below are your analyses.",
                "Now synthesize these into a SINGLE cohesive policy briefing.",
                "",
                f"MONITOR DATE: {monitor_date}",
                "(Use this exact date in your response header. Do not make up a different date.)",
                "",
                f"Total projects in this monitor: {analysis['total_projects']}",
                f"Projects with full documents: {len(projects_with_docs)}",
                "",
                "=" * 70,
                "YOUR BATCH ANALYSES:",
                "=" * 70,
            ]

            for i, summary in enumerate(batch_summaries, 1):
                synthesis_prompt.append(f"\n--- BATCH {i} ANALYSIS ---")
                synthesis_prompt.append(summary)

            if projects_without_docs:
                synthesis_prompt.append("\n--- PROJECTS WITHOUT FULL DOCS ---")
                for p in projects_without_docs:
                    synthesis_prompt.append(f"- {p.get('location', 'Unknown')}: {p.get('raw_text', '')[:150]}...")

            synthesis_prompt.extend([
                "",
                "=" * 70,
                "SYNTHESIZE INTO FINAL BRIEFING:",
                "=" * 70,
                "",
                "Write a policy briefing in THREE sections:",
                "",
                "SECTION 1 - OVERVIEW (2-3 sentences):",
                "What's the headline this week?",
                "",
                "SECTION 2 - PROJECT ANALYSIS (500-700 words):",
                "Synthesize all the projects into a coherent narrative. Group related projects.",
                "Highlight the most significant developments. Note any data centers (confirmed or suspected).",
                "",
                "ACCURACY REQUIREMENTS:",
                "   - ONLY cite numbers from your batch analyses above - do not invent new numbers",
                "   - ONLY attribute comments to agencies if your batch analysis explicitly named them",
                "   - If unsure which agency, say 'one commenter noted' not 'DNR said'",
                "   - Say 'not specified' rather than estimate or infer missing numbers",
                "   - Double-check facts against what you actually wrote in the batch analyses",
                "",
                "SECTION 3 - QUICK HITS:",
                "One sentence per project. Factual, specific.",
                "",
                "SECTION 4 - WEEKLY VISUAL (required!):",
                "Create ONE data visualization using EMAIL-SAFE HTML only.",
                "CRITICAL: NO SVG, NO <style> blocks - email clients strip these!",
                "Use HTML <table> with inline styles (style='...' on each element).",
                "Example: horizontal bar chart using <div> inside <td> with background colors.",
                "Colors: #4a5f4e (dark green), #6b8e73 (light green), #2d2d2d (text).",
                "Include a <p class='caption'> explaining the visual.",
                "Do NOT use markdown code blocks!",
                "",
                "WRITING STYLE: Conversational, deadpan like Matt Levine. No em dashes.",
                "Avoid: 'delve', 'tapestry', 'vibrant', 'landscape', sarcastic asides.",
                "Be direct. Let the facts speak."
            ])

            message = self.anthropic_client.messages.create(
                model="claude-sonnet-4-5-20250929",
                max_tokens=6000,
                messages=[{"role": "user", "content": "\n".join(synthesis_prompt)}]
            )

            result = message.content[0].text
            # Strip any accidental markdown code blocks
            result = re.sub(r'```html\s*', '', result)
            result = re.sub(r'```\s*$', '', result)
            result = re.sub(r'```', '', result)
            return result

        except Exception as e:
            print(f"Error in batched analysis: {e}")
            import traceback
            traceback.print_exc()
            return None

    def generate_digest(self, monitor_info: Dict, content: Dict, analysis: Dict) -> str:
        """Generate a human-readable digest."""
        digest = []
        digest.append("=" * 70)
        digest.append("EQB MONITOR DIGEST")
        digest.append("=" * 70)
        digest.append(f"Monitor Date: {monitor_info.get('date', 'Unknown')}")
        digest.append(f"Volume: {monitor_info.get('volume', 'Unknown')}, Number: {monitor_info.get('number', 'Unknown')}")
        digest.append(f"Scraped: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        digest.append(f"Source: {monitor_info.get('url', 'Unknown')}")
        digest.append("=" * 70)
        digest.append("")

        # AI-Generated Insights
        if analysis.get('ai_insights'):
            digest.append("KEY INSIGHTS (AI Analysis)")
            digest.append("-" * 70)
            digest.append(analysis['ai_insights'])
            digest.append("")
            digest.append("=" * 70)
            digest.append("")

        # Summary
        digest.append("QUICK STATS")
        digest.append("-" * 70)
        digest.append(f"Total Projects: {analysis['total_projects']}")
        digest.append(f"Data Center Related: {len(analysis['data_center_related'])}")
        digest.append(f"Other Interesting Projects: {len(analysis['interesting_projects'])}")
        digest.append("")

        # Data Center Projects
        if analysis['data_center_related']:
            digest.append("=" * 70)
            digest.append("DATA CENTER RELATED PROJECTS")
            digest.append("=" * 70)
            for i, project in enumerate(analysis['data_center_related'], 1):
                digest.append(f"\n[{i}] {project.get('location', 'Location Unknown')}")
                if project.get('review_type'):
                    digest.append(f"    Type: {project['review_type']}")
                digest.append(f"\n{project.get('raw_text', 'No details')[:500]}...")
                if project.get('document_urls'):
                    digest.append("\n    Documents:")
                    for url in project['document_urls']:
                        digest.append(f"    - {url}")
                digest.append("\n" + "-" * 70)

        # Other Interesting Projects
        if analysis['interesting_projects']:
            digest.append("\n" + "=" * 70)
            digest.append("OTHER INTERESTING PROJECTS")
            digest.append("=" * 70)
            for i, project in enumerate(analysis['interesting_projects'][:10], 1):  # Limit to 10
                if not project.get('is_data_center_related'):  # Don't duplicate
                    digest.append(f"\n[{i}] {project.get('location', 'Location Unknown')}")
                    if project.get('review_type'):
                        digest.append(f"    Type: {project['review_type']}")
                    digest.append(f"\n{project.get('raw_text', 'No details')[:300]}...")
                    digest.append("\n" + "-" * 70)

        digest.append("\n" + "=" * 70)
        digest.append("END OF DIGEST")
        digest.append("=" * 70)

        return "\n".join(digest)

    def save_results(self, monitor_info: Dict, content: Dict, analysis: Dict, digest: str):
        """Save all results to files."""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

        # Save raw data as JSON
        json_file = os.path.join(self.output_dir, f"eqb_monitor_{timestamp}.json")
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump({
                'monitor_info': monitor_info,
                'content': content,
                'analysis': analysis
            }, f, indent=2, ensure_ascii=False)

        # Save digest as text
        digest_file = os.path.join(self.output_dir, f"eqb_digest_{timestamp}.txt")
        with open(digest_file, 'w', encoding='utf-8') as f:
            f.write(digest)

        # Save latest digest (overwrite)
        latest_file = os.path.join(self.output_dir, "latest_digest.txt")
        with open(latest_file, 'w', encoding='utf-8') as f:
            f.write(digest)

        print(f"Results saved to: {json_file}")
        print(f"Digest saved to: {digest_file}")

        return json_file, digest_file

    def convert_to_html(self, digest: str, monitor_info: Dict) -> str:
        """Convert plain text digest to beautiful HTML email."""
        import markdown

        # Debug: check if KEY INSIGHTS exists
        has_insights = "KEY INSIGHTS" in digest
        print(f"  [HTML] KEY INSIGHTS found: {has_insights}")
        if has_insights:
            print(f"  [HTML] Digest length: {len(digest)} chars")

        # Extract the AI analysis section (between KEY INSIGHTS and the === before QUICK STATS)
        ai_section = ""
        if "KEY INSIGHTS" in digest:
            start = digest.find("KEY INSIGHTS")
            # Find the ====== line that comes before QUICK STATS
            end = digest.find("\n======", start + 50)
            if end == -1:
                end = digest.find("QUICK STATS", start)
            if start != -1 and end != -1:
                ai_section = digest[start:end]
                # Remove headers and dividers
                ai_section = ai_section.replace("KEY INSIGHTS (AI Analysis)", "")
                ai_section = ai_section.replace("-" * 70, "")
                ai_section = ai_section.replace("## MAIN ANALYSIS", "")
                ai_section = ai_section.strip()
                print(f"  [HTML] Extracted AI section: {len(ai_section)} chars")

        # Extract stats
        total_projects = "?"
        data_center_count = 0
        interesting = "0"
        if "Total Projects:" in digest:
            match = re.search(r'Total Projects:\s*(\d+)', digest)
            if match:
                total_projects = match.group(1)
        # Count explicit data center matches
        if "Data Center Related:" in digest:
            match = re.search(r'Data Center Related:\s*(\d+)', digest)
            if match:
                data_center_count = int(match.group(1))
        # Also count projects Claude flagged as potential/suspicious data centers in AI analysis
        if ai_section:
            # Look for phrases indicating Claude suspects a data center
            print(f"  [HTML] Checking AI section for data center phrases...")
            suspicious_phrases = [
                r'potential data center',
                r'possible data center',
                r'suspected data center',
                r'probable data center',
                r'likely.{0,30}data center',
                r'probably.{0,30}data center',
                r'almost certainly.{0,30}data center',
                r'certainly.{0,30}data center',
                r'appears to be.{0,30}data center',
                r'looks like.{0,30}data center',
                r'masquerading',
                r'disguising.{0,30}data center',
                r'suspiciously data.center',
                r'hidden data center',
                r'data center.*disguised',
                r'evaluated as.{0,30}data center',
                r'screening.{0,30}data center',
                r'signature of a data center',
                r'is.{0,20}data center',
            ]
            for phrase in suspicious_phrases:
                if re.search(phrase, ai_section, re.IGNORECASE):
                    print(f"  [HTML] MATCHED data center phrase: {phrase}")
                    data_center_count = max(data_center_count, 1)  # At least 1 if flagged
                    break
        if "Other Interesting" in digest:
            match = re.search(r'Other Interesting[^:]*:\s*(\d+)', digest)
            if match:
                interesting = match.group(1)

        # Extract weekly-visual div BEFORE markdown processing (it would mangle the SVG)
        weekly_visual_html = ""
        visual_placeholder = "<!--WEEKLY_VISUAL_PLACEHOLDER-->"

        # Find the weekly-visual div and extract everything until its closing tag
        # Need to handle nested divs properly
        start_match = re.search(r"<div class=['\"]weekly-visual['\"]>", ai_section, re.IGNORECASE)
        if start_match:
            start_idx = start_match.start()
            # Count div opens/closes to find the matching close
            depth = 0
            end_idx = start_idx
            in_tag = False
            i = start_idx
            while i < len(ai_section):
                if ai_section[i:i+4].lower() == '<div':
                    depth += 1
                elif ai_section[i:i+6].lower() == '</div>':
                    depth -= 1
                    if depth == 0:
                        end_idx = i + 6
                        break
                i += 1

            if end_idx > start_idx:
                weekly_visual_html = ai_section[start_idx:end_idx]
                ai_section = ai_section[:start_idx] + visual_placeholder + ai_section[end_idx:]
                print(f"  [HTML] Extracted weekly visual: {len(weekly_visual_html)} chars")
                # Debug: show if it has SVG
                has_svg = '<svg' in weekly_visual_html.lower()
                has_style = '<style' in weekly_visual_html.lower()
                print(f"  [HTML] Visual has SVG: {has_svg}, has style: {has_style}")

        # Convert markdown in AI section to HTML
        try:
            ai_html = markdown.markdown(ai_section, extensions=['tables', 'nl2br'])
        except Exception as e:
            print(f"Markdown conversion error: {e}")
            ai_html = ai_section.replace('\n\n', '</p><p>').replace('\n', '<br>')
            ai_html = f"<p>{ai_html}</p>"

        # Re-insert the weekly visual
        if weekly_visual_html:
            ai_html = ai_html.replace(visual_placeholder, weekly_visual_html)
            # Also try replacing escaped version
            ai_html = ai_html.replace(f"<p>{visual_placeholder}</p>", weekly_visual_html)

        # If still empty, use fallback
        if not ai_html.strip():
            ai_html = "<p><em>Analysis not available for this digest.</em></p>"

        html = f'''<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {{
            font-family: 'Libre Baskerville', Georgia, serif;
            line-height: 1.7;
            color: #2d2d2d;
            max-width: 680px;
            margin: 0 auto;
            padding: 0;
            background-color: #f5f5f0;
        }}
        .header {{
            background: #1a3a4a;
            color: white;
            padding: 40px 30px;
            text-align: center;
        }}
        .header .label {{
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            opacity: 0.7;
            margin-bottom: 12px;
        }}
        .header h1 {{
            margin: 0 0 8px 0;
            font-size: 32px;
            font-weight: 400;
            letter-spacing: 0.5px;
        }}
        .header .subtitle {{
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 14px;
            opacity: 0.85;
            margin-top: 15px;
        }}
        .header .date {{
            font-size: 18px;
            font-style: italic;
            opacity: 0.9;
        }}
        .stats-bar {{
            background: #2d5a4a;
            color: white;
            padding: 25px 0;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 13px;
        }}
        .stats-bar table {{
            width: 100%;
            border-collapse: collapse;
        }}
        .stats-bar td {{
            text-align: center;
            width: 33.33%;
            padding: 0 10px;
        }}
        .stats-bar .stat-num {{
            font-size: 32px;
            font-weight: 600;
            display: block;
            line-height: 1.2;
        }}
        .stats-bar .stat-label {{
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            opacity: 0.85;
            margin-top: 6px;
            display: block;
        }}
        .content {{
            background: white;
            padding: 40px 35px;
        }}
        .analysis {{
            font-size: 16px;
        }}
        .analysis p {{
            margin: 0 0 18px 0;
            text-align: justify;
        }}
        .analysis p:first-child::first-letter {{
            font-size: 3.2em;
            float: left;
            line-height: 0.8;
            padding-right: 8px;
            padding-top: 4px;
            color: #1a3a4a;
        }}
        .analysis h2 {{
            font-family: 'Source Sans Pro', sans-serif;
            color: #1a3a4a;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 35px 0 18px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid #e8e8e0;
        }}
        .analysis h3 {{
            color: #2d5a4a;
            font-size: 18px;
            margin: 28px 0 12px 0;
            font-weight: 700;
        }}
        .analysis strong {{
            color: #1a3a4a;
        }}
        .analysis ul, .analysis ol {{
            margin: 15px 0;
            padding-left: 25px;
        }}
        .analysis li {{
            margin: 10px 0;
        }}
        .analysis hr {{
            border: none;
            border-top: 1px solid #e0e0d8;
            margin: 30px 0;
        }}
        .divider {{
            text-align: center;
            margin: 35px 0;
            color: #999;
            font-size: 18px;
            letter-spacing: 8px;
        }}
        .weekly-visual {{
            margin: 40px 0;
            padding: 25px;
            background: linear-gradient(135deg, #f8f9f5 0%, #f0f2eb 100%);
            border-radius: 12px;
            border: 1px solid #e0e0d8;
            text-align: center;
        }}
        .weekly-visual svg {{
            max-width: 100%;
            height: auto;
        }}
        .weekly-visual .caption {{
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 13px;
            color: #666;
            margin-top: 15px;
            font-style: italic;
        }}
        .footer {{
            background: #f5f5f0;
            text-align: center;
            padding: 25px 30px;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 12px;
            color: #888;
        }}
        .footer a {{
            color: #2d5a4a;
            text-decoration: none;
        }}
        .footer a:hover {{
            text-decoration: underline;
        }}
        .footer .source {{
            margin-bottom: 12px;
        }}
        .footer .credit {{
            font-size: 11px;
            color: #aaa;
        }}
    </style>
</head>
<body>
    <div class="header">
        <div class="label">Claude's Digest of the</div>
        <h1>EQB Monitor</h1>
        <div class="date">{monitor_info.get('date', 'Unknown Date')}</div>
        <div class="subtitle">Minnesota Environmental Quality Board &bull; Vol. {monitor_info.get('volume', '?')}, No. {monitor_info.get('number', '?')}</div>
    </div>

    <div class="stats-bar">
        <table>
            <tr>
                <td>
                    <span class="stat-num">{total_projects}</span>
                    <span class="stat-label">Projects</span>
                </td>
                <td>
                    <span class="stat-num">{data_center_count}</span>
                    <span class="stat-label">Possible</span>
                    <span class="stat-label" style="margin-top: -8px;">Data Centers</span>
                </td>
                <td>
                    <span class="stat-num">{interesting}</span>
                    <span class="stat-label">Notable</span>
                </td>
            </tr>
        </table>
    </div>

    <div class="content">
        <div class="analysis">
            {ai_html}
        </div>
    </div>

    <div class="footer">
        <div class="source">
            <a href="{monitor_info.get('url', '#')}">View Original EQB Monitor &rarr;</a>
        </div>
        <div class="credit">
            Analysis by Claude &bull; Minnesota Center for Environmental Advocacy
        </div>
    </div>
</body>
</html>'''

        return html

    def send_email(self, subject: str, body: str, to_email: str,
                   smtp_server: str, smtp_port: int,
                   from_email: str, password: str,
                   monitor_info: Dict = None):
        """Send email notification with digest."""
        try:
            msg = MIMEMultipart('alternative')
            msg['From'] = from_email
            msg['To'] = to_email
            msg['Subject'] = subject

            # Attach plain text version
            msg.attach(MIMEText(body, 'plain'))

            # Attach HTML version if we have monitor_info
            if monitor_info:
                html_body = self.convert_to_html(body, monitor_info)
                msg.attach(MIMEText(html_body, 'html'))

            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(from_email, password)
                server.send_message(msg)

            print(f"Email sent successfully to {to_email}")
            return True

        except Exception as e:
            print(f"Error sending email: {e}")
            return False

    def _load_email_config(self) -> Optional[Dict]:
        """Load email config from environment variables (GitHub Actions) or config file."""
        # First try environment variables (for CI/GitHub Actions)
        if os.environ.get('EMAIL_TO'):
            return {
                'to_email': os.environ['EMAIL_TO'],
                'from_email': os.environ.get('EMAIL_FROM', ''),
                'password': os.environ.get('EMAIL_PASSWORD', ''),
                'smtp_server': os.environ.get('EMAIL_SMTP_SERVER', 'smtp.gmail.com'),
                'smtp_port': int(os.environ.get('EMAIL_SMTP_PORT', '587')),
            }
        # Fall back to config file
        config_file = os.path.join(self.output_dir, "email_config.json")
        if os.path.exists(config_file):
            with open(config_file, 'r') as f:
                return json.load(f)
        return None

    def run(self, send_email_notification: bool = False, override_url: str = None):
        """Main execution flow.

        Args:
            send_email_notification: Whether to send email digest
            override_url: Optional specific monitor URL to scrape (for testing past editions)
        """
        print("Starting EQB Monitor Scraper...")
        print("-" * 70)

        if override_url:
            # Use provided URL directly (for testing past monitors)
            print(f"Using override URL: {override_url}")
            # Extract date from URL or use placeholder
            monitor_info = {
                'url': override_url,
                'date': 'Custom Monitor',
                'volume': '?',
                'number': '?'
            }
            # Try to extract date from the page itself
            try:
                resp = self.session.get(override_url, timeout=30)
                soup = BeautifulSoup(resp.text, 'html.parser')
                title = soup.find('title')
                if title:
                    # Try to extract date from title like "October 14, 2025"
                    date_match = re.search(r'(\w+ \d+, \d{4})', title.get_text())
                    if date_match:
                        monitor_info['date'] = date_match.group(1)
            except:
                pass
        else:
            # Get latest monitor
            monitor_info = self.get_latest_monitor_url()
            if not monitor_info:
                print("Failed to get latest monitor URL")
                return False

        print(f"Found monitor: {monitor_info['date']} (Vol {monitor_info['volume']}, No {monitor_info['number']})")
        print(f"URL: {monitor_info['url']}")
        print("-" * 70)

        # Scrape content
        print("Scraping monitor content...")
        content = self.scrape_monitor_content(monitor_info['url'])
        if not content:
            print("Failed to scrape monitor content")
            return False

        print(f"Found {len(content['projects'])} potential projects")
        print("-" * 70)

        # Analyze
        print("Analyzing projects...")
        analysis = self.analyze_projects(content['projects'], monitor_info)
        print(f"Data center related: {len(analysis['data_center_related'])}")
        print(f"Other interesting: {len(analysis['interesting_projects'])}")
        print("-" * 70)

        # Generate digest
        print("Generating digest...")
        digest = self.generate_digest(monitor_info, content, analysis)

        # Save results
        json_file, digest_file = self.save_results(monitor_info, content, analysis, digest)

        # Print digest (handle Unicode characters safely)
        try:
            print("\n" + digest)
        except UnicodeEncodeError:
            # If terminal can't handle Unicode, print with errors replaced
            print("\n" + digest.encode('ascii', errors='replace').decode('ascii'))

        # Send email if configured
        if send_email_notification:
            email_config = self._load_email_config()
            if email_config:
                subject = f"Claude's Digest of EQB Monitor - {monitor_info['date']}"
                self.send_email(
                    subject=subject,
                    body=digest,
                    to_email=email_config['to_email'],
                    smtp_server=email_config['smtp_server'],
                    smtp_port=email_config['smtp_port'],
                    from_email=email_config['from_email'],
                    password=email_config['password'],
                    monitor_info=monitor_info
                )
            else:
                print("Email config not found. Set EMAIL_* env vars or create email_config.json.")

        print("\nScraping complete!")
        return True


if __name__ == "__main__":
    import sys
    scraper = EQBMonitorScraper()

    # Check for optional URL argument
    override_url = None
    if len(sys.argv) > 1:
        override_url = sys.argv[1]
        print(f"[TEST MODE] Using provided URL: {override_url}")

    scraper.run(send_email_notification=True, override_url=override_url)
