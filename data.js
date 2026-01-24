// Minnesota Data Center Tracker - Project Data
// Last updated: January 22, 2026
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
        lat: 44.2950,
        lng: -93.2688,
        acres: 84.3,
        sqft: 500000,
        currentStatus: "Appeal pending in MN Court of Appeals (A25-1617) challenging negative EIS declaration",
        notes: "EAW completed with negative declaration (EIS not required). Appeal challenges adequacy of environmental review.",
        litigation: {
            active: true,
            caseNumber: "A25-1617",
            court: "MN Court of Appeals",
            status: "Appeal pending",
            filedDate: "2025-10-02"
        },
        timeline: [
            { date: "2025-10-02", event: "Appeal filed in Court of Appeals" },
            { date: "2025-09-02", event: "Negative EIS declaration issued" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "EAW", detail: "Negative declaration - no EIS needed" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/263487?siId=263487-PROJ0000000001" },
            { name: "EQB Monitor Notice", url: "https://content.govdelivery.com/accounts/MNEQB/bulletins/3efc446" },
            { name: "MCEA Appeal Brief (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Brief-Appellant.pdf" },
            { name: "City of Faribault Alert", url: "https://www.ci.faribault.mn.us/CivicAlerts.asp?AID=580&ARC=1452" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 2,
        name: "Hermantown Data Center",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Hermantown",
        county: "St. Louis",
        lat: 46.8069,
        lng: -92.2383,
        acres: 403,
        sqft: 1800000,
        currentStatus: "Lawsuit filed Nov 2025; city denied EAW petition Dec 3 (AUAR already adopted Oct 6); developer paused applications for public engagement",
        notes: "Fortune 50 company project (Mortenson developer). AUAR adopted Oct 6, 2025 via Resolution 2025-147. EQB petition for EAW filed Oct 17 and denied Dec 3 by city (AUAR already covers area). Developer voluntarily withdrew permit applications Nov 10 for further public engagement. Project valued at hundreds of millions initially, potentially billions.",
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
            { date: "2025-10-21", event: "Planning & Zoning meeting postponed" },
            { date: "2025-10-20", event: "Mortenson and MN Power presented to City Council" },
            { date: "2025-10-17", event: "EQB petition filed requesting EAW" },
            { date: "2025-10-06", event: "AUAR adopted (Resolution 2025-147)" },
            { date: "2025-10-01", event: "Application received by city" }
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
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Lakeville",
        county: "Dakota",
        lat: 44.6497,
        lng: -93.2427,
        acres: 152,
        sqft: 1360000,
        currentStatus: "Lawsuit filed Aug 2025; summary judgment briefing scheduled",
        notes: "Also known as Olam/Holus site. Opponents challenge AUAR adequacy and process.",
        litigation: {
            active: true,
            caseNumber: "19HA-CV-25-5103",
            court: "Dakota County District Court",
            status: "Scheduling order entered Dec 12, 2025",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2025-12-12", event: "Court scheduling order for summary judgment briefing" },
            { date: "2025-08-05", event: "Lawsuit filed" },
            { date: "2025-07-08", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved July 8, 2025" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261688?siId=261688-PROJ0000000001" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/08/Lakeville_MCRO_19HA-CV-25-5103_Complaint-Civil_2025-08-05_20250819063829.pdf" },
            { name: "Summary Judgment Order (PDF)", url: "https://legalectric.org/f/2025/12/Lakeaville_Order_SJ-Hearing_CV-25-5103_Order-Other_2025-12-12_20251230105817.pdf" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 4,
        name: "North Mankato Industrial AUAR (Project Deacon)",
        status: "suspended",
        secondaryStatus: "in_litigation",
        city: "North Mankato",
        county: "Nicollet",
        lat: 44.1716,
        lng: -94.0336,
        acres: 678,
        sqft: 4000000,
        currentStatus: "Developer Oppidan backed out; lawsuit remains active",
        notes: "One of the largest proposed data center developments in Minnesota at 4 million square feet. Oppidan Investment withdrew from project citing concerns about backup generator permit timelines. AUAR approved but lawsuit challenges adequacy. No formal application was ever filed.",
        litigation: {
            active: true,
            caseNumber: "52-CV-25-568",
            court: "Nicollet County District Court",
            status: "Lawsuit remains active despite developer withdrawal",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2025-11-01", event: "Oppidan backs out of project (citing generator permit timeline)" },
            { date: "2025-09-09", event: "Project Deacon filed answer" },
            { date: "2025-09-05", event: "City of North Mankato filed answer" },
            { date: "2025-08-05", event: "Lawsuit filed" },
            { date: "2025-07-07", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved July 2025" },
            localZoning: { status: "withdrawn", detail: "No formal application ever filed; developer withdrew" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Mankato Free Press - Oppidan Backs Out", url: "https://www.mankatofreepress.com/news/local_news/data-center-plans-stalled-in-north-mankato-after-developer-backs-out/article_d0617045-9eed-4633-a055-aed5b0405879.html" },
            { name: "Star Tribune - Generator Permits", url: "https://www.startribune.com/developer-halts-two-minnesota-data-centers-over-permits-for-backup-generators/601507579" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261366?siId=261366-PROJ0000000001" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA_N-Mankato_MCRO_52-CV-25-568_Complaint-Civil_2025-08-05_20251230110142.pdf" },
            { name: "City Answer (PDF)", url: "https://legalectric.org/f/2025/12/N-Mankato_MCRO_52-CV-25-568_Answer_2025-09-05_20251230110725.pdf" },
            { name: "Project Deacon Answer (PDF)", url: "https://legalectric.org/f/2025/12/Project-Deacon-Answer-to-Complaint40475555.4-MCRO_52-CV-25-568_Answer_2025-09-09_20251230110752.pdf" },
            { name: "KEYC Coverage", url: "https://www.keyc.com/2025/08/06/group-suing-north-mankato-development/" }
        ],
        lastUpdated: "2026-01-23"
    },
    {
        id: 5,
        name: "Pine Island Project Skyway AUAR",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Pine Island",
        county: "Goodhue",
        lat: 44.2019,
        lng: -92.6460,
        acres: 482,
        sqft: 3000000,
        currentStatus: "Lawsuit filed Oct 2025; TRO denied Dec 29, 2025",
        notes: "Significant development near Rochester area. Related land-use items (plat/CUP) on local agendas. Next hearing Feb 2, 2026.",
        litigation: {
            active: true,
            caseNumber: "25-CV-25-2298",
            court: "Goodhue County District Court",
            status: "TRO denied Dec 29, 2025",
            filedDate: "2025-10-16"
        },
        timeline: [
            { date: "2025-12-29", event: "Court denied TRO request (hearing held Dec 23)" },
            { date: "2025-12-17", event: "City Council approved preliminary plat" },
            { date: "2025-12-12", event: "TRO motion filed" },
            { date: "2025-10-16", event: "Lawsuit filed" },
            { date: "2025-09-16", event: "Revised AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Revised AUAR approved Sept 2025" },
            localZoning: { status: "in_progress", detail: "CUP/plat actions pending" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Pine-Island-Complaint_MCRO_25-CV-25-2298_Complaint-Civil_2025-10-16_20251230105028.pdf" },
            { name: "TRO Denial Order (PDF)", url: "https://legalectric.org/f/2025/12/Pine-Island_MCRO_25-CV-25-2298_Order-Denying-Motion_2025-12-29_20251230104816.pdf" },
            { name: "Post Bulletin Coverage", url: "https://www.postbulletin.com/news/local/data-centers-become-big-news-for-pine-island-cannon-falls-and-opposition" },
            { name: "Planning & Zoning Packet", url: "https://pineislandmn.gov/wp-content/uploads/2026/01/1.13.26-PZ-Meeting-Packet.pdf" }
        ],
        lastUpdated: "2026-01-22"
    },

    // ============================================
    // IN REVIEW - Environmental review in progress
    // ============================================
    {
        id: 6,
        name: "Monticello Industrial AUAR",
        status: "in_review",
        city: "Monticello",
        county: "Wright",
        lat: 45.3055,
        lng: -93.7944,
        acres: 550,
        sqft: 3000000,
        currentStatus: "Final AUAR published Jan 6, awaiting city council approval",
        notes: "Explicitly a data center project. Separate from Scannell Technology Park proposal. Community backlash reported. Open house held Nov 20.",
        litigation: { active: false },
        timeline: [
            { date: "2026-01-06", event: "Final AUAR published, awaiting city council approval" },
            { date: "2025-11-20", event: "Open house on AUAR presentation" },
            { date: "2025-11-20", event: "Community backlash reported (KARE 11)" },
            { date: "2025-08-05", event: "AUAR scoping began" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", type: "AUAR", detail: "Final AUAR published Jan 6, awaiting city council approval" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/264408?siId=264408-PROJ0000000001" },
            { name: "Open House Presentation", url: "https://www.monticellomn.gov/DocumentCenter/View/8755" },
            { name: "City Environmental Reviews", url: "https://www.monticellomn.gov/712/Environmental-Reviews" },
            { name: "City Data Centers Page", url: "https://monticellomn.gov/728/Data-Centers" },
            { name: "KARE 11 Coverage", url: "https://www.kare11.com/article/news/local/proposed-data-centers-in-monticello-spark-community-backlash/89-9f0aa475-3d16-4ab5-8b06-27f4cea6b408" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 7,
        name: "Chaska Big Woods Business Park AUAR",
        status: "in_review",
        city: "Chaska",
        county: "Carver",
        lat: 44.7894,
        lng: -93.6022,
        acres: 359,
        sqft: 2250000,
        currentStatus: "Draft AUAR published; comment period ongoing",
        notes: "Scannell Properties. Likely NOT a data center based on layout and lack of data center indicators in scoping document.",
        litigation: { active: false },
        timeline: [
            { date: "2025-09-23", event: "Draft scoping document released" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", type: "AUAR", detail: "Draft AUAR comment period" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City AUAR Page", url: "https://www.chaskamn.gov/959/Big-Woods-Business-Park-AUAR" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/264886?siId=264886-PROJ0000000001" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 8,
        name: "Cannon Falls Industrial AUAR",
        status: "review_complete",
        city: "Cannon Falls",
        county: "Goodhue",
        lat: 44.5069,
        lng: -93.0569,
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
            { name: "City Environmental Review", url: "https://www.cannonfalls.org/environmental_review" },
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
        lat: 44.6075,
        lng: -93.0069,
        acres: null,
        sqft: 1500000,
        currentStatus: "Final AUAR approved April 15, 2025; 30-day appeal period expired",
        notes: "Refers to a technology park in documentation.",
        litigation: { active: false },
        timeline: [
            { date: "2025-04-15", event: "Final AUAR approved" },
            { date: "2025-03-25", event: "EQB Monitor notice published" },
            { date: "2024-12-24", event: "EQB Monitor notice - public meeting" }
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
        lat: 44.7319,
        lng: -93.2177,
        acres: null,
        sqft: 1050000,
        currentStatus: "AUAR revision proposed late 2025, unclear when finalized; land use application repeatedly delayed, extension granted until Dec 31, 2025",
        notes: "Existing AUAR with technology park scenario. AUAR revision proposed late 2025 but that part is done per Hometown Source.",
        litigation: { active: false },
        timeline: [
            { date: "2024-11-05", event: "Revised AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR revision proposed late 2025, unclear when finalized, but that part is done" },
            localZoning: { status: "in_progress", detail: "Land use application repeatedly delayed, extension granted until Dec 31, 2025" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Proposed Technology Center Data Center", url: "https://www.applevalleymn.gov/1024/Proposed-Technology-Center-Data-Center" },
            { name: "City Project Page", url: "https://www.ci.apple-valley.mn.us/1030/Orchard-Place-AUAR" },
            { name: "Hometown Source - Delays", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/data-center-scenario-contemplated-in-apple-valley/article_9aa87462-961d-11ef-beb5-bbe0992cea55.html" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 11,
        name: "Farmington Technology Park (Tract)",
        status: "in_litigation",
        secondaryStatus: "review_complete",
        city: "Farmington",
        county: "Dakota",
        lat: 44.6402,
        lng: -93.1436,
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
            { date: "2024-10-07", event: "AUAR adopted (Resolution 2024-97)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Adopted Oct 7, 2024" },
            localZoning: { status: "in_progress", detail: "PUD approved but challenged" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259881?siId=259881-PROJ0000000001" },
            { name: "GovTech - Lawsuit", url: "https://www.govtech.com/infrastructure/farmington-minn-residents-sue-to-stop-data-center-park" },
            { name: "Coalition Website", url: "https://www.datacenterresponsibility.com/whatishappening" },
            { name: "Streets.mn Deep Dive", url: "https://streets.mn/2025/11/07/deep-dive-the-farmington-push-for-responsible-hyper-scale-data-centers/" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 12,
        name: "Farmington West AUAR",
        status: "review_complete",
        city: "Farmington",
        county: "Dakota",
        lat: 44.6402,
        lng: -93.1836,
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
        lat: 44.7394,
        lng: -93.0558,
        acres: 447,
        sqft: 2300000,
        currentStatus: "Final AUAR approved; materials hosted on city site",
        notes: "Describes 'technology park' scenario, similar approach to North Mankato AUAR.",
        litigation: { active: false },
        timeline: [
            { date: "2025-07-15", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261731?siId=261731-PROJ0000000001" },
            { name: "City Environmental Reviews", url: "https://www.rosemountmn.gov/467/Environmental-Reviews" },
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
        lat: 44.7644,
        lng: -93.0858,
        acres: 333,
        sqft: 2300000,
        currentStatus: "Adopted June 11, 2024 (333 acreage)",
        notes: "New AUAR explicitly targeting data center projects.",
        litigation: { active: false },
        timeline: [
            { date: "2024-06-11", event: "Final AUAR adopted (333 acres)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR adopted June 11, 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City Fix Websit", url: "https://www.rosemountmn.gov/689/Environmental-Review" },
            { name: "EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/257490?siId=257490-PROJ0000000001" },
            { name: "City Environmental Reviews", url: "https://www.rosemountmn.gov/467/Environmental-Reviews" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 15,
        name: "Rosemount Industrial AUAR",
        status: "review_complete",
        city: "Rosemount",
        county: "Dakota",
        lat: 44.7544,
        lng: -93.1258,
        acres: 235,
        sqft: 4000000,
        currentStatus: "Updated AUAR and Resolution 2024-85 approved Aug 6, 2024 (235 acres)",
        notes: "Existing AUAR from 2023, updated with data center scenario in 2024.",
        litigation: { active: false },
        timeline: [
            { date: "2024-08-06", event: "AUAR update approved (Resolution 2024-85)" },
            { date: "2023-01-01", event: "Original AUAR approved" }
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
            { name: "Resolution 2024-85 (PDF)", url: "https://www.rosemountmn.gov/DocumentCenter/View/7069/Resolution-2024-85" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 16,
        name: "Thomson Reuters Redevelopment Project",
        status: "review_complete",
        city: "Eagan",
        county: "Dakota",
        lat: 44.8041,
        lng: -93.1669,
        acres: 179,
        sqft: 1350000,
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

    // ============================================
    // WATCHING - Early stage / rumored / no formal filings
    // ============================================
    {
        id: 17,
        name: "Harmony Data Center",
        status: "watching",
        city: "Harmony",
        county: "Fillmore",
        lat: 43.5541,
        lng: -92.0105,
        acres: 50,
        sqft: null,
        currentStatus: "Early-stage Economic Development Authority exploration; annexation discussions ongoing",
        notes: "Southeast Minnesota location near Iowa border. No AUAR/EAW filed yet.",
        litigation: { active: false },
        timeline: [
            { date: "2025-10-20", event: "Annexation discussed at meeting" },
            { date: "2025-10-07", event: "Community member raises concerns at meeting" }
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
        lat: 45.2855,
        lng: -93.8144,
        acres: null,
        sqft: 1300000,
        currentStatus: "Reported early-stage proposal; no AUAR filed yet",
        notes: "Separate from Monticello Industrial AUAR. 150MW proposal marketed by Cushman Wakefield.",
        litigation: { active: false },
        timeline: [
            { date: "2025-10-27", event: "Finance & Commerce reports on proposal" },
            { date: "2025-06-01", event: "Sales brochure published" }
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
        lastUpdated: "2026-01-22"
    },
    {
        id: 19,
        name: "Glencoe AI Data Center",
        status: "watching",
        city: "Glencoe",
        county: "McLeod",
        lat: 44.7680,
        lng: -94.1516,
        acres: null,
        sqft: null,
        currentStatus: "Early concept; Economic Development Authority reviewed concept plans Sept 2024",
        notes: "Reported as $50-60M AI data center concept.",
        litigation: { active: false },
        timeline: [
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
            { name: "City Current Projects", url: "https://www.glencoemn.org/departments/streets/current-projects/" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 20,
        name: "Cottage Grove Business Park AUAR",
        status: "watching",
        city: "Cottage Grove",
        county: "Washington",
        lat: 44.8277,
        lng: -92.9438,
        acres: null,
        sqft: null,
        currentStatus: "Existing AUAR (2018, updated 2022) covers 'major technology center' scenario",
        notes: "If specific data center proposal emerges, watch for site-specific permits/platting.",
        litigation: { active: false },
        timeline: [
            { date: "2022-02-01", event: "AUAR update approved" },
            { date: "2018-01-22", event: "Original Business Park AUAR adopted" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "2018 AUAR + 2022 update" },
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
        name: "Becker Amazon Data Center",
        status: "suspended",
        city: "Becker",
        county: "Sherburne",
        lat: 45.4036,
        lng: -93.8569,
        acres: null,
        sqft: null,
        currentStatus: "Amazon pulled out after PUC required Certificate of Need for backup generators",
        notes: "PUC ruled Certificate of Need required for backup generators Feb 28, 2025. Amazon subsequently withdrew May 23, 2025.",
        litigation: { active: false },
        timeline: [
            { date: "2025-05-23", event: "Amazon pulls out of Becker plans" },
            { date: "2025-02-28", event: "PUC rules Certificate of Need required" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "blocked", detail: "PUC Certificate of Need required" }
        },
        sources: [
            { name: "Public Power", url: "https://www.publicpower.org/periodical/article/minnesota-regulators-rule-certificate-need-required-backup-generators-data-center" },
            { name: "E&E News", url: "https://www.eenews.net/articles/amazon-needs-permit-for-minnesota-data-center-backup-power/" },
            { name: "Bring Me The News", url: "https://bringmethenews.com/minnesota-news/amazon-cant-skip-permitting-process-for-data-center-generators-mn-utilities-commission-decides-" },
            { name: "Industrial Info", url: "https://www.industrialinfo.com/iirenergy/industry-news/article/amazon-pulls-out-of-problematic-plans-for-minnesota-data-center--342325" }
        ],
        lastUpdated: "2026-01-22"
    },
    {
        id: 22,
        name: "Microsoft Becker Proposal",
        status: "watching",
        city: "Becker",
        county: "Sherburne",
        lat: 45.3936,
        lng: -93.8769,
        acres: 295,
        sqft: null,
        currentStatus: "Land purchased Feb 2024; no formal plans submitted to city yet",
        notes: "Microsoft purchased 295 acres from Xcel Energy for $17.7M in February 2024 with intent to build data center. No plans have been officially submitted to the city. Microsoft has not commented publicly on timeline. Site is near closing Sherco power plant. Google had previously backed out of plans for this area in 2022.",
        litigation: { active: false },
        timeline: [
            { date: "2025-12-18", event: "GovTech reports on secrecy concerns" },
            { date: "2024-02-12", event: "Microsoft closes on 295 acres from Xcel for $17.7M" },
            { date: "2022-12-01", event: "Google backs out of previous Becker data center plans" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "not_started" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/news/microsoft-buys-300-acres-in-becker-minnesota/" },
            { name: "MPR News", url: "https://www.mprnews.org/story/2024/02/21/xcel-energy-sells-land-in-becker-to-microsoft-for-data-center" },
            { name: "Star Tribune", url: "https://www.startribune.com/microsoft-building-data-center-in-becker-xcel-stress-on-grids/600344079" },
            { name: "GovTech", url: "https://www.govtech.com/policy/minnesota-data-center-approvals-happening-with-secrecy" }
        ],
        lastUpdated: "2026-01-22"
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
    const validProjects = projectData.filter(p => p.status !== 'suspended');
    let totalAcres = 0;
    let totalSqft = 0;

    projectData.forEach(p => {
        if (p.acres) totalAcres += p.acres;
        if (p.sqft) totalSqft += p.sqft;
    });

    // Count includes both primary and secondary statuses
    // (e.g., Hermantown is both in_litigation and review_complete)
    return {
        totalProjects: validProjects.length,
        totalAcres: Math.round(totalAcres),
        totalSqft: totalSqft,
        countByStatus: {
            in_litigation: projectData.filter(p => p.status === 'in_litigation' || p.secondaryStatus === 'in_litigation').length,
            in_review: projectData.filter(p => p.status === 'in_review' || p.secondaryStatus === 'in_review').length,
            review_complete: projectData.filter(p => p.status === 'review_complete' || p.secondaryStatus === 'review_complete').length,
            construction: projectData.filter(p => p.status === 'construction' || p.secondaryStatus === 'construction').length,
            operational: projectData.filter(p => p.status === 'operational' || p.secondaryStatus === 'operational').length,
            watching: projectData.filter(p => p.status === 'watching' || p.secondaryStatus === 'watching').length,
            suspended: projectData.filter(p => p.status === 'suspended' || p.secondaryStatus === 'suspended').length
        }
    };
}

// Export for use
window.projectData = projectData;
window.statusInfo = statusInfo;
window.calculateStats = calculateStats;
