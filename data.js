// Minnesota Data Center Tracker - Project Data
// Last updated: March 17, 2026
// Auto-updated weekly via GitHub Actions

/*
 * Project Status Categories (for public-facing tracker):
 *
 * 1. IN_LITIGATION - Active lawsuit filed challenging the project
 * 2. IN_REVIEW - Environmental review (AUAR/EAW) in progress
 * 3. APPROVED - Environmental review complete, proceeding with permitting
 * 4. CONSTRUCTION - Actively under construction
 * 5. OPERATIONAL - Built and running
 * 6. WATCHING - Early stage, rumored, or no formal filings yet
 * 7. SUSPENDED - Project paused or abandoned
 *
 * Projects can have a secondary status (e.g., approved but in litigation)
 */

const projectData = [
    // ============================================
    // IN LITIGATION - Active lawsuits filed
    // ============================================
    {
        id: 1,
        name: "Archer Datacenters Faribault Campus",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Faribault",
        county: "Rice",
        lat: 44.3671,
        lng: -93.2845,
        acres: 84.3,
        sqft: 500000,
        currentStatus: "Oral argument heard in MN Court of Appeals (A25-1617); awaiting decision. Appeal challenges adequacy of EAW and negative EIS declaration.",
        notes: "EAW completed with negative declaration (EIS not required). MCEA appeal argues environmental review vastly underreported facility's impact on climate change and Minnesota's electricity grid. Oral argument completed May 2026.",
        currentStatus: "Appeal pending in MN Court of Appeals (A25-1617) challenging negative EIS declaration",
        notes: "EAW completed with negative declaration (EIS not required). Appeal challenges adequacy of environmental review. Site at 15339 Acorn Trail, south of 150th St W in Northern Industrial Park.",
        litigation: {
            active: true,
            caseNumber: "A25-1617",
            court: "MN Court of Appeals",
            status: "Oral argument heard; awaiting decision",
            filedDate: "2025-10-02"
        },
        timeline: [
            { date: "2026-05", event: "Oral argument heard in MN Court of Appeals" },
            { date: "2025-10-02", event: "Appeal filed in Court of Appeals" },
            { date: "2025-09-02", event: "Negative EIS declaration issued" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "EAW", detail: "Negative declaration - no EIS needed; under appeal" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/263487?siId=263487-PROJ0000000001" },
            { name: "EQB Monitor Notice", url: "https://content.govdelivery.com/accounts/MNEQB/bulletins/3efc446" },
            { name: "MCEA Appeal Brief (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Brief-Appellant.pdf" },
            { name: "City of Faribault Alert", url: "https://www.ci.faribault.mn.us/CivicAlerts.asp?AID=580&ARC=1452" },
            { name: "SouthernMinn - Lawsuit on Hold Coverage", url: "https://www.southernminn.com/the_kenyon_leader/news/lawsuit-resident-concerns-put-faribault-data-center-on-hold/article_4340814d-1eb0-4a35-a9d5-6aade04eafa2.html" }
        ],
        lastUpdated: "2026-05-27"
    },
    {
        id: 2,
        name: "Hermantown Data Center",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Hermantown",
        county: "St. Louis",
        lat: 46.7730,
        lng: -92.2950,
        acres: 403,
        sqft: 1800000,
        currentStatus: "Lawsuit filed Nov 2025; city denied EAW petition Dec 3 (AUAR already adopted Oct 6); developer paused applications for public engagement",
        notes: "Fortune 50 company project (Mortenson developer). AUAR adopted Oct 6, 2025 via Resolution 2025-147. EQB petition for EAW filed Oct 17 and denied Dec 3 by city (AUAR already covers area). Developer voluntarily withdrew permit applications Nov 10 for further public engagement.",
        litigation: {
            active: true,
            caseNumber: "69DU-CV-25-3448",
            court: "St. Louis County District Court",
            status: "Lawsuit pending",
            filedDate: "2025-11-05"
        },
        timeline: [
            { date: "2025-12-03", event: "City denied EAW petition (AUAR already adopted)" },
            { date: "2025-11-10", event: "Mortenson withdrew applications for public engagement" },
            { date: "2025-11-05", event: "Lawsuit filed" },
            { date: "2025-10-21", event: "City received EQB petition (filed Oct 17)" },
            { date: "2025-10-20", event: "Mortenson and MN Power presented to City Council" },
            { date: "2025-10-17", event: "EQB petition filed requesting EAW" },
            { date: "2025-10-06", event: "AUAR adopted (Resolution 2025-147)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR adopted Oct 6, 2025; EAW petition denied Dec 3" },
            localZoning: { status: "in_progress", detail: "Applications paused by developer" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City Project Page", url: "https://hermantownmn.com/project/" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/263202?siId=263202-PROJ0000000001" },
            { name: "City EAW Denial Letter (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Hermantown-EQB-Response-2025-12-03.pdf" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA_Hermantown_MCRO_69DU-CV-25-3448_Complaint-Civil_2025-11-05_20251230104248.pdf" },
            { name: "KAXE Coverage", url: "https://www.kaxe.org/local-news/2025-10-23/public-petition-against-hermantown-data-center-pumps-brakes-on-project" },
            { name: "MPR News", url: "https://www.mprnews.org/story/2025/10/22/hermantown-delays-permits-for-disputed-data-center" }
        ],
        lastUpdated: "2026-01-23"
    },
    {
        id: 3,
        name: "Olam Lakeville Industrial AUAR",
        status: "review_complete",
        city: "Lakeville",
        county: "Dakota",
        lat: 44.6045,
        lng: -93.2310,
        acres: 152,
        sqft: 1360000,
        currentStatus: "Judge dismissed MCEA's lawsuit (May 2026). AUAR upheld. Developer Olam Holdings/Terawatt Infrastructure may proceed.",
        notes: "Olam Holdings 1, LLC / Terawatt Infrastructure project. MCEA alleged the City's AUAR used vague 'light industrial' description to conceal a data center, and that the climate analysis assumed only 3 MW when data centers require 100-500 MW. Judge dismissed the case in May 2026.",
        litigation: {
            active: false,
            caseNumber: "19HA-CV-25-5103",
            court: "Dakota County District Court",
            status: "Dismissed by judge, May 2026",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2026-05", event: "Judge dismissed MCEA lawsuit; AUAR upheld" },
            { date: "2026-01-15", event: "MCEA filed summary judgment motion" },
            { date: "2025-12-12", event: "Summary judgment scheduling order entered" },
            { date: "2025-08-05", event: "Lawsuit filed" },
            { date: "2025-07-07", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved July 7, 2025; legal challenge dismissed May 2026" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261688?siId=261688-PROJ0000000001" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/08/Lakeville_MCRO_19HA-CV-25-5103_Complaint-Civil_2025-08-05_20250819063829.pdf" },
            { name: "Summary Judgment Scheduling Order (PDF)", url: "https://legalectric.org/f/2025/12/Lakeaville_Order_SJ-Hearing_CV-25-5103_Order-Other_2025-12-12_20251230105817.pdf" },
            { name: "Summary Judgment Motion (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/2026-01-15-Memo-ISO-SJ-Motion.pdf" },
            { name: "Hometown Source - Lakeville Defends AUAR", url: "https://www.hometownsource.com/sun_thisweek/community/lakeville/lakeville-defends-its-environmental-review-of-an-alleged-data-center-project/article_64f3b99d-6cef-4669-bac3-6bd1d21b2554.html" }
        ],
        lastUpdated: "2026-05-27"
    },
    {
        id: 4,
        name: "North Mankato Industrial AUAR (Project Deacon)",
        status: "suspended",
        secondaryStatus: "review_complete",
        city: "North Mankato",
        county: "Nicollet",
        lat: 44.1832,
        lng: -94.0445,
        acres: 678,
        sqft: 4000000,
        currentStatus: "MCEA voluntarily dismissed lawsuit May 11, 2026 after city confirmed no data center is planned. Developer Oppidan previously withdrew. Project dead.",
        notes: "One of the largest proposed data center developments in Minnesota at 4 million square feet. Oppidan Investment withdrew from project citing concerns about backup generator permit timelines. No formal application was ever filed. MCEA voluntarily dismissed its AUAR challenge May 11, 2026 after city confirmed no active data center proposal exists and no such project is currently planned.",
        currentStatus: "No data center coming per city officials (March 2026); MCEA agreed to dismiss lawsuit August 7, 2026",
        notes: "One of the largest proposed data center developments in Minnesota at 4 million square feet. Oppidan Investment withdrew from project citing concerns about backup generator permit timelines. AUAR approved but lawsuit challenged its adequacy. No formal application was ever filed. At a March 2026 State of the Cities summit, North Mankato City Administrator Kevin McCann confirmed 'no data center' is coming to North Mankato (per KEYC). On August 7, 2026, MCEA agreed to dismiss the lawsuit (case 52-CV-25-568).",
        litigation: {
            active: false,
            caseNumber: "52-CV-25-568",
            court: "Nicollet County District Court",
            status: "Voluntarily dismissed by MCEA May 11, 2026",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2026-05-11", event: "MCEA voluntarily dismissed lawsuit after city confirmed no data center planned" },
            { date: "2025-11-17", event: "Developer Oppidan withdrawal confirmed in press reports" },
            status: "Dismissed — MCEA agreed to dismiss August 7, 2026",
            filedDate: "2025-08-05",
            dismissedDate: "2026-08-07"
        },
        timeline: [
            { date: "2026-08-07", event: "MCEA agreed to dismiss lawsuit (case 52-CV-25-568)" },
            { date: "2026-03-18", event: "City Administrator confirms 'no data center' coming to North Mankato at State of the Cities summit (KEYC)" },
            { date: "2025-11-17", event: "Developer withdrawal confirmed in press reports" },
            { date: "2025-09-09", event: "Project Deacon filed answer" },
            { date: "2025-09-05", event: "City of North Mankato filed answer" },
            { date: "2025-08-05", event: "Lawsuit filed" },
            { date: "2025-07-07", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved July 2025; legal challenge dismissed May 2026" },
            localZoning: { status: "withdrawn", detail: "No formal application ever filed; developer withdrew" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Mankato Free Press - MCEA Drops Lawsuit", url: "https://www.mankatofreepress.com/news/local_news/mcea-drops-lawsuit-against-north-mankato/article_0b7c615a-5dbe-41b6-96cf-c5a8d6da6ae6.html" },
            { name: "KEYC - Lawsuit Dropped", url: "https://www.keyc.com/2026/05/11/lawsuit-challenging-north-mankato-environmental-review-dropped/" },
            { name: "KEYC - No data center, no Costco, no Texas Roadhouse (Mar 2026)", url: "https://www.keyc.com/2026/03/18/no-data-center-no-costco-no-texas-roadhouse-city-officials-say-state-cities-summit/" },
            { name: "KEYC - Residents sound off on data center, lawsuit (Aug 2025)", url: "https://www.keyc.com/2025/08/19/north-mankato-residents-sound-off-data-center-law-suit/" },
            { name: "Mankato Free Press - Oppidan Backs Out", url: "https://www.mankatofreepress.com/news/local_news/data-center-plans-stalled-in-north-mankato-after-developer-backs-out/article_d0617045-9eed-4633-a055-aed5b0405879.html" },
            { name: "Mankato Free Press - No project, no problem", url: "https://www.mankatofreepress.com/news/local_news/north-mankato-says-no-project-no-problem-in-response-to-mcea-suit/article_9d1da895-e164-4a3a-a53b-e8eb021eb47b.html" },
            { name: "Star Tribune - Generator Permits", url: "https://www.startribune.com/developer-halts-two-minnesota-data-centers-over-permits-for-backup-generators/601507579" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261366?siId=261366-PROJ0000000001" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA_N-Mankato_MCRO_52-CV-25-568_Complaint-Civil_2025-08-05_20251230110142.pdf" },
            { name: "City Answer (PDF)", url: "https://legalectric.org/f/2025/12/N-Mankato_MCRO_52-CV-25-568_Answer_2025-09-05_20251230110725.pdf" },
            { name: "Project Deacon Answer (PDF)", url: "https://legalectric.org/f/2025/12/Project-Deacon-Answer-to-Complaint40475555.4-MCRO_52-CV-25-568_Answer_2025-09-09_20251230110752.pdf" }
        ],
        lastUpdated: "2026-08-07"
    },
    {
        id: 5,
        name: "Pine Island Project Skyway AUAR",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Pine Island",
        county: "Goodhue",
        lat: 44.2130,
        lng: -92.6180,
        acres: 482,
        sqft: 3000000,
        currentStatus: "TRO issued May 22, 2026 by Judge Biren; all construction halted. Judge rejected defendants' summary judgment. Google-backed facility (Ryan Companies developer) cannot proceed pending preliminary injunction hearing.",
        notes: "Google data center (Project Skyway), developed by Ryan Companies LLC. Google confirmed as client Feb 2026 after Nov 2024 NDA between Ryan Companies and city. MCEA argued Google was known before AUAR began, meaning EAW/EIS may have been required instead. First building: 250,000 sqft on min. 100 acres; estimated project value over $1 billion. Judge Biren found MCEA showed likelihood of success on the merits and cited failure to disclose data practices records. MCEA posted $2,000 security bond.",
        litigation: {
            active: true,
            caseNumber: "25-CV-25-2298",
            court: "Goodhue County District Court",
            status: "TRO issued May 22, 2026; construction halted. Preliminary injunction hearing pending.",
            filedDate: "2025-10-16"
        },
        timeline: [
            { date: "2026-05-22", event: "TRO issued by Judge Patrick M. Biren; all construction/pre-construction halted" },
            { date: "2026-04-20", event: "Summary judgment hearing (defendants' motion denied)" },
            { date: "2026-04-06", event: "Summary judgment hearing" },
            { date: "2026-02", event: "Google publicly confirmed as Project Skyway client" },
            { date: "2026-01-13", event: "City Council approved CUP for first building (250,000 sqft)" },
            { date: "2025-12-17", event: "City Council approved preliminary plat" },
            { date: "2025-11", event: "Ryan Companies signed NDA with city on behalf of Google" },
            { date: "2025-10-16", event: "Lawsuit filed" },
            { date: "2025-09-16", event: "Revised AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Revised AUAR approved Sept 2025; adequacy challenged in court" },
            localZoning: { status: "approved", detail: "CUP approved Jan 2026; halted by TRO May 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "MPR - Construction Halted by Judge", url: "https://www.mprnews.org/story/2026/05/26/pine-island-hyperscale-data-center-construction-halted-by-judge" },
            { name: "Star Tribune - Work Halted", url: "https://www.startribune.com/minnesota-data-center-pine-island-restraining-order/601849201" },
            { name: "Post Bulletin - Restraining Order", url: "https://www.postbulletin.com/news/local/court-grants-restraining-order-to-halt-project-skyway-progress-in-pine-island" },
            { name: "KSTP - Court Pauses Development", url: "https://kstp.com/kstp-news/top-news/court-pauses-development-on-planned-google-data-center-in-pine-island/" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Pine-Island-Complaint_MCRO_25-CV-25-2298_Complaint-Civil_2025-10-16_20251230105028.pdf" },
            { name: "Post Bulletin - Flurry of Filings", url: "https://www.postbulletin.com/news/local/flurry-of-filings-come-as-court-dates-draw-near-for-pine-island-data-center" },
            { name: "Planning & Zoning CUP Notice", url: "https://pineislandmn.gov/vertical/sites/%7B52A5D060-3422-4069-8E86-A961C2752B7F%7D/uploads/1.13.26_PZ_Notice_-_CUP.pdf" }
        ],
        lastUpdated: "2026-05-27"
    },

    // ============================================
    // IN REVIEW - Environmental review in progress
    // ============================================
    {
        id: 6,
        name: "Monticello Industrial AUAR",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Monticello",
        county: "Wright",
        lat: 45.2750,
        lng: -93.7600,
        acres: 550,
        sqft: 3000000,
        currentStatus: "MCEA lawsuit active in Wright County District Court (filed Feb 25, 2026) challenging AUAR adequacy. Apr 13, 2026: Council approved Resolution 2026-27 affirming Monticello Tech is exempt from March 9 citizen EAW petition; AUAR adopted Jan 26, 2026 qualifies as completed environmental review under Minn. R. 4410.3600.",
        notes: "Proposed by Monticello Tech LLC (Frattalone Companies). 550 acres south of 85th St NE and east of Hwy 25. AUAR analyzed two scenarios: 3M sqft tech campus and 5M sqft light industrial. Adoption does not approve a data center, rezone land, or allow construction. MCEA's sixth statewide data center AUAR lawsuit. MCEA seeking court to reverse AUAR approval and require additional environmental review. No development expected before Q2 2027. Separate from Scannell Technology Park proposal.",
        litigation: {
            active: true,
            court: "Wright County District Court",
            status: "Lawsuit filed Feb 25, 2026",
            filedDate: "2026-02-25"
        },
        timeline: [
            { date: "2026-04-13", event: "Council approved Resolution 2026-27 affirming Monticello Tech exempt from March 9 citizen EAW petition; AUAR serves as completed environmental review" },
            { date: "2026-03-09", event: "Citizen EAW petition filed with EQB by Andrew Sopher and others; covers both Monticello Tech and Scannell sites" },
            { date: "2026-02-25", event: "MCEA filed lawsuit in Wright County District Court challenging AUAR adequacy" },
            { date: "2026-01-26", event: "City council unanimously adopted AUAR and Mitigation Plan via Resolution 2026-02" },
            { date: "2026-01-06", event: "Final AUAR published" },
            { date: "2025-11-10", event: "City Council voted to send draft AUAR to EQB for 30-day public comment" },
            { date: "2025-11-20", event: "Public open house on AUAR" },
            { date: "2025-11-20", event: "Community backlash reported (KARE 11)" },
            { date: "2025-08-05", event: "AUAR scoping began" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Adopted Jan 26, 2026; challenged in court Feb 25, 2026" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/264408?siId=264408-PROJ0000000001" },
            { name: "Open House Presentation", url: "https://www.monticellomn.gov/DocumentCenter/View/8755" },
            { name: "City Environmental Reviews", url: "https://www.monticellomn.gov/712/Environmental-Reviews" },
            { name: "City Data Centers Page", url: "https://monticellomn.gov/728/Data-Centers" },
            { name: "KARE 11 Coverage", url: "https://www.kare11.com/article/news/local/proposed-data-centers-in-monticello-spark-community-backlash/89-9f0aa475-3d16-4ab5-8b06-27f4cea6b408" },
            { name: "Hometown Source - AUAR Adoption", url: "https://www.hometownsource.com/monticello_times/council-adopts-auar-planning-study-for-possible-data-center/article_df3d6460-7c9e-442d-b460-f1d3585d63cc.html" },
            { name: "Hometown Source - MCEA Lawsuit", url: "https://www.hometownsource.com/monticello_times/environmental-group-files-lawsuit-challenging-monticello-data-center-review/article_d5ffa609-757b-485d-b8b4-ef8e3ead2694.html" },
            { name: "MCEA Data Centers Page", url: "https://www.mncenter.org/data-centers" }
        ],
        lastUpdated: "2026-04-13"
    },
    {
        id: 8,
        name: "Cannon Falls Industrial AUAR",
        status: "review_complete",
        city: "Cannon Falls",
        county: "Goodhue",
        lat: 44.5330,
        lng: -92.9060,
        acres: 251,
        sqft: 1750000,
        currentStatus: "Final AUAR approved Sept 16, 2025",
        notes: "One of communities debating data center projects.",
        litigation: { active: false },
        timeline: [
            { date: "2026-01-06", event: "Post Bulletin coverage of local debate" },
            { date: "2025-09-16", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/262244?siId=262244-PROJ0000000001" },
            { name: "City AUAR Page", url: "https://www.cannonfallsmn.gov/community/page/auar-alternative-urban-area-review" },
            { name: "Post Bulletin Coverage", url: "https://www.postbulletin.com/news/local/data-centers-become-big-news-for-pine-island-cannon-falls-and-opposition" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 9,
        name: "Hampton Industrial AUAR",
        status: "review_complete",
        city: "Hampton",
        county: "Dakota",
        lat: 44.6120,
        lng: -92.9900,
        acres: null,
        sqft: 1500000,
        currentStatus: "Final AUAR approved April 15, 2025; 30-day appeal period expired",
        notes: "Refers to a technology park in documentation.",
        litigation: { active: false },
        timeline: [
            { date: "2025-04-15", event: "Final AUAR approved" },
            { date: "2025-03-25", event: "EQB Monitor notice published" },
            { date: "2025-01-07", event: "Public meeting" },
            { date: "2024-09-24", event: "AUAR announced in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261051?siId=261051-PROJ0000000001" },
            { name: "EQB Monitor Mar 2025", url: "https://content.govdelivery.com/accounts/MNEQB/bulletins/3d7d7ba" },
            { name: "EQB Monitor Dec 2024 (PDF)", url: "https://www.eqb.state.mn.us/sites/eqb/files/December%2024%2C%202024_0.pdf" }
        ],
        lastUpdated: "2026-01-22"
    },

    // ============================================
    // APPROVED - Environmental review complete
    // ============================================
    {
        id: 10,
        name: "Apple Valley AUAR (Orchard Place)",
        status: "review_complete",
        city: "Apple Valley",
        county: "Dakota",
        lat: 44.7250,
        lng: -93.2050,
        acres: null,
        sqft: 1050000,
        currentStatus: "City Council denied comprehensive plan amendment Jan 23, 2026; AUAR adopted Dec 2024 but land use denied",
        notes: "Rockport LLC / Oppidan Investment proposed 105-acre technology campus with five data center buildings on former Fischer Mining site. AUAR update with data center scenario adopted Dec 2024. Planning Commission recommended denial April 2, 2025 citing water supply, sewer capacity, and comp plan incompatibility. City Council unanimously denied the comp plan amendment Jan 23, 2026. Developer had requested extensions through Jan 31, 2026.",
        litigation: { active: false },
        timeline: [
            { date: "2026-01-23", event: "City Council unanimously denied comprehensive plan amendment" },
            { date: "2025-04-02", event: "Planning Commission recommended denial (5-1)" },
            { date: "2025-02-05", event: "Planning Commission public hearing; tabled due to site concerns" },
            { date: "2024-12-30", event: "Complete land use application received by city" },
            { date: "2024-12-01", event: "AUAR update with technology park scenario adopted" },
            { date: "2024-10-24", event: "AUAR update released to EQB Monitor for comment" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR update with data center scenario adopted Dec 2024" },
            localZoning: { status: "denied", detail: "Comp plan amendment denied by City Council Jan 23, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City Project Page", url: "https://www.applevalleymn.gov/1024/Proposed-Technology-Center-Data-Center" },
            { name: "Hometown Source - AUAR Scenario", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/data-center-scenario-contemplated-in-apple-valley/article_9aa87462-961d-11ef-beb5-bbe0992cea55.html" },
            { name: "Hometown Source - CPA Denial", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/apple-valley-city-council-denies-land-use-change/article_d4a951aa-8087-4c8f-8df6-09f6b2db2432.html" },
            { name: "Hometown Source - Planning Commission Denial", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/land-use-change-for-data-center-denied-in-apple-valley/article_d8ed4b90-5341-4544-87a1-08417f5b9d57.html" }
        ],
        lastUpdated: "2026-01-31"
    },
    {
        id: 11,
        name: "Farmington Technology Park (Tract)",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Farmington",
        county: "Dakota",
        lat: 44.6165,
        lng: -93.1540,
        acres: 347,
        sqft: 2530000,
        currentStatus: "Lawsuit filed Nov 2024 challenging city approval; injunction paused negotiations",
        notes: "Tract's proposed $5B hyperscale campus (12 buildings, 708MW). Lawsuit challenges annexation agreement violation, environmental impacts. Castle Rock Township also filed separate legal action.",
        litigation: {
            active: true,
            caseNumber: "Dakota County District Court",
            court: "Dakota County District Court",
            status: "Injunction filed Nov 29, 2024",
            filedDate: "2024-11-29"
        },
        timeline: [
            { date: "2024-11-29", event: "Residents and Coalition file lawsuit/injunction" },
            { date: "2025-01-14", event: "Castle Rock Township votes to file separate legal action" },
            { date: "2024-11-04", event: "AUAR adopted (Resolution 2024-97)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Adopted Nov 4, 2024" },
            localZoning: { status: "in_progress", detail: "PUD approved but challenged" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259881?siId=259881-PROJ0000000001" },
            { name: "GovTech - Lawsuit", url: "https://www.govtech.com/infrastructure/farmington-minn-residents-sue-to-stop-data-center-park" },
            { name: "Coalition Website", url: "https://www.datacenterresponsibility.com/whatishappening" },
            { name: "Streets.mn Deep Dive", url: "https://streets.mn/2025/11/07/deep-dive-the-farmington-push-for-responsible-hyper-scale-data-centers/" },
            { name: "Hometown Source - Motion to Dismiss Denied", url: "https://www.hometownsource.com/sun_thisweek/community/dakota_county/judge-denies-farmingtons-motion-to-dismiss-lawsuit/article_54651c1e-c9af-4516-9409-6eaf4c0c83a7.html" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 12,
        name: "Farmington West AUAR",
        status: "review_complete",
        city: "Farmington",
        county: "Dakota",
        lat: 44.6300,
        lng: -93.1800,
        acres: 329,
        sqft: 3000000,
        currentStatus: "AUAR approved Oct 7, 2024",
        notes: null,
        litigation: { active: false },
        timeline: [
            { date: "2024-10-07", event: "AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Approved Oct 7, 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259034?siId=259034-PROJ0000000001" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 13,
        name: "Dakota East Area AUAR",
        status: "review_complete",
        city: "Rosemount",
        county: "Dakota",
        lat: 44.7415,
        lng: -93.0200,
        acres: 447,
        sqft: 2300000,
        currentStatus: "Final AUAR approved; materials hosted on city site",
        notes: "Describes 'technology park' scenario, similar approach to North Mankato AUAR.",
        litigation: { active: false },
        timeline: [
            { date: "2025-07-15", event: "Final AUAR approved" },
            { date: "2024-12-17", event: "AUAR announced in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261731?siId=261731-PROJ0000000001" },
            { name: "City Environmental Reviews", url: "https://www.rosemountmn.gov/689/Environmental-Review" },
            { name: "AUAR Order (PDF)", url: "https://www.rosemountmn.gov/DocumentCenter/View/7401/Dakota-East-Area-AUAR-Order" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 14,
        name: "Rosemount Rich Valley East Industrial AUAR",
        status: "review_complete",
        city: "Rosemount",
        county: "Dakota",
        lat: 44.7500,
        lng: -93.0250,
        acres: 333,
        sqft: 2300000,
        currentStatus: "Adopted June 11, 2024",
        notes: "New AUAR explicitly targeting data center projects.",
        litigation: { active: false },
        timeline: [
            { date: "2024-06-11", event: "Final AUAR adopted" },
            { date: "2023-10-24", event: "AUAR announced in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR adopted June 11, 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City Environmental Review", url: "https://www.rosemountmn.gov/689/Environmental-Review" },
            { name: "EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/257490?siId=257490-PROJ0000000001" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 15,
        name: "Rosemount Industrial AUAR",
        status: "review_complete",
        city: "Rosemount",
        county: "Dakota",
        lat: 44.7650,
        lng: -93.1350,
        acres: 235,
        sqft: 4000000,
        currentStatus: "Updated AUAR approved Aug 6, 2024 (235 acres)",
        notes: "Existing AUAR from 2023, updated in 2024 to explicitly target data centers.",
        litigation: { active: false },
        timeline: [
            { date: "2024-08-06", event: "AUAR update approved" },
            { date: "2024-06-11", event: "AUAR update announced in EQB Monitor" },
            { date: "2023-11-21", event: "Original AUAR approval announced in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Updated with DC scenario July 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/255536?siId=255536-PROJ0000000002" },
            { name: "AUAR Update (PDF)", url: "https://www.rosemountmn.gov/DocumentCenter/View/7071/Rosemount-Industrial-AUAR-Update" },

        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 16,
        name: "Thomson Reuters Redevelopment Project",
        status: "review_complete",
        city: "Eagan",
        county: "Dakota",
        lat: 44.8260,
        lng: -93.1143,
        acres: 179,
        sqft: 1350000,
        sqftDisplay: "1.2–1.5M SF",
        currentStatus: "Final AUAR adopted Oct 29, 2024 (Resolution 24-50)",
        notes: "Scenario two includes light industrial that 'could include data centers'. Mixed-use redevelopment of former Thomson Reuters campus. 1.2-1.5 million SF proposed.",
        litigation: { active: false },
        timeline: [
            { date: "2024-10-29", event: "Final AUAR adopted (Resolution 24-50)" },
            { date: "2024-10-08", event: "Final AUAR published in EQB Monitor" },
            { date: "2024-08-26", event: "Public open house held" },
            { date: "2024-08-13", event: "Draft AUAR published in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR adopted Oct 29, 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Resolution 24-50 (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Resolution_24-50_Adopting-Thomson-Reuters-AUAR.pdf" },
            { name: "Revised AUAR (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Thomson-Reuters-Revised-AUAR.pdf" },
            { name: "City Environmental Reviews", url: "https://cityofeagan.com/environmental-reviews" },
            { name: "Project EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259709?siId=259709-PROJ0000000001" }
        ],
        lastUpdated: "2026-01-23"
    },
    {
        id: 23,
        name: "Northfield Northwest Business Park AUAR",
        status: "review_complete",
        city: "Northfield",
        county: "Rice",
        lat: 44.4700,
        lng: -93.1750,
        acres: 530,
        sqft: null,
        currentStatus: "Xcel Energy/City of Northfield AUAR adopted 2023. City rezoned 265 acres to industrial and passed strictest data center efficiency standards in MN (Dec 2024). No specific developer announced.",
        notes: "Proactive AUAR completed by City of Northfield in partnership with Xcel Energy for the Northwest Area Business Park (EQB Project 255525). 530 acres total, ~265 acres shovel-ready north of North Ave, east of Holyoke Ave, west of Cedar Ave. Two scenarios analyzed: Scenario A (single large tech/data center user) and Scenario B (multi-user business park per 2008 Comp Plan). 30-day public comment period in 2023 drew 18 citizen responses. City passed zoning ordinance allowing data centers in the Northwest Industrial Area in December 2024 with the highest efficiency standards in Minnesota. Considered a model for transparent, proactive environmental review — AUAR was done before any specific developer applied, not under developer pressure.",
        litigation: { active: false },
        timeline: [
            { date: "2024-12-10", event: "City Council approved zoning allowing data centers in Northwest Industrial Area; highest efficiency standards in MN adopted" },
            { date: "2023", event: "Xcel Energy/City of Northfield AUAR adopted (30-day public comment period; 18 responses)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Xcel Energy/City of Northfield AUAR adopted 2023 (EQB Project 255525)" },
            localZoning: { status: "approved", detail: "Data centers permitted in Northwest Industrial Area as of Dec 2024" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/255525?siId=255525-PROJ0000000001" },
            { name: "City Northwest Business Park Page", url: "https://www.northfieldmn.gov/1578/Xcel-Energy-City-of-Northfield-Alternati" },
            { name: "KYMN - City Allows Data Centers (Dec 2024)", url: "https://kymnradio.net/2024/12/10/city-allows-data-centers-in-the-northwest-industrial-area-highest-efficency-standards-in-mn-implemented/" },
            { name: "KYMN - Northfield an Outlier (Apr 2026)", url: "https://kymnradio.net/2026/04/08/northfield-an-outlier-and-potential-model-in-minnesotas-data-center-debacle/" }
        ],
        lastUpdated: "2026-05-27"
    },

    // ============================================
    // WATCHING - Early stage / rumored / no formal filings
    // ============================================
    {
        id: 17,
        name: "Harmony Data Center",
        status: "watching",
        city: "Harmony",
        county: "Fillmore",
        lat: 43.5440,
        lng: -92.0080,
        acres: 60,
        sqft: null,
        currentStatus: "Early-stage Economic Development Authority exploration; city voted to annex land Oct 14, 2025",
        notes: "Southeast Minnesota location near Iowa border. No AUAR/EAW filed yet.",
        litigation: { active: false },
        timeline: [
            { date: "2025-10-14", event: "City voted to annex land" },
            { date: "2025-10-07", event: "Community members raise concerns at meeting" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "in_progress", detail: "Annexation in progress" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Harmony Economic Development Authority Project Page", url: "https://harmonymn.gov/eda/ongoing-projects/harmony-eda-project-data-center/" },
            { name: "Root River Current", url: "https://rootrivercurrent.org/harmony-minnesota-annexs-land-for-possible-data-center/" },
            { name: "Fillmore County Journal", url: "https://fillmorecountyjournal.com/concerns-raised-over-proposed-data-center/" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 18,
        name: "Scannell Technology Park",
        status: "watching",
        city: "Monticello",
        county: "Wright",
        lat: 45.2780,
        lng: -93.8280,
        acres: 106,
        sqft: 1300000,
        mw: 200,
        currentStatus: "Comp plan land use re-analysis ongoing (ordered Jan 12, 2026); no annexation petition or project application filed. Apr 13, 2026: Council approved Resolution 2026-28 placing March 9 citizen EAW petition on hold; city cannot act without a specific project application. Petition expires March 9, 2027 if no action.",
        notes: "Separate from Monticello Industrial AUAR. Scannell Properties (Wayzata, MN) proposes ~1.3M sqft technology park (data center) on 106 acres: between Otter Creek Crossing Industrial Park to the north, 90th Street NW to the south, and abutting Bertram Chain of Lakes Regional Park to the west, within the Monticello Orderly Annexation Area. Estimated 150-200 MW. City council approved comp plan amendment May 27, 2025, but voted Jan 12, 2026 to re-analyze land use guiding. No annexation petition received as of April 2026.",
        litigation: { active: false },
        timeline: [
            { date: "2026-04-13", event: "Council approved Resolution 2026-28 placing citizen EAW petition on hold; city unable to act without annexation petition or specific project application" },
            { date: "2026-03-09", event: "Citizen EAW petition filed with EQB (combined with Monticello Tech petition); petition on hold, expires March 9, 2027 if no action" },
            { date: "2026-01-12", event: "City Council voted to re-analyze site land use guidance and directed Planning Commission to hold public hearing" },
            { date: "2025-10-27", event: "Finance & Commerce reports on proposal" },
            { date: "2025-05-27", event: "City Council approved comprehensive plan amendment" },
            { date: "2025-05-06", event: "Planning Commission held public hearing on comprehensive plan amendment" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Finance & Commerce", url: "https://finance-commerce.com/2025/10/monticello-data-center-developments/" },
            { name: "City Data Centers Page", url: "https://monticellomn.gov/728/Data-Centers" },
            { name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/news/two-data-center-projects-planned-for-monticello-minnesota/" }
        ],
        lastUpdated: "2026-04-13"
    },
    {
        id: 19,
        name: "Glencoe AI Data Center",
        status: "watching",
        city: "Glencoe",
        county: "McLeod",
        lat: 44.7650,
        lng: -94.1400,
        acres: null,
        sqft: null,
        currentStatus: "Early concept; Economic Development Authority reviewed concept plans Sept 2024",
        notes: "Reported as $50-60M AI data center concept.",
        litigation: { active: false },
        timeline: [
            { date: "2025-03-27", event: "Star Tribune reports Revolve Labs focusing on Glencoe expansion" },
            { date: "2024-11-06", event: "City approved rezoning of land" },
            { date: "2024-09-27", event: "Economic Development Authority reviewed concept plans" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Glencoe News", url: "https://www.glencoenews.com/articles/featured-mcc/glencoe-eda-reviews-concept-plans-for-50-60-million-ai-data-center/" },
            { name: "Glencoe News - Rezoning Approval", url: "https://www.glencoenews.com/articles/featured-mcc/glencoe-approves-rezoning-request-for-site-of-revolve-labs-planned-ai-data-center/" },
            { name: "Star Tribune - Glencoe Expansion", url: "https://www.startribune.com/company-wont-build-ai-data-center-in-rural-town-eyes-glencoe-expansion/601246170" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 20,
        name: "Cottage Grove Business Park AUAR",
        status: "review_complete",
        city: "Cottage Grove",
        county: "Washington",
        lat: 44.8050,
        lng: -92.9300,
        acres: null,
        sqft: null,
        currentStatus: "AUAR approved Jan 8, 2018; AUAR update approved March 2, 2022; covers 'major technology center' scenario",
        notes: "Environmental review complete. If specific data center proposal emerges, watch for site-specific permits/platting.",
        litigation: { active: false },
        timeline: [
            { date: "2022-03-02", event: "AUAR update approved" },
            { date: "2018-01-08", event: "Original Business Park AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR approved Jan 8, 2018; update approved March 2, 2022" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City AUAR Page", url: "https://cottagegrovemn.gov/613/Business-Park-Alternative-Urban-Areawide" },
            { name: "EQB Monitor Jan 2018 (PDF)", url: "https://www.eqb.state.mn.us/sites/eqb/files/documents/EQB%20Monitor%2C%20January%2022%2C%202018.pdf" },
            { name: "Council Packet - AUAR Update", url: "https://docs.cottagegrovemn.gov/WebLink/DocView.aspx?dbid=0&id=780075&repo=CottageGrove" }
        ],
        lastUpdated: "2026-01-22"
    },

    // ============================================
    // SUSPENDED - Project paused or abandoned
    // ============================================
    {
        id: 21,
        name: "Amazon Becker Data Center",
        status: "suspended",
        city: "Becker",
        county: "Sherburne",
        lat: 45.4036,
        lng: -93.8569,
        acres: 348,
        lat: 45.3900,
        lng: -93.8800,
        acres: null,
        sqft: null,
        currentStatus: "Amazon pulled out after PUC required Certificate of Need for backup generators. 348-acre site covered by 2023 Xcel/Becker AUAR.",
        notes: "Amazon Data Services purchased 348 acres near Sherco plant via Elk River Technologies (which bought from Xcel for $7.97M in April 2024; Amazon paid $73.56M). PUC ruled Certificate of Need required for 250 backup diesel generators Feb 28, 2025. Amazon subsequently withdrew May 2025. The Xcel Energy/City of Becker AUAR (adopted January 2023) covered this land as part of its ~2,200-acre study area but critics noted it lacked detailed data center impact analysis.",
        litigation: { active: false },
        timeline: [
            { date: "2025-05", event: "Amazon pulls out of Becker plans" },
            { date: "2025-02-28", event: "PUC rules Certificate of Need required for 250 backup generators" },
            { date: "2024", event: "Amazon purchased 348-acre site via Elk River Technologies for $73.56M" },
            { date: "2023-01", event: "Xcel Energy/City of Becker AUAR adopted" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Xcel Energy/City of Becker AUAR adopted January 2023; critics noted limited data center impact analysis" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "blocked", detail: "PUC Certificate of Need required for backup generators" }
        },
        sources: [
            { name: "Xcel/Becker AUAR Document", url: "https://www.ci.becker.mn.us/DocumentCenter/View/2689/Xcel-Energy--City-of-Becker-AUAR" },
            { name: "Star Tribune - Amazon Retreats", url: "https://www.startribune.com/amazon-retreat-from-its-planned-minnesota-data-center-is-latest-gut-punch-for-becker/601371681" },
            { name: "Star Tribune - Amazon Buys Site", url: "https://www.startribune.com/amazon-data-center-xcel-sherco-becker-minnesota/601180310" },
            { name: "Public Power", url: "https://www.publicpower.org/periodical/article/minnesota-regulators-rule-certificate-need-required-backup-generators-data-center" },
            { name: "E&E News", url: "https://www.eenews.net/articles/amazon-needs-permit-for-minnesota-data-center-backup-power/" },
            { name: "Bring Me The News", url: "https://bringmethenews.com/minnesota-news/amazon-cant-skip-permitting-process-for-data-center-generators-mn-utilities-commission-decides-" },
            { name: "Industrial Info", url: "https://www.industrialinfo.com/iirenergy/industry-news/article/amazon-pulls-out-of-problematic-plans-for-minnesota-data-center--342325" }
        ],
        lastUpdated: "2026-05-27"
    },
    {
        id: 22,
        name: "Microsoft Becker Proposal",
        status: "watching",
        secondaryStatus: "review_complete",
        city: "Becker",
        county: "Sherburne",
        lat: 45.3830,
        lng: -93.8750,
        acres: 295,
        sqft: null,
        currentStatus: "Land purchased Feb 2024; no formal plans submitted to city. Site covered by 2023 Xcel/Becker AUAR.",
        notes: "Microsoft purchased 295 acres directly from Xcel Energy for $17.7M in February 2024. No formal development plans submitted to city; Microsoft has not commented publicly on timeline. Site is adjacent to the closing Sherco coal plant. The Xcel Energy/City of Becker AUAR (adopted January 2023) covers the broader ~2,200-acre Xcel land area including this parcel. Google had previously backed out of plans for this area in 2022.",
        litigation: { active: false },
        timeline: [
            { date: "2024-02-12", event: "Microsoft closes on 295 acres from Xcel for $17.7M" },
            { date: "2023-01", event: "Xcel Energy/City of Becker AUAR adopted, covering broader site area" },
            { date: "2022-12-01", event: "Google backs out of previous Becker data center plans" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Xcel Energy/City of Becker AUAR adopted January 2023 covers site area" },
            localZoning: { status: "not_started" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Xcel/Becker AUAR Document", url: "https://www.ci.becker.mn.us/DocumentCenter/View/2689/Xcel-Energy--City-of-Becker-AUAR" },
            { name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/news/microsoft-buys-300-acres-in-becker-minnesota/" },
            { name: "MPR News", url: "https://www.mprnews.org/story/2024/02/21/xcel-energy-sells-land-in-becker-to-microsoft-for-data-center" },
            { name: "Star Tribune", url: "https://www.startribune.com/microsoft-building-data-center-in-becker-xcel-stress-on-grids/600344079" }
        ],
        lastUpdated: "2026-05-27"
        lastUpdated: "2026-01-22"
    },

    // ============================================
    // WATCHING - Early stage / no formal filings
    // ============================================
    {
        id: 23,
        name: "CloudHQ MSP Campus",
        status: "review_complete",
        city: "Chaska",
        county: "Carver",
        lat: 44.8172,
        lng: -93.6364,
        acres: 72,
        sqft: 1400000,
        mw: 180,
        currentStatus: "2022 proposal for 180 MW data center campus with CUP and preliminary site plan in hand, but no confirmed anchor tenant and final approval pending.",
        notes: "2007 Schoolmaster Drive, West Creek Corporate Center. 1.4M sq ft, 72 ft tall, 180 MW, ~$1B construction cost; projected 75–100 jobs. AUAR completed 2022; CUP Oct 2023; preliminary site plan/plat approved 4-1 by council Oct 2024 over neighbor opposition (height, noise, berms). Final site plan/plat and a separate 200 MW substation approval pending as of spring 2025. No confirmed anchor tenant as of spring 2025.",
        litigation: { active: false },
        timeline: [
            { date: "2022-08", event: "Concept approval by City of Chaska" },
            { date: "2022", event: "AUAR and mitigation plan completed" },
            { date: "2023-10", event: "Conditional use permit granted" },
            { date: "2024-10", event: "Preliminary site plan and plat approved 4-1 by council" },
            { date: "2025-04-15", event: "Daily Reporter: final approval and substation process still pending; no anchor tenant confirmed" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR and mitigation plan completed 2022" },
            localZoning: { status: "in_progress", detail: "CUP Oct 2023; preliminary site plan/plat Oct 2024; final approval TBD" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "200 MW substation approval process pending" }
        },
        sources: [
            { name: "City of Chaska project page", url: "https://www.chaskamn.gov/841/Cloud-HQ" },
            { name: "Carver County Local News — preliminary approval Oct 2024", url: "https://cclocalnews.org/2024/10/29/despite-resident-objections-data-center-gains-preliminary-ok/" },
            { name: "Star Tribune — $1B project announced", url: "https://www.startribune.com/1-billion-1-4-million-square-foot-data-center-planned-for-chaska/600201478" },
            { name: "Daily Reporter — status spring 2025", url: "https://dailyreporter.com/2025/04/15/chaska-data-center-housing-business-park-growth/" },
            { name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/news/cloudhq-planning-180mw-data-center-campus-in-minneapolis-minnesota/" },
            { name: "CloudHQ MSP Campus page", url: "https://cloudhq.com/campus/msp-campus/" }
        ],
        lastUpdated: "2026-04-07"
    },
    {
        id: 24,
        name: "Cielo Chisago",
        status: "watching",
        city: "Chisago City",
        county: "Chisago",
        lat: 45.3990,
        lng: -92.9225,
        acres: 157,
        sqft: null,
        mw: 300,
        currentStatus: "Cielo self-reports 157 acres/300 MW in Chisago City, but no public Minnesota entitlement record has been found.",
        notes: "Cielo Digital Infrastructure (founded 2023, backed by Arroyo Investors) lists Chisago, MN as an active project on its properties page: 157 acres, 80 buildable acres, up to 300 MW. No Chisago City planning file, EQB environmental review notice, or local news coverage of a named Cielo entitlement has been found in public record. To check for a filed EQB review, search the EQB Environmental Review Projects Database (https://webapp.pca.state.mn.us/eqb-search/projects). Location is approximate (LOW confidence): placed on Stacy Trail (County Road 19 / CSAH 19), zip 55013, based on address interpolation from confirmed anchor points; the specific parcel has not been confirmed in public property records.",
        litigation: { active: false },
        timeline: [
            { date: "2025", event: "Cielo lists Chisago as active project on company properties page (157 ac, 300 MW)" }
        ],
        permits: {
            environmentalReview: { status: "not_started", detail: "No EAW, AUAR, or EIS filing found in MN public record" },
            localZoning: { status: "not_started" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Cleanview — Cielo Chisago", url: "https://cleanview.co/public/data-centers/minnesota/2043/cielo-chisago-data-center" },
            { name: "Data Center Dynamics — Cielo national pipeline", url: "https://www.datacenterdynamics.com/en/news/cielo-digital-infrastructure-plans-300mw-data-center-campus-in-south-carolina/" }
        ],
        lastUpdated: "2026-04-07"
    },
    {
        id: 25,
        name: "Nobles County Powered Data Park",
        status: "in_review",
        city: "Reading",
        county: "Nobles",
        lat: 43.703,
        lng: -95.690,
        acres: 640,
        sqft: null,
        mw: 450,
        currentStatus: "AUAR environmental review underway; public comment period closes April 16, 2026. Planning Commission voted against allowing the project in ag preservation areas; Nobles County Board of Commissioners has final say.",
        notes: "Geronimo Power proposes a 400-450 MW data center on 640 acres (Section 19, Elk Township) northeast of Reading, about 6 miles NW of Worthington. Purchase agreement signed with landowners; no end user committed and no land purchased yet. Estimated $4 billion in capital investment. Developer plans to sell finished site to a hyperscaler (e.g., Google, Microsoft, Amazon) and tie power to the planned Summit Lake Solar and Storage project. Coordinates approximate (placed near Reading).",
        litigation: { active: false },
        timeline: [
            { date: "2025", event: "Geronimo Power proposes 400-450 MW data center on farmland near Reading; signs purchase agreement with landowners" },
            { date: "2026-02", event: "Nobles County commissioners vote 4-1 to send AUAR draft order and scoping document to MN EQB" },
            { date: "2026-03", event: "Planning Commission votes against allowing data center as conditional use in ag preservation zone; county board vote pending" },
            { date: "2026-04-16", event: "AUAR public comment period closes" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", detail: "AUAR approved by county commissioners and submitted to MN EQB; comment period open through April 16, 2026" },
            localZoning: { status: "contested", detail: "Planning Commission voted against ag-preservation conditional use; Nobles County Board of Commissioners vote pending" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Feasibility study underway with Lincoln Pipestone Rural Water" }
        },
        sources: [
            { name: "Geronimo Power — Nobles County Powered Data Park", url: "https://geronimopower.com/in-development/nobles-county-powered-data-park/" },
            { name: "Star Tribune — $4 billion data center in farm country", url: "https://www.startribune.com/in-minnesota-farm-country-a-plan-for-a-4-billion-data-center-takes-root-with-vast-wind-solar-and-battery-projects/601512205" },
            { name: "The Globe — Planning Commission vote", url: "https://www.dglobe.com/news/local/full-story-nobles-county-planning-commission-votes-to-keep-data-center-out-of-ag-preservation-area" },
            { name: "The Globe — AUAR begins", url: "https://www.dglobe.com/news/local/nobles-county-data-center-begins-environmental-review-process" }
        ],
        lastUpdated: "2026-04-10"
    }
];

// Status display info
const statusInfo = {
    in_litigation: { label: "In Litigation", color: "#dc2626", order: 0 },
    in_review: { label: "In Env. Review", color: "#3b82f6", order: 1 },
    review_complete: { label: "Env. Review Complete", color: "#8b5cf6", order: 2 },
    construction: { label: "Construction", color: "#f97316", order: 3 },
    operational: { label: "Operational", color: "#10b981", order: 4 },
    watching: { label: "Watching", color: "#6b7280", order: 5 },
    suspended: { label: "Suspended", color: "#9ca3af", order: 6 }
};

// Calculate summary statistics
function calculateStats() {
    let totalAcres = 0;
    let totalSqft = 0;

    projectData.forEach(p => {
        if (p.acres) totalAcres += p.acres;
        if (p.sqft) totalSqft += p.sqft;
    });

    // Count includes primary, secondary, and tertiary statuses
    // (e.g., North Mankato is review_complete + in_litigation + suspended)
    return {
        totalProjects: projectData.length,
        totalAcres: Math.round(totalAcres),
        totalSqft: totalSqft,
        countByStatus: {
            in_litigation: projectData.filter(p => p.status === 'in_litigation' || p.secondaryStatus === 'in_litigation' || p.tertiaryStatus === 'in_litigation').length,
            in_review: projectData.filter(p => p.status === 'in_review' || p.secondaryStatus === 'in_review' || p.tertiaryStatus === 'in_review').length,
            review_complete: projectData.filter(p => p.status === 'review_complete' || p.secondaryStatus === 'review_complete' || p.tertiaryStatus === 'review_complete').length,
            construction: projectData.filter(p => p.status === 'construction' || p.secondaryStatus === 'construction' || p.tertiaryStatus === 'construction').length,
            operational: projectData.filter(p => p.status === 'operational' || p.secondaryStatus === 'operational' || p.tertiaryStatus === 'operational').length,
            watching: projectData.filter(p => p.status === 'watching' || p.secondaryStatus === 'watching' || p.tertiaryStatus === 'watching').length,
            suspended: projectData.filter(p => p.status === 'suspended' || p.secondaryStatus === 'suspended' || p.tertiaryStatus === 'suspended').length
        }
    };
}

// Export for use
window.projectData = projectData;
window.statusInfo = statusInfo;
window.calculateStats = calculateStats;
