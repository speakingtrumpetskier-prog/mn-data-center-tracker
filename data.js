// Minnesota Data Center Tracker - Project Data
// Last updated: November 9, 2026
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
        status: "in_review",
        city: "Faribault",
        county: "Rice",
        lat: 44.3671,
        lng: -93.2845,
        acres: 84.3,
        sqft: 500000,
        currentStatus: "Minnesota Court of Appeals reversed the city's negative declaration on June 8, 2026, and remanded the project for further environmental review. The City Council formally gave Archer through March 31, 2027, to prepare a supplemental EAW.",
        notes: "MCEA successfully challenged the city's negative declaration, arguing that the environmental review understated impacts to climate change and Minnesota's electricity grid. Site at 15339 Acorn Trail, south of 150th St W in Northern Industrial Park. The appellate case concluded with reversal and remand on June 8, 2026.",
        litigation: {
            active: false,
            caseNumber: "A25-1617",
            court: "MN Court of Appeals",
            status: "Court of Appeals case concluded June 8, 2026, with reversal and remand for further environmental review",
            filedDate: "2025-10-02"
        },
        timeline: [
            { date: "2026-07-14", event: "City Council formally granted an extension through March 31, 2027, for the supplemental EAW" },
            { date: "2026-07-07", event: "City Council agreed to extend the supplemental EAW schedule to March 2027" },
            { date: "2026-06-08", event: "Minnesota Court of Appeals overturns City's approval of environmental review" },
            { date: "2026-05", event: "Oral argument heard in MN Court of Appeals" },
            { date: "2025-10-02", event: "Appeal filed in Court of Appeals" },
            { date: "2025-09-02", event: "Negative EIS declaration issued" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", type: "EAW", detail: "Court of Appeals remanded the review; City Council granted Archer through March 31, 2027, to prepare a supplemental EAW" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City of Faribault - Archer Datacenters", url: "https://www.faribaultmn.gov/815/Archer-Datacenters" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/263487?siId=263487-PROJ0000000001" },
            { name: "EQB Monitor Notice", url: "https://content.govdelivery.com/accounts/MNEQB/bulletins/3efc446" },
            { name: "MCEA Appeal Brief (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Brief-Appellant.pdf" },
            { name: "City of Faribault Alert", url: "https://www.ci.faribault.mn.us/CivicAlerts.asp?AID=580&ARC=1452" },
            { name: "KEYC - City Will Revise Environmental Review", url: "https://www.keyc.com/2026/06/10/city-faribault-revise-environmental-review-after-minnesota-court-appeals-case/" },
            { name: "KAAL - Court Orders Further Study", url: "https://www.kaaltv.com/news/minnesota-court-of-appeals-rules-full-impact-study-is-needed-for-proposed-faribault-data-center/" },
            { name: "SouthernMinn - Lawsuit on Hold Coverage", url: "https://www.southernminn.com/the_kenyon_leader/news/lawsuit-resident-concerns-put-faribault-data-center-on-hold/article_4340814d-1eb0-4a35-a9d5-6aade04eafa2.html" }
        ],
        lastUpdated: "2026-07-30"
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
        acres: 234,
        sqft: 1635000,
        currentStatus: "The City adopted the final updated AUAR Oct. 5 and approved the special-use permit, preliminary plat, development agreement, and decommissioning agreement Oct. 30. Environmental groups filed a new lawsuit Nov. 4 challenging the updated review. Minnesota Power's PUC electric-service-agreement docket remains pending, and construction has not been confirmed.",
        notes: "Google confirmed as the company behind the proposed Hermantown data center in March 2026. The filed special-use permit application covers approximately 234 acres. Site plans show three 375,000-square-foot data center buildings, three 150,000-square-foot mechanical buildings, a 30,000-square-foot office building, and two 15,000-square-foot support buildings, totaling 1.635 million square feet. The final updated AUAR continues to analyze a broader 278-acre, 1.8-million-square-foot maximum-build scenario.",
        litigation: {
            active: true,
            caseNumber: "69DU-CV-25-3448; 69DU-CV-26-2040",
            court: "St. Louis County District Court",
            status: "Multiple active challenges, including a Nov. 4, 2026 lawsuit over the updated AUAR",
            filedDate: "2025-11-05"
        },
        timeline: [
            { date: "2026-11-04", event: "Environmental groups filed a new lawsuit challenging the updated AUAR" },
            { date: "2026-10-30", event: "City Council approved the special-use permit, preliminary plat, development agreement, and decommissioning agreement and rejected an EAW petition" },
            { date: "2026-10-20", event: "Planning Commission recommended approval of the special-use permit and preliminary plat" },
            { date: "2026-10-19", event: "Google withdrew its tax-abatement request and advanced a decommissioning agreement" },
            { date: "2026-10-05", event: "City Council adopted the final updated AUAR" },
            { date: "2026-09-10", event: "DNR confirmed it did not object to the updated AUAR and provided technical recommendations after Sept. 2 discussions and the City's Sept. 4 response" },
            { date: "2026-08-25", event: "DNR submitted a clarification letter identifying remaining information, alternatives, and mitigation concerns without filing a formal AUAR objection" },
            { date: "2026-08-20", event: "City completed Aug. 17-20 informational presentations and work sessions; no project action was taken" },
            { date: "2026-08-12", event: "City posted updated special-use permit application and site-development materials" },
            { date: "2026-08-04", event: "City submitted the final updated AUAR to the Environmental Quality Board" },
            { date: "2026-07-16", event: "Draft AUAR and mitigation plan comment period closed" },
            { date: "2026-06-11", event: "City posted draft AUAR and mitigation plan and opened comment period through July 16, 2026" },
            { date: "2026-05-18", event: "City Council accepted updated scoping document and authorized work toward draft AUAR" },
            { date: "2026-05-04", event: "City Council tabled Google tax-abatement and development agreements" },
            { date: "2026-04-29", event: "Hermantown residents filed separate lawsuit over city actions related to the proposed data center" },
            { date: "2026-04-30", event: "Updated AUAR scoping comment period closed" },
            { date: "2026-03-31", event: "City opened updated AUAR scoping comment period for Google data center campus" },
            { date: "2026-03-16", event: "City Council approved third-party technical review contract for updated AUAR" },
            { date: "2026-03-12", event: "Mayor announced updated AUAR process in partnership with Google" },
            { date: "2026-03-03", event: "Google publicly confirmed as company behind proposed Hermantown data center" },
            { date: "2025-12-03", event: "City denied EAW petition (AUAR already adopted)" },
            { date: "2025-11-10", event: "Mortenson withdrew applications for public engagement" },
            { date: "2025-11-05", event: "Lawsuit filed" },
            { date: "2025-10-21", event: "City received EQB petition (filed Oct 17)" },
            { date: "2025-10-20", event: "Mortenson and MN Power presented to City Council" },
            { date: "2025-10-17", event: "EQB petition filed requesting EAW" },
            { date: "2025-10-06", event: "AUAR adopted (Resolution 2025-147)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final updated AUAR adopted Oct. 5, 2026; challenged in court Nov. 4" },
            localZoning: { status: "approved", detail: "Special-use permit, preliminary plat, development agreement, and decommissioning agreement approved Oct. 30, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Minnesota Power filed PUC electric service agreement docket 26-159 for Harmony Group LLC on Mar. 26, 2026; public comment period closed Aug. 28, 2026, and a Commission decision is pending" }
        },
        sources: [
            { name: "City Project Page", url: "https://hermantownmn.com/project/" },
            { name: "MPR - City Approvals", url: "https://www.mprnews.org/story/2026/10/31/hermantown-approves-controversial-google-data-center-during-late-night-meeting" },
            { name: "KAXE - Updated AUAR Lawsuit", url: "https://www.kaxe.org/local-news/2026-11-05/environmental-groups-sue-hermantown-google-over-data-center-review" },
            { name: "DNR Aug. 25 AUAR Clarification Letter (PDF)", url: "https://hermantownmn.com/wp-content/uploads/2026/09/2026-08-25-Updated-Hermantown-Industrial-AUAR.pdf" },
            { name: "DNR Sept. 10 AUAR Follow-up (PDF)", url: "https://hermantownmn.com/wp-content/uploads/2026/09/2026-09-10-Hermantown-AUAR-follow-up.pdf" },
            { name: "Final Updated AUAR (PDF)", url: "https://hermantownmn.com/wp-content/uploads/2026/08/2026-08-04-Hermantown-Industrial-Final-AUAR-1.pdf" },
            { name: "Special Use Permit Application (PDF)", url: "https://hermantownmn.com/wp-content/uploads/2026/08/Application-SUP.pdf" },
            { name: "Site Development Plans (PDF)", url: "https://hermantownmn.com/wp-content/uploads/2026/08/Site-Development-Plans.pdf" },
            { name: "KAXE - May Agreements and AUAR Update", url: "https://www.kaxe.org/local-news/2026-05-20/more-details-emerge-as-google-hermantown-work-out-data-center-agreements" },
            { name: "MPR - Resident Lawsuit", url: "https://www.mprnews.org/story/2026/04/29/hermantown-residents-sue-to-block-proposed-google-data-center" },
            { name: "MPR - Vote Tabled", url: "https://www.mprnews.org/story/2026/05/05/hermantown-google-data-center-vote-tabled" },
            { name: "City AUAR Scoping Release", url: "https://hermantownmn.com/community/community-highlights/scoping-document-comment-period-opens-for-google-data-center/" },
            { name: "MCEA Legal Update", url: "https://www.mncenter.org/legal-updates-mceas-data-center-cases" },
            { name: "KAXE - Google Confirmed", url: "https://www.kaxe.org/local-news/2026-03-03/google-proposed-data-center-hermantown-minnesota-power" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/263202?siId=263202-PROJ0000000001" },
            { name: "Minnesota PUC - Data Center Dockets", url: "https://mn.gov/puc/activities/v-l-e-c/data-centers/" },
            { name: "City EAW Denial Letter (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Hermantown-EQB-Response-2025-12-03.pdf" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA_Hermantown_MCRO_69DU-CV-25-3448_Complaint-Civil_2025-11-05_20251230104248.pdf" },
            { name: "KAXE Coverage", url: "https://www.kaxe.org/local-news/2025-10-23/public-petition-against-hermantown-data-center-pumps-brakes-on-project" },
            { name: "MPR News", url: "https://www.mprnews.org/story/2025/10/22/hermantown-delays-permits-for-disputed-data-center" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 3,
        name: "Olam Lakeville Industrial AUAR",
        status: "watching",
        secondaryStatus: "review_complete",
        city: "Lakeville",
        county: "Dakota",
        lat: 44.6045,
        lng: -93.2310,
        acres: 152,
        sqft: 1360000,
        currentStatus: "The Dakota County District Court granted summary judgment to the City and Olam Oct. 7, 2026, upholding the AUAR. No specific data center end user or active project has been identified.",
        notes: "Olam Holdings 1, LLC / Terawatt Infrastructure project. The final AUAR was approved July 7, 2025. The district court resolved the legal challenge in favor of the City and Olam on Oct. 7, 2026.",
        litigation: {
            active: false,
            caseNumber: "19HA-CV-25-5103",
            court: "Dakota County District Court",
            status: "Summary judgment granted to City and Olam, Oct. 7, 2026",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2026-10-07", event: "District court granted summary judgment to the City and Olam; AUAR upheld" },
            { date: "2026-01-15", event: "MCEA filed summary judgment motion" },
            { date: "2025-12-12", event: "Summary judgment scheduling order entered" },
            { date: "2025-08-05", event: "Lawsuit filed" },
            { date: "2025-07-07", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved July 7, 2025; legal challenge resolved by summary judgment Oct. 7, 2026" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City of Lakeville - Summary Judgment", url: "https://www.lakevillemn.gov/m/newsflash/Home/Detail/1124" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/261688?siId=261688-PROJ0000000001" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/08/Lakeville_MCRO_19HA-CV-25-5103_Complaint-Civil_2025-08-05_20250819063829.pdf" },
            { name: "Summary Judgment Scheduling Order (PDF)", url: "https://legalectric.org/f/2025/12/Lakeaville_Order_SJ-Hearing_CV-25-5103_Order-Other_2025-12-12_20251230105817.pdf" },
            { name: "Summary Judgment Motion (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/2026-01-15-Memo-ISO-SJ-Motion.pdf" },
            { name: "Hometown Source - Lakeville Defends AUAR", url: "https://www.hometownsource.com/sun_thisweek/community/lakeville/lakeville-defends-its-environmental-review-of-an-alleged-data-center-project/article_64f3b99d-6cef-4669-bac3-6bd1d21b2554.html" }
        ],
        lastUpdated: "2026-11-09"
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
        currentStatus: "The developer withdrew, and no data center application is active. The City Council adopted a one-year data center moratorium Sept. 21, 2026.",
        notes: "The AUAR analyzed up to 4 million square feet. Oppidan Investment withdrew, no formal development application was filed, and the related lawsuit was voluntarily dismissed without prejudice in May 2026.",
        litigation: {
            active: false,
            caseNumber: "52-CV-25-568",
            court: "Nicollet County District Court",
            status: "Voluntarily dismissed without prejudice, May 2026",
            filedDate: "2025-08-05"
        },
        timeline: [
            { date: "2026-09-21", event: "City Council adopted a one-year moratorium on data center development" },
            { date: "2026-05-15", event: "MCEA published legal update explaining voluntary dismissal without prejudice because no data center was proposed" },
            { date: "2026-05-11", event: "KEYC reported lawsuit challenging North Mankato AUAR was dropped" },
            { date: "2026-03-18", event: "City Administrator confirms 'no data center' coming to North Mankato at State of the Cities summit (KEYC)" },
            { date: "2025-11-17", event: "Developer Oppidan withdrawal confirmed in press reports" },
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
            { name: "KEYC - Data Center Moratorium", url: "https://www.keyc.com/2026/09/22/north-mankato-city-council-adopts-data-center-moratorium/" },
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
        lastUpdated: "2026-11-09"
    },
    {
        id: 5,
        name: "Pine Island Project Skyway AUAR",
        status: "in_review",
        secondaryStatus: "review_complete",
        city: "Pine Island",
        county: "Goodhue",
        lat: 44.2130,
        lng: -92.6180,
        acres: 482,
        sqft: 3000000,
        currentStatus: "The parties settled the AUAR lawsuit Oct. 28, 2026. A new state-led EAW and mitigation plan, including public comment, are required before construction. The City cannot authorize construction until it approves the mitigation plan. PUC electric-service-agreement and transmission-route proceedings remain pending.",
        notes: "Google is the identified end user and Ryan Companies is the developer. The original AUAR remains the foundation for a new state environmental assessment, mitigation plan, and public-comment process required by the settlement.",
        litigation: {
            active: false,
            caseNumber: "25-CV-25-2298",
            court: "Goodhue County District Court",
            status: "Settled Oct. 28, 2026; court challenge ended.",
            filedDate: "2025-10-16"
        },
        timeline: [
            { date: "2026-10-28", event: "Parties settled the lawsuit; settlement requires a new state EAW, mitigation plan, and public-comment process before construction" },
            { date: "2026-09-15", event: "PUC route-permit public meetings concluded" },
            { date: "2026-09-08", event: "PUC public-comment period closed on Xcel Energy's electric service agreement with Echo Zone; decision pending" },
            { date: "2026-08-18", event: "PUC posted a draft route permit for the 1.2-mile Skyway 345-kV transmission line" },
            { date: "2026-05-22", event: "Temporary injunction issued by Judge Patrick M. Biren; all construction/pre-construction halted" },
            { date: "2026-04-20", event: "Summary judgment hearing (defendants' motion denied)" },
            { date: "2026-04-14", event: "Xcel Energy filed PUC electric service agreement docket 26-170 for Echo Zone LLC" },
            { date: "2026-04-06", event: "Summary judgment hearing" },
            { date: "2026-02", event: "Google publicly confirmed as Project Skyway client" },
            { date: "2026-01-13", event: "City Council approved CUP for first building (250,000 sqft)" },
            { date: "2025-12-17", event: "City Council approved preliminary plat" },
            { date: "2025-11", event: "Ryan Companies signed NDA with city on behalf of Google" },
            { date: "2025-10-16", event: "Lawsuit filed" },
            { date: "2025-09-16", event: "Revised AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", type: "EAW", detail: "Settlement approved Oct. 28, 2026 requires a new state-led environmental assessment, mitigation plan, and public-comment process" },
            localZoning: { status: "approved", detail: "CUP approved Jan. 2026; settlement bars construction until the City approves the required mitigation plan" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Xcel Energy's electric service agreement docket 26-170 and the 1.2-mile Skyway 345-kV route-permit docket 26-135 remain pending; route-permit public meetings concluded Sept. 15, 2026" }
        },
        sources: [
            { name: "City of Pine Island - Settlement Agreement", url: "https://pineislandmn.gov/vertical/sites/%7B52A5D060-3422-4069-8E86-A961C2752B7F%7D/uploads/City_of_Pine_Island_City_Council_Approves_MCEA_Lawsuit_Settlement_Agreement(1).pdf" },
            { name: "MPR - New Environmental Review", url: "https://www.mprnews.org/story/2026/10/29/pine-island-google-data-center-to-get-new-environmental-review" },
            { name: "KTTC - Lawsuit Settlement", url: "https://www.kttc.com/2026/10/29/pine-island-settles-project-skyway-lawsuit-clears-way-state-data-center-review/" },
            { name: "MPR - Construction Halted by Judge", url: "https://www.mprnews.org/story/2026/05/26/pine-island-hyperscale-data-center-construction-halted-by-judge" },
            { name: "Star Tribune - Work Halted", url: "https://www.startribune.com/minnesota-data-center-pine-island-restraining-order/601849201" },
            { name: "Post Bulletin - Restraining Order", url: "https://www.postbulletin.com/news/local/court-grants-restraining-order-to-halt-project-skyway-progress-in-pine-island" },
            { name: "KSTP - Court Pauses Development", url: "https://kstp.com/kstp-news/top-news/court-pauses-development-on-planned-google-data-center-in-pine-island/" },
            { name: "Complaint (PDF)", url: "https://legalectric.org/f/2025/12/MCEA-Pine-Island-Complaint_MCRO_25-CV-25-2298_Complaint-Civil_2025-10-16_20251230105028.pdf" },
            { name: "Post Bulletin - Flurry of Filings", url: "https://www.postbulletin.com/news/local/flurry-of-filings-come-as-court-dates-draw-near-for-pine-island-data-center" },
            { name: "Minnesota PUC - Data Center Dockets", url: "https://mn.gov/puc/activities/v-l-e-c/data-centers/" },
            { name: "Minnesota PUC - Skyway 345 kV Transmission Line", url: "https://puc.eip.mn.gov/web/project/26135" },
            { name: "Xcel Energy - Skyway Transmission Line", url: "https://xcelenergytransmission.com/projects/skyway/" },
            { name: "Planning & Zoning CUP Notice", url: "https://pineislandmn.gov/vertical/sites/%7B52A5D060-3422-4069-8E86-A961C2752B7F%7D/uploads/1.13.26_PZ_Notice_-_CUP.pdf" }
        ],
        lastUpdated: "2026-11-09"
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
        currentStatus: "MCEA's Wright County lawsuit challenging AUAR adequacy remains active. The Planning Commission recommended approval of Monticello Tech's DCPUD conditional use permit, rezoning, and preliminary plat 4-1 on Oct. 6. The City Council scheduled a Nov. 9 public hearing and consideration of the applications and annexation.",
        notes: "Proposed by Monticello Tech LLC (Frattalone Companies) on 550 acres south of 85th Street NE and east of Highway 25. The AUAR analyzed a 3 million-square-foot technology campus and a 5 million-square-foot light-industrial scenario. The current applications cover a DCPUD conditional use permit, rezoning, and preliminary plat; a final plat would require a future application. Separate from the Scannell Technology Park proposal.",
        litigation: {
            active: true,
            caseNumber: "86-CV-26-1130",
            court: "Wright County District Court",
            status: "Lawsuit filed Feb 25, 2026",
            filedDate: "2026-02-25"
        },
        timeline: [
            { date: "2026-11-09", event: "City Council public hearing and consideration scheduled for the land-use applications and annexation" },
            { date: "2026-10-19", event: "City posted supplemental application materials for City Council review" },
            { date: "2026-10-15", event: "Applicant submitted supplemental materials" },
            { date: "2026-10-06", event: "Planning Commission recommended approval of the DCPUD CUP, rezoning, and preliminary plat 4-1" },
            { date: "2026-09-04", event: "City Council authorized an escrow agreement to recover application-review expenses" },
            { date: "2026-08-11", event: "Applicant provided supplemental materials; City determined the land-use applications complete and extended the decision deadline to December 8, 2026" },
            { date: "2026-08-03", event: "City received a second submission of Monticello Tech's land-use applications" },
            { date: "2026-07-23", event: "City sent the applicant additional clarification regarding incomplete application items" },
            { date: "2026-07-20", event: "City determined the July 6 development applications were incomplete" },
            { date: "2026-07-06", event: "City received rezoning, conditional use permit, and plat applications from Monticello Tech LLC" },
            { date: "2026-04-27", event: "Council approved Data Center Ordinance regulating future data center and technology campus applications" },
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
            localZoning: { status: "in_progress", detail: "Planning Commission recommended approval 4-1 on Oct. 6; City Council public hearing and consideration of the land-use applications and annexation were scheduled for Nov. 9, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City - Monticello Tech", url: "https://www.monticellomn.gov/753/Monticello-Tech" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/264408?siId=264408-PROJ0000000001" },
            { name: "Open House Presentation", url: "https://www.monticellomn.gov/DocumentCenter/View/8755" },
            { name: "City Environmental Reviews", url: "https://www.monticellomn.gov/712/Environmental-Reviews" },
            { name: "City Data Centers Page", url: "https://monticellomn.gov/728/Data-Centers" },
            { name: "MPR - Data Center Ordinance Approved", url: "https://www.mprnews.org/story/2026/04/28/monticello-ordinance-data-centers-face-new-restrictions-open-door-to-building" },
            { name: "KARE 11 Coverage", url: "https://www.kare11.com/article/news/local/proposed-data-centers-in-monticello-spark-community-backlash/89-9f0aa475-3d16-4ab5-8b06-27f4cea6b408" },
            { name: "Hometown Source - AUAR Adoption", url: "https://www.hometownsource.com/monticello_times/council-adopts-auar-planning-study-for-possible-data-center/article_df3d6460-7c9e-442d-b460-f1d3585d63cc.html" },
            { name: "Hometown Source - MCEA Lawsuit", url: "https://www.hometownsource.com/monticello_times/environmental-group-files-lawsuit-challenging-monticello-data-center-review/article_d5ffa609-757b-485d-b8b4-ef8e3ead2694.html" },
            { name: "MCEA Data Centers Page", url: "https://www.mncenter.org/data-centers" }
        ],
        lastUpdated: "2026-11-09"
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
        currentStatus: "Final AUAR approved in September 2025. The City Council approved a conditional use permit for the technology park in November 2025, and a Tract-linked entity purchased the site in May 2026.",
        notes: "Proposed technology park on approximately 251 acres north of Cannon Falls. The AUAR evaluates up to 1.75 million square feet of industrial or technology-park development.",
        litigation: { active: false },
        timeline: [
            { date: "2026-05", event: "Tract-linked entity purchased the proposed technology park site" },
            { date: "2026-01-06", event: "Post Bulletin coverage of local debate" },
            { date: "2025-11-05", event: "City Council approved conditional use permit for the technology park" },
            { date: "2025-09-16", event: "Final AUAR approved" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR approved" },
            localZoning: { status: "approved", detail: "City Council approved a conditional use permit November 5, 2025" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City - Cannon Falls Technology Park", url: "https://www.cannonfallsmn.gov/1245/Cannon-Falls-Technology-Park" },
            { name: "City Council Minutes - Nov. 5, 2025", url: "https://www.cannonfallsmn.gov/AgendaCenter/ViewFile/ArchivedMinutes/_11182025-17" },
            { name: "Finance & Commerce - Tract Land Purchase", url: "https://finance-commerce.com/2026/05/cannon-falls-data-center-land-sale-tract-15-2m/" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/262244?siId=262244-PROJ0000000001" },
            { name: "City AUAR Page", url: "https://www.cannonfallsmn.gov/community/page/auar-alternative-urban-area-review" },
            { name: "Post Bulletin Coverage", url: "https://www.postbulletin.com/news/local/data-centers-become-big-news-for-pine-island-cannon-falls-and-opposition" }
        ],
        lastUpdated: "2026-07-27"
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
    // CONSTRUCTION - Actively under construction
    // ============================================
    {
        id: 26,
        name: "Meta Rosemount Data Center",
        status: "construction",
        city: "Rosemount",
        county: "Dakota",
        lat: 44.7388,
        lng: -93.0743,
        acres: 280,
        sqft: 715000,
        currentStatus: "Meta's UMore Park data center remains under construction, with July 2026 reports of construction nearing completion.",
        notes: "Formerly code-named Project Bigfoot / Jimnist. The 280-acre UMore Park campus is a separate named project from the Rosemount Industrial, Rich Valley East, and Dakota East AUAR areas already tracked elsewhere on the map.",
        litigation: { active: false },
        timeline: [
            { date: "2026-07", event: "Reports describe construction as nearing completion" },
            { date: "2026", event: "Expected opening year" },
            { date: "2024-03-14", event: "State publicly announces Meta's Rosemount data center" },
            { date: "2023-12-21", event: "Rosemount City Council approves Project Bigfoot / Jimnist application" },
            { date: "2023-09", event: "University of Minnesota approves sale of UMore Park land for data center site" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "UMore Park AUAR update covers the Project Bigfoot area" },
            localZoning: { status: "approved", detail: "City approvals issued for Project Bigfoot / Jimnist" },
            buildingPermit: { status: "in_progress" },
            utilities: { status: "in_progress", detail: "Xcel and city infrastructure upgrades planned for the UMore area" }
        },
        sources: [
            { name: "Courier Minnesota - Rosemount Construction Update", url: "https://couriermn.com/news/environment/where-are-data-centers-being-proposed-in-minnesota-we-are-tracking-them/" },
            { name: "MN DEED - Meta Announcement", url: "https://mn.gov/deed/newscenter/press-releases/?id=1045-614051" },
            { name: "City of Rosemount - Development Page", url: "https://rosemountmn.gov/progress" },
            { name: "City of Rosemount - Environmental Review", url: "https://www.rosemountmn.gov/689/Environmental-Review" },
            { name: "UMore Park AUAR Update", url: "https://www.rosemountmn.gov/DocumentCenter/View/6791/UMore-Park-AUAR-2023-Draft" },
            { name: "Data Center Dynamics - Council Approval", url: "https://www.datacenterdynamics.com/en/news/rosemount-city-council-approves-meta-data-center-project/" }
        ],
        lastUpdated: "2026-07-27"
    },

    // ============================================
    // APPROVED - Environmental review complete
    // ============================================
    {
        id: 10,
        name: "Apple Valley AUAR (Orchard Place)",
        status: "suspended",
        secondaryStatus: "review_complete",
        city: "Apple Valley",
        county: "Dakota",
        lat: 44.7250,
        lng: -93.2050,
        acres: null,
        sqft: 1050000,
        currentStatus: "City Council denied the site plan, preliminary plat, and conditional use permit on March 26, 2026, after the rezoning request was withdrawn. The city adopted a temporary data center moratorium July 9.",
        notes: "Rockport LLC / Oppidan Investment proposed a technology campus with five data center buildings on a former mining site. The AUAR update with a data center scenario remains complete, but the project's land-use approvals were denied.",
        litigation: { active: false },
        timeline: [
            { date: "2026-07-09", event: "City Council adopted a temporary moratorium on establishing or expanding data centers" },
            { date: "2026-03-26", event: "City Council denied the site plan, preliminary plat, and conditional use permit" },
            { date: "2026-03-18", event: "Planning Commission recommended denial of the remaining project applications" },
            { date: "2026-03-06", event: "Applicant withdrew the rezoning request" },
            { date: "2026-01-23", event: "City Council unanimously denied comprehensive plan amendment" },
            { date: "2025-04-02", event: "Planning Commission recommended denial (5-1)" },
            { date: "2025-02-05", event: "Planning Commission public hearing; tabled due to site concerns" },
            { date: "2024-12-30", event: "Complete land use application received by city" },
            { date: "2024-12-01", event: "AUAR update with technology park scenario adopted" },
            { date: "2024-10-24", event: "AUAR update released to EQB Monitor for comment" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR update with data center scenario adopted Dec 2024" },
            localZoning: { status: "denied", detail: "Rezoning request withdrawn; City Council denied the site plan, preliminary plat, and conditional use permit March 26, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City - March Development Update", url: "https://www.applevalleymn.gov/CivicAlerts.asp?AID=4155" },
            { name: "Data Center Dynamics - Project Denied", url: "https://www.datacenterdynamics.com/en/news/oppidan-data-center-outside-minneapolis-rejected/" },
            { name: "City - Data Center Moratorium", url: "https://www.applevalleymn.gov/CivicAlerts.aspx?AID=4237&ARC=6369" },
            { name: "City Project Page", url: "https://www.applevalleymn.gov/1024/Proposed-Technology-Center-Data-Center" },
            { name: "Hometown Source - AUAR Scenario", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/data-center-scenario-contemplated-in-apple-valley/article_9aa87462-961d-11ef-beb5-bbe0992cea55.html" },
            { name: "Hometown Source - CPA Denial", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/apple-valley-city-council-denies-land-use-change/article_d4a951aa-8087-4c8f-8df6-09f6b2db2432.html" },
            { name: "Hometown Source - Planning Commission Denial", url: "https://www.hometownsource.com/sun_thisweek/community/apple_valley/land-use-change-for-data-center-denied-in-apple-valley/article_d8ed4b90-5341-4544-87a1-08417f5b9d57.html" }
        ],
        lastUpdated: "2026-07-27"
    },
    {
        id: 11,
        name: "Farmington Technology Park (Tract)",
        status: "review_complete",
        city: "Farmington",
        county: "Dakota",
        lat: 44.6165,
        lng: -93.1540,
        acres: 347,
        sqft: 2530000,
        currentStatus: "Plaintiffs filed dismissals in both court cases Sept. 16, 2026, with final court directions pending. The City says it has not received an application for a specific development proposal within the Technology Park area.",
        notes: "The approved plans contemplate up to 12 data center buildings and 708 MW. Broader PUD and plat entitlements are in place, but a specific site plan and building-permit application would require future City review.",
        litigation: {
            active: false,
            caseNumber: "19HA-CV-24-5838; 19HA-CV-25-992",
            court: "Dakota County District Court",
            status: "Plaintiffs filed dismissals Sept. 16, 2026; final court directions pending",
            filedDate: "2024-11-29"
        },
        timeline: [
            { date: "2026-09-16", event: "Plaintiffs filed dismissals in both court cases; final court directions remain pending" },
            { date: "2026-04-20", event: "City Council approves final-plat split into two additions and updated development contracts" },
            { date: "2026-04-14", event: "Planning Commission recommends approval of final-plat split" },
            { date: "2025-11-13", event: "Dakota County judge denies city's motion to dismiss" },
            { date: "2025-05-14", event: "Metropolitan Council approves comprehensive plan amendment" },
            { date: "2025-01-14", event: "Castle Rock Township votes to file separate legal action" },
            { date: "2024-11-29", event: "Residents and Coalition file lawsuit/injunction" },
            { date: "2024-11-04", event: "AUAR adopted (Resolution 2024-97)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Adopted Nov 4, 2024" },
            localZoning: { status: "approved", detail: "PUD and final-plat entitlements approved; a specific site plan and building-permit application would require future City approval" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City of Farmington Project Page", url: "https://www.farmingtonmn.gov/473/Data-Center-Farmington-Technology-Park" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259881?siId=259881-PROJ0000000001" },
            { name: "GovTech - Lawsuit", url: "https://www.govtech.com/infrastructure/farmington-minn-residents-sue-to-stop-data-center-park" },
            { name: "Coalition Website", url: "https://www.datacenterresponsibility.com/whatishappening" },
            { name: "Streets.mn Deep Dive", url: "https://streets.mn/2025/11/07/deep-dive-the-farmington-push-for-responsible-hyper-scale-data-centers/" },
            { name: "Hometown Source - Motion to Dismiss Denied", url: "https://www.hometownsource.com/sun_thisweek/community/dakota_county/judge-denies-farmingtons-motion-to-dismiss-lawsuit/article_54651c1e-c9af-4516-9409-6eaf4c0c83a7.html" }
        ],
        lastUpdated: "2026-11-09"
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
            { date: "2026-04-21", event: "City adopts one-year data center moratorium while studying local regulations" },
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
            { name: "AUAR Order (PDF)", url: "https://www.rosemountmn.gov/DocumentCenter/View/7401/Dakota-East-Area-AUAR-Order" },
            { name: "Rosemount Data Center Moratorium Ordinance", url: "https://www.rosemountmn.gov/DocumentCenter/View/8294/Interim-Ordinance-Data-Centers?bidId=" }
        ],
        lastUpdated: "2026-06-04"
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
            { date: "2026-04-21", event: "City adopts one-year data center moratorium while studying local regulations" },
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
            { name: "EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/257490?siId=257490-PROJ0000000001" },
            { name: "Rosemount Data Center Moratorium Ordinance", url: "https://www.rosemountmn.gov/DocumentCenter/View/8294/Interim-Ordinance-Data-Centers?bidId=" }
        ],
        lastUpdated: "2026-06-04"
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
            { date: "2026-04-21", event: "City adopts one-year data center moratorium while studying local regulations" },
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
            { name: "Rosemount Data Center Moratorium Ordinance", url: "https://www.rosemountmn.gov/DocumentCenter/View/8294/Interim-Ordinance-Data-Centers?bidId=" }
        ],
        lastUpdated: "2026-06-04"
    },
    {
        id: 16,
        name: "Centra MSP1 / Thomson Reuters Redevelopment",
        status: "construction",
        city: "Eagan",
        county: "Dakota",
        lat: 44.8260,
        lng: -93.1143,
        acres: 179,
        sqft: 1350000,
        mw: 12,
        sqftDisplay: "1.2-1.5M SF",
        currentStatus: "Centra announced groundbreaking for MSP1, a 12 MW carrier-neutral data center at the former Thomson Reuters site in Eagan, in Aug 2025.",
        notes: "Scenario two in the Thomson Reuters AUAR includes light industrial that could include data centers. Centra's MSP1 reuses and upgrades an existing data center building at 610 Opperman Drive while Ryan Companies redevelops the broader former Thomson Reuters campus.",
        litigation: { active: false },
        timeline: [
            { date: "2025-08-06", event: "Centra announces groundbreaking for 12 MW MSP1 facility" },
            { date: "2024-10-29", event: "Final AUAR adopted (Resolution 24-50)" },
            { date: "2024-10-08", event: "Final AUAR published in EQB Monitor" },
            { date: "2024-08-26", event: "Public open house held" },
            { date: "2024-08-13", event: "Draft AUAR published in EQB Monitor" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Final AUAR adopted Oct 29, 2024" },
            localZoning: { status: "unknown" },
            buildingPermit: { status: "in_progress", detail: "Groundbreaking announced Aug 2025 for MSP1" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Data Center Dynamics - Centra MSP1 Groundbreaking", url: "https://www.datacenterdynamics.com/en/news/centra-breaks-ground-on-data-center-redevelopment-in-minneapolis-minnesota/" },
            { name: "Resolution 24-50 (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Resolution_24-50_Adopting-Thomson-Reuters-AUAR.pdf" },
            { name: "Revised AUAR (PDF)", url: "https://raw.githubusercontent.com/speakingtrumpetskier-prog/mn-data-center-tracker/main/docs/Thomson-Reuters-Revised-AUAR.pdf" },
            { name: "City Environmental Reviews", url: "https://cityofeagan.com/environmental-reviews" },
            { name: "Project EQB Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/259709?siId=259709-PROJ0000000001" }
        ],
        lastUpdated: "2026-06-04"
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
        currentStatus: "The AUAR was adopted in 2023. City Council approved Ordinance 1098 on Oct. 20, 2026, reducing the recreation-facility setback from 3,950 feet to 200 feet; the ordinance is scheduled to take effect Nov. 27. No specific data center developer has been announced.",
        notes: "The City of Northfield and Xcel Energy completed an AUAR for the 530-acre Northwest Area Business Park. Approximately 265 acres are identified for potential data center development.",
        litigation: { active: false },
        timeline: [
            { date: "2026-10-20", event: "City Council approved Ordinance 1098, reducing the recreation-facility setback from 3,950 feet to 200 feet" },
            { date: "2026-10-06", event: "City Council completed the first reading of the setback amendment" },
            { date: "2024-12-10", event: "City Council approved zoning allowing data centers in Northwest Industrial Area; highest efficiency standards in MN adopted" },
            { date: "2023", event: "Xcel Energy/City of Northfield AUAR adopted (30-day public comment period; 18 responses)" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "Xcel Energy/City of Northfield AUAR adopted 2023 (EQB Project 255525)" },
            localZoning: { status: "approved", detail: "Data centers permitted in the Northwest Industrial Area; Ordinance 1098 reduces the recreation-facility setback to 200 feet effective Nov. 27, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Northfield City Council - Ordinance 1098", url: "https://northfield.legistar.com/LegislationDetail.aspx?FullText=1&GUID=E0926389-FC89-4C08-B89C-7B8C7EF23827&ID=8287617&Options=&Search=" },
            { name: "EQB Project Page", url: "https://webapp.pca.state.mn.us/eqb-search/project-detail/255525?siId=255525-PROJ0000000001" },
            { name: "City Northwest Business Park Page", url: "https://www.northfieldmn.gov/1578/Xcel-Energy-City-of-Northfield-Alternati" },
            { name: "KYMN - City Allows Data Centers (Dec 2024)", url: "https://kymnradio.net/2024/12/10/city-allows-data-centers-in-the-northwest-industrial-area-highest-efficency-standards-in-mn-implemented/" },
            { name: "KYMN - Northfield an Outlier (Apr 2026)", url: "https://kymnradio.net/2026/04/08/northfield-an-outlier-and-potential-model-in-minnesotas-data-center-debacle/" }
        ],
        lastUpdated: "2026-11-09"
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
        currentStatus: "No specific development has been confirmed. The Planning Commission advanced a sixth draft of the data center ordinance Oct. 28, with City Council consideration scheduled for Nov. 10.",
        notes: "MiEnergy Cooperative and Dairyland Power Cooperative asked the City to initiate annexation and industrial rezoning for land near Harmony. MiEnergy holds an option to purchase approximately 60 acres, but no data center developer or project application has been confirmed. No AUAR or EAW has been filed.",
        litigation: { active: false },
        timeline: [
            { date: "2026-11-10", event: "City Council consideration of the draft data center ordinance scheduled" },
            { date: "2026-10-28", event: "Planning Commission advanced a sixth draft of the data center ordinance" },
            { date: "2026-08-26", event: "City leaders reviewed public feedback and returned the draft data center ordinance to counsel for revisions" },
            { date: "2026-08-19", event: "Public comment period on the draft data center ordinance closed" },
            { date: "2026-08-05", event: "City Council, Planning and Zoning Commission, and EDA reviewed a draft data center ordinance" },
            { date: "2025-10-14", event: "City voted to annex land" },
            { date: "2025-10-07", event: "Community members raise concerns at meeting" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "in_progress", detail: "Planning Commission advanced the sixth draft Oct. 28; City Council consideration is scheduled for Nov. 10, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "KTTC - Draft Data Center Ordinance", url: "https://www.kttc.com/2026/10/29/harmony-planning-commission-approves-draft-data-center-ordinance/?outputType=amp" },
            { name: "Harmony Economic Development Authority Project Page", url: "https://harmonymn.gov/eda/ongoing-projects/harmony-eda-project-data-center/" },
            { name: "Harmony Meetings and Reports", url: "https://harmonymn.gov/eda/meetings-reports/" },
            { name: "KTTC - August 26 Feedback Review", url: "https://www.kttc.com/2026/08/27/harmony-city-leaders-face-flood-feedback-over-proposed-data-center/" },
            { name: "Fillmore County Journal - Draft Ordinance", url: "https://fillmorecountyjournal.com/harmony-considers-data-center-ordinance/" },
            { name: "Root River Current", url: "https://rootrivercurrent.org/harmony-minnesota-annexs-land-for-possible-data-center/" },
            { name: "Fillmore County Journal", url: "https://fillmorecountyjournal.com/concerns-raised-over-proposed-data-center/" }
        ],
        lastUpdated: "2026-11-09"
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
        status: "construction",
        city: "Glencoe",
        county: "McLeod",
        lat: 44.7650,
        lng: -94.1400,
        acres: 6.25,
        sqft: 94100,
        mw: 40,
        currentStatus: "Construction is underway at 670 11th Street West for three data center buildings totaling approximately 94,100 square feet. Revolve Labs' September presentation listed an April 2027 target for completion.",
        notes: "Revolve Labs is developing an AI and high-performance-computing campus on former Seneca Foods land on the west side of Glencoe.",
        litigation: { active: false },
        timeline: [
            { date: "2026-11-05", event: "Local reporting confirmed construction underway" },
            { date: "2026-09-08", event: "Revolve Labs presented plans for three buildings and an April 2027 completion target" },
            { date: "2025-03-27", event: "Star Tribune reports Revolve Labs focusing on Glencoe expansion" },
            { date: "2024-11-06", event: "City approved rezoning of 6.2-acre site" },
            { date: "2024-09-27", event: "Economic Development Authority reviewed concept plans" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "approved", detail: "Rezoning approved Nov 6, 2024" },
            buildingPermit: { status: "approved", detail: "Construction underway at 670 11th Street West" },
            utilities: { status: "in_progress", detail: "MISO materials identify a 40 MW West Glencoe load and related substation work" }
        },
        sources: [
            { name: "Revolve Labs - Glencoe Community Presentation", url: "https://www.revolvelabs.ai/assets/images/community/glencoe/glencoe-community-presentation-2026-09-08.pdf" },
            { name: "MISO - West Glencoe Load", url: "https://cdn.misoenergy.org/20251202%20EPR-TSTF%20Item%2002%20EPR%20Results%20and%20MISO%20Recommendation729010.pdf" },
            { name: "Blandin on Broadband - Glencoe Construction", url: "https://blandinonbroadband.org/2026/11/06/city-leaders-and-citizens-chime-in-on-new-ai-data-center-coming-to-glencoe-mcleod-county/" },
            { name: "Glencoe News - New Data Center Announced", url: "https://www.glencoenews.com/articles/featured-mcc/revolve-labs-announces-new-high-performance-data-center-in-glencoe/" },
            { name: "Glencoe News - EDA Concept Review", url: "https://www.glencoenews.com/articles/featured-mcc/glencoe-eda-reviews-concept-plans-for-50-60-million-ai-data-center/" },
            { name: "Glencoe News - Rezoning Approval", url: "https://www.glencoenews.com/articles/featured-mcc/glencoe-approves-rezoning-request-for-site-of-revolve-labs-planned-ai-data-center/" },
            { name: "Star Tribune - Glencoe Expansion", url: "https://www.startribune.com/company-wont-build-ai-data-center-in-rural-town-eyes-glencoe-expansion/601246170" },
            { name: "City Council Minutes - Rezoning Approval", url: "https://www.glencoemn.org/wp-content/uploads/2025/01/11.6.24-Minutes.pdf" },
            { name: "Revolve Labs - Company Site", url: "https://www.revolvelabs.ai/" }
        ],
        lastUpdated: "2026-11-09"
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
        secondaryStatus: "review_complete",
        city: "Becker",
        county: "Sherburne",
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
            { date: "2024-02", event: "Microsoft closes on 295 acres from Xcel for $17.7M" },
            { date: "2023-01", event: "Xcel Energy/City of Becker AUAR adopted, covering broader site area" },
            { date: "2022-12", event: "Google backs out of previous Becker data center plans" }
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
    },

    // ============================================
    // WATCHING - Early stage / no formal filings
    // ============================================
    {
        id: 27,
        name: "CloudHQ MSP Campus",
        status: "review_complete",
        city: "Chaska",
        county: "Carver",
        lat: 44.8172,
        lng: -93.6364,
        acres: 72,
        sqft: 1100000,
        sqftDisplay: "1.1M SF developer-listed; city describes approximately 1.5M SF",
        mw: 200,
        currentStatus: "Preliminary site plan/plat approved in Oct 2024. Final site plan/plat application has not been submitted, and there is no final-review timeline.",
        notes: "West Creek Corporate Center. CUP Oct 2023; preliminary site plan/plat approved Oct 2024. CloudHQ lists up to 200 MW critical IT load. City materials describe approximately 1.5 million square feet and state the project cannot move forward until the preliminary system impact study is complete.",
        litigation: { active: false },
        timeline: [
            { date: "2022-08", event: "Concept approval by City of Chaska" },
            { date: "2022", event: "AUAR and mitigation plan completed" },
            { date: "2023-10", event: "Conditional use permit granted" },
            { date: "2024-10", event: "Preliminary site plan and plat approved 4-1 by council" },
            { date: "2025-04-15", event: "Daily Reporter: final approval and substation process still pending; no anchor tenant confirmed" },
            { date: "2026", event: "City project page states no final application has been submitted and utility system impact study remains underway" }
        ],
        permits: {
            environmentalReview: { status: "review_complete", type: "AUAR", detail: "AUAR and mitigation plan completed 2022" },
            localZoning: { status: "in_progress", detail: "CUP Oct 2023; preliminary site plan/plat Oct 2024; final site plan/plat application not submitted" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Preliminary system impact study underway; project cannot move forward until study is complete" }
        },
        sources: [
            { name: "City of Chaska project page", url: "https://www.chaskamn.gov/841/Cloud-HQ" },
            { name: "Carver County Local News - preliminary approval Oct 2024", url: "https://cclocalnews.org/2024/10/29/despite-resident-objections-data-center-gains-preliminary-ok/" },
            { name: "Star Tribune - $1B project announced", url: "https://www.startribune.com/1-billion-1-4-million-square-foot-data-center-planned-for-chaska/600201478" },
            { name: "Daily Reporter - status spring 2025", url: "https://dailyreporter.com/2025/04/15/chaska-data-center-housing-business-park-growth/" },
            { name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/news/cloudhq-planning-180mw-data-center-campus-in-minneapolis-minnesota/" },
            { name: "CloudHQ MSP Campus page", url: "https://cloudhq.com/campus/msp-campus/" }
        ],
        lastUpdated: "2026-06-04"
    },
    {
        id: 30,
        name: "Legacy / Star Tribune Heritage Data Center",
        status: "suspended",
        city: "Minneapolis",
        county: "Hennepin",
        lat: 44.9910,
        lng: -93.2810,
        acres: 13,
        sqft: 396559,
        mw: 20,
        currentStatus: "Legacy Investing withdrew its land-use application and terminated its purchase agreement for the former Star Tribune Heritage printing plant on Sept. 11, 2026. The city says no additional applications have been received for the site.",
        notes: "Legacy had proposed a 20 MW data center with additional mixed uses on the roughly 13-acre former printing-plant property at 800 N. 1st St. The proposal ended when the application and purchase agreement were withdrawn. Coordinates mark the approximate site location.",
        litigation: { active: false },
        timeline: [
            { date: "2026-09-11", event: "Legacy withdrew its land-use application and terminated the Heritage plant purchase agreement; the city reported no replacement application" },
            { date: "2026-08-21", event: "City's updated data center page listed preliminary zoning recommendations and an open public-comment process" },
            { date: "2026-08-19", event: "Legacy presented its data center and mixed-use concept to the North Loop Neighborhood Association Planning and Zoning Committee" },
            { date: "2026-07-29", event: "Star Tribune reported that Legacy Investing signed a purchase agreement for the Heritage printing plant and plans a mixed-use redevelopment centered on a data center" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "withdrawn", detail: "Legacy withdrew the land-use application Sept. 11, 2026; no conditional use permit or site plan was approved" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "MPR News - Legacy Withdraws Proposal", url: "https://www.mprnews.org/story/2026/09/11/developer-legacy-investing-withdraws-proposed-star-tribune-data-center" },
            { name: "Minnesota Star Tribune - Application and Purchase Agreement Withdrawn", url: "https://www.startribune.com/data-center-developer-legacy-investing-star-tribune-printing-plant-deal-backing-out/601888372" },
            { name: "City of Minneapolis - Data Center Zoning", url: "https://www.minneapolismn.gov/business-services/planning-zoning/amendments/proposed-adopted/data-centers/" },
            { name: "North Loop Neighborhood Association - Legacy Project Update", url: "https://northloop.org/heres-what-the-potential-data-center-developer-is-telling-us/" },
            { name: "Minnesota Star Tribune - Legacy Purchase Agreement", url: "https://www.startribune.com/data-center-developer-signs-deal-to-buy-minnesota-star-tribunes-shuttered-north-loop-printing-plant/601872895" },
            { name: "Heritage Building Property Listing", url: "https://warehousespaces.com/warehouse-for-rent/United-States/MN/Minneapolis/800-North-1st-Street-Minneapolis-MN-55401/" }
        ],
        lastUpdated: "2026-09-14"
    },
    {
        id: 24,
        name: "Cielo Chisago",
        status: "suspended",
        city: "Chisago City",
        county: "Chisago",
        lat: 45.3990,
        lng: -92.9225,
        acres: 157,
        sqft: null,
        mw: 300,
        currentStatus: "The prospective data center company withdrew its land purchase agreement after learning Xcel Energy could not provide the required service capacity for at least a couple of years. City staff reported no active data center inquiries on March 24, 2026.",
        notes: "The prospective project was previously reported as a 157-acre, 300 MW Cielo Digital Infrastructure site. Chisago City had discussed environmental-review requirements with the company, but no planning application or EQB notice was filed before the purchase agreement was withdrawn. Location approximate.",
        litigation: { active: false },
        timeline: [
            { date: "2026-03-24", event: "City staff disclosed that the prospective data center company withdrew its purchase agreement because required Xcel Energy capacity would not be available for at least a couple of years" },
            { date: "2025", event: "Cielo lists Chisago as active project on company properties page (157 ac, 300 MW)" }
        ],
        permits: {
            environmentalReview: { status: "not_started", detail: "No EAW, AUAR, or EIS filing found in MN public record" },
            localZoning: { status: "withdrawn", detail: "Prospective developer withdrew its land purchase agreement before filing a public planning application" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unavailable", detail: "City staff said Xcel Energy could not provide the required service capacity for at least a couple of years" }
        },
        sources: [
            { name: "Chisago City Council Minutes - March 24, 2026", url: "https://www.ci.chisago.mn.us/vertical/sites/%7B4CF416A7-935D-4E3F-82DF-F3E06B5985B0%7D/uploads/CC_MINUTES_03.24.26.pdf" },
            { name: "Cleanview - Cielo Chisago", url: "https://cleanview.co/public/data-centers/minnesota/2043/cielo-chisago-data-center" },
            { name: "Data Center Dynamics - Cielo national pipeline", url: "https://www.datacenterdynamics.com/en/news/cielo-digital-infrastructure-plans-300mw-data-center-campus-in-south-carolina/" }
        ],
        lastUpdated: "2026-08-03"
    },
    {
        id: 25,
        name: "Nobles County Powered Data Park",
        status: "suspended",
        city: "Reading",
        county: "Nobles",
        lat: 43.703,
        lng: -95.690,
        acres: 640,
        sqft: null,
        mw: 450,
        currentStatus: "Nobles County and Geronimo Power ended the current AUAR study on May 20, 2026, after the county rejected the needed zoning text amendment on April 21. The current site path is paused.",
        notes: "Geronimo Power proposes a 400-450 MW data center on 640 acres (Section 19, Elk Township) northeast of Reading, about 6 miles NW of Worthington. Purchase agreement signed with landowners; no end user committed and no land purchased yet. Estimated $4 billion in capital investment. Developer plans to sell finished site to a hyperscaler (e.g., Google, Microsoft, Amazon) and tie power to the planned Summit Lake Solar and Storage project. On Apr 21, 2026, Nobles County Board voted against adding data centers as a conditional use in agricultural preservation areas, leaving the current site path uncertain. Coordinates approximate (placed near Reading).",
        litigation: { active: false },
        timeline: [
            { date: "2026-05-20", event: "Nobles County Board acknowledged a mutual termination agreement ending the current AUAR study" },
            { date: "2026-04-21", event: "Nobles County Board voted against zoning text amendment that would allow data centers as conditional use in agricultural preservation areas" },
            { date: "2026-04-16", event: "AUAR public comment period closed" },
            { date: "2025", event: "Geronimo Power proposes 400-450 MW data center on farmland near Reading; signs purchase agreement with landowners" },
            { date: "2026-02", event: "Nobles County commissioners vote 4-1 to send AUAR draft order and scoping document to MN EQB" },
            { date: "2026-03", event: "Planning Commission votes against allowing data center as conditional use in ag preservation zone" }
        ],
        permits: {
            environmentalReview: { status: "withdrawn", detail: "Current AUAR study ended by mutual termination agreement acknowledged May 20, 2026" },
            localZoning: { status: "contested", detail: "Planning Commission and County Board voted against allowing data centers as conditional use in agricultural preservation areas" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Feasibility study underway with Lincoln Pipestone Rural Water" }
        },
        sources: [
            { name: "Geronimo Power - Nobles County Powered Data Park", url: "https://geronimopower.com/in-development/nobles-county-powered-data-park/" },
            { name: "Nobles County - Data Center Information", url: "https://www.co.nobles.mn.us/data-center-information/" },
            { name: "Nobles County - Board Agendas & Minutes", url: "https://www.co.nobles.mn.us/commissioners/board-agendas-minutes/" },
            { name: "MPR - Nobles County Board Vote", url: "https://www.mprnews.org/story/2026/04/21/nobles-county-board-to-vote-on-whether-to-allow-massive-data-centers-on-farm-land" },
            { name: "Data Center Dynamics - County Vote", url: "https://www.datacenterdynamics.com/en/news/4bn-data-center-rejected-by-nobles-county-minnesota/" },
            { name: "Star Tribune - $4 billion data center in farm country", url: "https://www.startribune.com/in-minnesota-farm-country-a-plan-for-a-4-billion-data-center-takes-root-with-vast-wind-solar-and-battery-projects/601512205" },
            { name: "The Globe - AUAR Ended", url: "https://www.dglobe.com/news/local/nobles-county-commissioners-end-auar-study-for-data-center" },
            { name: "The Globe - Planning Commission vote", url: "https://www.dglobe.com/news/local/full-story-nobles-county-planning-commission-votes-to-keep-data-center-out-of-ag-preservation-area" },
            { name: "The Globe - AUAR begins", url: "https://www.dglobe.com/news/local/nobles-county-data-center-begins-environmental-review-process" }
        ],
        lastUpdated: "2026-06-15"
    },
    {
        id: 28,
        name: "Inver Grove Heights Travel Tags Data Center",
        status: "in_litigation",
        city: "Inver Grove Heights",
        county: "Dakota",
        lat: 44.8629567,
        lng: -93.0398372,
        acres: 13.9,
        sqft: 54070,
        sqftDisplay: "54,000-55,000 SF",
        mw: 5,
        currentStatus: "The city denied the EAW petition July 27 after finding the project exempt from mandatory environmental review. Council excluded the application from the data center moratorium Sept. 14 and approved the major site plan Sept. 28. A development contract and building permit are still required. The developer lawsuit remains active pending dismissal under the proposed settlement.",
        notes: "QLevr proposes a 54,070-square-foot, 5 MW data center on the 13.9-acre former Travel Tags property at 5890 Carmen Avenue. Council completed adoption of an ordinance removing the application from the city's one-year data center moratorium Sept. 14 and approved the major site plan Sept. 28. An approved development contract and building permit are still required before construction.",
        litigation: {
            active: true,
            caseNumber: "19HA-CV-26-4605",
            court: "Dakota County District Court",
            status: "Major site plan approved Sept. 28; proposed settlement calls for dismissal, with court dismissal still pending"
        },
        timeline: [
            { date: "2026-09-28", event: "City Council approved the major site plan and began the citywide data center moratorium study" },
            { date: "2026-09-14", event: "City Council approved the third and final reading of the ordinance excluding the application from the moratorium" },
            { date: "2026-08-24", event: "City Council approved 4-1 the second reading of the settlement ordinance excluding the application from the moratorium" },
            { date: "2026-08-10", event: "City Council gave first reading to an ordinance excluding the application from the moratorium as part of a proposed lawsuit settlement" },
            { date: "2026-07-27", event: "City Council denied the EAW petition after finding the project exempt from mandatory environmental review" },
            { date: "2026-06-26", event: "City Council approved a one-year moratorium covering the proposed data center" },
            { date: "2026-06-25", event: "Residents filed an EAW petition for the proposed data center" },
            { date: "2026-05-26", event: "City Council tables moratorium second reading to June 8 and site plan request to a meeting before July 1" },
            { date: "2026-05-11", event: "City Council approves interim ordinance studying data centers and imposing moratorium including proposed data center" },
            { date: "2026-04-27", event: "Major site plan request presented to City Council" },
            { date: "2026-04-07", event: "Planning Commission public hearing held" },
            { date: "2026-03-26", event: "Developer hosts neighborhood meeting" }
        ],
        permits: {
            environmentalReview: { status: "exempt", type: "EAW", detail: "City Council denied the EAW petition July 27, 2026 after finding the project exempt from mandatory environmental review" },
            localZoning: { status: "approved", detail: "Council excluded the application from the moratorium Sept. 14 and approved the major site plan Sept. 28; a development contract and building permit are still required" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City of Inver Grove Heights - Proposed Data Center Development", url: "https://www.ighmn.gov/CivicAlerts.aspx?AID=2896" },
            { name: "July 27, 2026 City Council Record", url: "https://ighmn.portal.civicclerk.com/event/2165/overview" },
            { name: "August 10, 2026 City Council Record", url: "https://ighmn.portal.civicclerk.com/event/2154/overview" },
            { name: "August 24, 2026 City Council Record", url: "https://ighmn.portal.civicclerk.com/event/2166/overview" },
            { name: "September 28, 2026 City Council Record", url: "https://ighmn.portal.civicclerk.com/event/2167/overview" },
            { name: "August 10 Litigation and Ordinance Report", url: "https://ighmn.portal.civicclerk.com/event/2154/files/report/8403" },
            { name: "KSTP - Data Center Lawsuit and Settlement Path", url: "https://kstp.com/tracking-your-tax-dollars/data-center-lawsuit-could-cost-inver-grove-heights-taxpayers-millions-path-to-avoid-it-moves-forward/" },
            { name: "June 26, 2026 Item 7D Moratorium Packet (PDF)", url: "https://www.ighmn.gov/DocumentCenter/View/20108/June-26---Item-7D---Third-Reading-of-an-Interim-Ordinance-Authoring-Study-of-Data-Centers" },
            { name: "May 11, 2026 City Council Actions", url: "https://www.ighmn.gov/DocumentCenter/View/20014/2026-05-11-City-Council-Actions" },
            { name: "May 26, 2026 City Council Actions", url: "https://www.ighmn.gov/DocumentCenter/View/20051/2026-05-26-Council-Actions?bidId=" },
            { name: "Data Center Dynamics - Inver Grove Heights Moratorium", url: "https://www.datacenterdynamics.com/en/news/one-year-data-center-moratorium-approved-in-city-near-minneapolis/" }
        ],
        lastUpdated: "2026-10-02"
    },
    {
        id: 29,
        name: "Elk River Industrial Blvd Data Center",
        status: "suspended",
        city: "Elk River",
        county: "Sherburne",
        lat: 45.3186,
        lng: -93.5863,
        acres: 3.223,
        sqft: 58000,
        currentStatus: "The applicant withdrew both the ordinance amendment and CUP applications July 10 after City Council rejected the zoning text amendment. On Aug. 3, the council adopted a one-year moratorium on data center land-use approvals. No approval for a data center at 19178 Industrial Blvd NW is pending.",
        notes: "Applicant Michael Margulies, representing Elk River Capital LLC (Swervo Development), proposed repurposing part of an existing industrial building into a 58,000-square-foot data center. The applications were withdrawn July 10, 2026, and the city subsequently adopted a one-year data center moratorium.",
        litigation: { active: false },
        timeline: [
            { date: "2026-08-03", event: "City Council adopted Ordinance 26-17, establishing a one-year moratorium on data center land-use approvals" },
            { date: "2026-07-10", event: "Applicant withdrew ordinance amendment and conditional use permit applications" },
            { date: "2026-07-06", event: "City Council rejected the ordinance amendment that would have allowed a data center; conditional use permit remained pending at that point" },
            { date: "2026-06-15", event: "City Council public hearing opened and was continued to July 6, 2026" },
            { date: "2026-05-26", event: "Planning Commission held initial public hearing on ordinance amendment and CUP applications" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "withdrawn", detail: "Applications withdrawn July 10 after the ordinance amendment was rejected; Ordinance 26-17 established a one-year moratorium on data center land-use approvals Aug. 3, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Elk River Data Center - Timeline", url: "https://elkriverdatacenter.com/timeline/" },
            { name: "City Council Meeting - July 6, 2026", url: "https://elkriver.viebit.com/watch?hash=wyb78XEL9d2ntnS5" },
            { name: "August 3, 2026 City Council Record", url: "https://elkrivermn.portal.civicclerk.com/event/613/overview" },
            { name: "MPR - Elk River Rejects Data Center Ordinance Change", url: "https://www.mprnews.org/story/2026/07/07/elk-river-rejects-changing-rules-to-allow-data-centers" },
            { name: "City of Elk River - Public Hearings", url: "https://www.elkrivermn.gov/1678/Public-Hearings" },
            { name: "Notice of Public Hearing (PDF)", url: "https://www.elkrivermn.gov/DocumentCenter/View/19540/Notice-of-Public-Hearing-Conditional-Use-Permit-and-Ordinance-Amendment-for-Michael-Margulies---data-center" }
        ],
        lastUpdated: "2026-09-07"
    },
    {
        id: 31,
        name: "AAIM Minnesota 1 Energy Park",
        status: "operational",
        city: "Blue Earth",
        county: "Faribault",
        lat: 43.6350,
        lng: -94.0980,
        acres: null,
        sqft: 10000,
        sqftDisplay: "Nearly 10,000 SF",
        mw: 15,
        currentStatus: "The 15 MW facility has been operating since June 2025. AAIM announced an 80 MW expansion in design with a target of the third quarter of 2027; the expansion is not operational.",
        notes: "AAIM's first Minnesota Energy Park is located along Highway 169 near a Blue Earth Light and Water substation.",
        litigation: { active: false },
        timeline: [
            { date: "2026-08-15", event: "AAIM announced an 80 MW expansion in design with a third-quarter 2027 target" },
            { date: "2025-06", event: "15 MW Minnesota 1 facility opened" }
        ],
        permits: {
            environmentalReview: { status: "unknown" },
            localZoning: { status: "approved" },
            buildingPermit: { status: "approved" },
            utilities: { status: "approved", detail: "15 MW facility operating; announced 80 MW expansion remains in design" }
        },
        sources: [
            { name: "AAIM - Minnesota 1 Energy Park", url: "https://www.aaimdc.com/data-centers/minnesota-1/" },
            { name: "AAIM - Minnesota 1 Opening", url: "https://www.aaimdc.com/news/aaim-celebrates-the-opening-of-a-15-mw-data-center-in-blue-earth-minnesota/" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 32,
        name: "AAIM Minnesota 2 Energy Park",
        status: "watching",
        city: "Hutchinson",
        county: "McLeod",
        lat: 44.8870,
        lng: -94.3520,
        acres: 1.946,
        sqft: 7500,
        mw: 20,
        currentStatus: "The City approved a conditional use permit and final permits Aug. 26, 2025, and a power-purchase agreement was signed Sept. 24, 2025. AAIM describes the project as in development, but a construction start has not been confirmed.",
        notes: "The proposed air-cooled facility is at 1025 Fifth Avenue SE. Expansion beyond 7,500 square feet, up to 15,000 square feet, would require a new conditional use permit.",
        litigation: { active: false },
        timeline: [
            { date: "2025-09-24", event: "Power-purchase agreement signed" },
            { date: "2025-08-26", event: "City approved the conditional use permit and final permits" }
        ],
        permits: {
            environmentalReview: { status: "not_started", detail: "City materials do not identify a separate environmental review" },
            localZoning: { status: "approved", detail: "Conditional use permit and final permits approved Aug. 26, 2025" },
            buildingPermit: { status: "unknown", detail: "Construction start not confirmed" },
            utilities: { status: "approved", detail: "Power-purchase agreement signed Sept. 24, 2025" }
        },
        sources: [
            { name: "City of Hutchinson - Data Center Q&A", url: "https://hutchinsonmn.gov/wp-content/uploads/2026/06/Data-Center-Document-Q-A.pdf" },
            { name: "AAIM - Minnesota 2 Energy Park", url: "https://www.aaimdc.com/data-centers/minnesota-2/" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 33,
        name: "AAIM Minnesota 3 Energy Park",
        status: "watching",
        city: "Mountain Lake",
        county: "Cottonwood",
        lat: 43.9420,
        lng: -94.9150,
        acres: null,
        sqft: 12000,
        mw: 10,
        currentStatus: "The City Council approved a conditional use permit Nov. 17, 2025, for a data center at 2203 Third Avenue. A construction start has not been confirmed.",
        notes: "City records identify C-MN, LLC as the applicant, and local reporting identifies AAIM as the project operator. The approved concept is up to 12,000 square feet and 10 MW.",
        litigation: { active: false },
        timeline: [
            { date: "2026-07", event: "City Council received public comments about the project; no new project action was taken" },
            { date: "2025-11-17", event: "City Council approved the conditional use permit" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "approved", detail: "Conditional use permit approved Nov. 17, 2025" },
            buildingPermit: { status: "unknown", detail: "Construction start not confirmed" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Mountain Lake City Council Minutes - Nov. 17, 2025", url: "https://mountainlakemn.com/wp-content/uploads/11-17-25-City-Council-Minutes.pdf" },
            { name: "KEYC - Mountain Lake Public Comments", url: "https://www.keyc.com/2026/07/16/community-raises-concern-about-public-notice-data-center-mountain-lake/?outputType=amp" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 34,
        name: "Nodiac Albertville Modular Data Center",
        status: "watching",
        city: "Albertville",
        county: "Wright",
        lat: 45.2350,
        lng: -93.6640,
        acres: 3.66,
        sqft: null,
        mw: 20,
        currentStatus: "City Council reviewed the concept Sept. 8, 2026, without taking formal action. A data center is not currently permitted at the site without a code amendment or planned unit development approval.",
        notes: "Nodiac's concept places two modular buildings with 20 modules near 70th Street NE and Karment Avenue NE, adjacent to a substation. The concept does not include municipal water or sewer service.",
        litigation: { active: false },
        timeline: [
            { date: "2026-09-08", event: "City Council reviewed the modular data center concept without taking formal action" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "in_progress", detail: "Concept review only; a code amendment or planned unit development approval would be required" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Nodiac - Oakwood", url: "https://www.nodiac.ai/oakwood" },
            { name: "Blandin on Broadband - Albertville Concept Review", url: "https://blandinonbroadband.org/2026/09/15/albertville-city-council-reviews-data-center-concept-in-sep-8-meeting-wright-county/" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 35,
        name: "Shakopee Dean Lakes Data Center",
        status: "construction",
        city: "Shakopee",
        county: "Scott",
        lat: 44.7810,
        lng: -93.4600,
        acres: null,
        sqft: 136092,
        mw: 25,
        currentStatus: "Swervo is converting the existing industrial building at 5201 Dean Lakes Boulevard into a data center. Construction is underway on an initial 25 MW build-out; another 25 MW phase is planned for 2027-28.",
        notes: "The project reuses a 136,092-square-foot industrial building. The map marker is address-derived and approximate.",
        litigation: { active: false },
        timeline: [
            { date: "2026-11-04", event: "City Council received an informational data center update" },
            { date: "2026-07-24", event: "City published project information for the Dean Lakes conversion" },
            { date: "2026-05", event: "Property sale for the conversion project completed" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "approved", detail: "Conversion is proceeding within an existing industrial building" },
            buildingPermit: { status: "in_progress", detail: "Construction underway" },
            utilities: { status: "in_progress", detail: "Initial 25 MW build-out underway; a second 25 MW phase is planned" }
        },
        sources: [
            { name: "City of Shakopee - Data Center Projects", url: "https://shakopeemn.gov/news_detail_T18_R96.php" },
            { name: "Prior Lake Events - Shakopee Data Centers", url: "https://priorlakeevents.com/news/two-more-data-centers-are-going-up-in-shakopee-neither-of-them-hyper-scale/" }
        ],
        lastUpdated: "2026-11-09"
    },
    {
        id: 36,
        name: "Shakopee Emery Way Data Center",
        status: "construction",
        city: "Shakopee",
        county: "Scott",
        lat: 44.7890,
        lng: -93.4340,
        acres: null,
        sqft: 148800,
        mw: 20,
        currentStatus: "An existing industrial building at 3000 Emery Way is being converted into a 20 MW data center. Construction is underway.",
        notes: "The project reuses a 148,800-square-foot industrial building. The map marker is address-derived and approximate.",
        litigation: { active: false },
        timeline: [
            { date: "2026-11-04", event: "City Council received an informational data center update" },
            { date: "2026-11-02", event: "Shakopee Public Utilities reviewed the data center conversion" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "approved", detail: "Conversion is proceeding within an existing industrial building" },
            buildingPermit: { status: "in_progress", detail: "Construction underway" },
            utilities: { status: "in_progress", detail: "20 MW service build-out underway" }
        },
        sources: [
            { name: "Shakopee Public Utilities - Nov. 2, 2026 Packet", url: "https://shakopeeutilities.com/wp-content/uploads/2026/10/Commission-Packet-11-02-26.pdf" },
            { name: "Prior Lake Events - Shakopee Data Centers", url: "https://priorlakeevents.com/news/two-more-data-centers-are-going-up-in-shakopee-neither-of-them-hyper-scale/" }
        ],
        lastUpdated: "2026-11-09"
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
