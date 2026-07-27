// Minnesota Data Center Tracker - Project Data
// Last updated: July 27, 2026
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
        secondaryStatus: "in_litigation",
        city: "Faribault",
        county: "Rice",
        lat: 44.3671,
        lng: -93.2845,
        acres: 84.3,
        sqft: 500000,
        currentStatus: "Minnesota Court of Appeals reversed the city's negative declaration on June 8, 2026, and remanded the project for further environmental review. The City Council formally gave Archer through March 31, 2027, to prepare a supplemental EAW.",
        notes: "EAW completed with negative declaration (EIS not required). MCEA appeal argues environmental review vastly underreported facility's impact on climate change and Minnesota's electricity grid. Site at 15339 Acorn Trail, south of 150th St W in Northern Industrial Park. Oral argument completed May 2026.",
        litigation: {
            active: true,
            caseNumber: "A25-1617",
            court: "MN Court of Appeals",
            status: "Court of Appeals reversed negative declaration and remanded project for further environmental review",
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
        lastUpdated: "2026-07-27"
    },
    {
        id: 2,
        name: "Hermantown Data Center",
        status: "in_review",
        secondaryStatus: "in_litigation",
        tertiaryStatus: "review_complete",
        city: "Hermantown",
        county: "St. Louis",
        lat: 46.7730,
        lng: -92.2950,
        acres: 278,
        sqft: 1800000,
        currentStatus: "Google-backed data center campus remains in updated AUAR review. The draft AUAR and mitigation plan comment period closed July 16, 2026. A separate resident lawsuit remains active while the MCEA case stays on hold during the updated AUAR.",
        notes: "Google confirmed as company behind proposed Hermantown data center in March 2026. City and Google agreed to update the AUAR with greater specificity; updated study area covers 26 parcels totaling approximately 278 acres in southwest Hermantown, smaller than the initial AUAR adopted Oct 6, 2025. Scoping comment period opened Mar 31 and closed Apr 30, 2026. Proposed project would require at least 700 MW of new energy resources.",
        litigation: {
            active: true,
            caseNumber: "69DU-CV-25-3448",
            court: "St. Louis County District Court",
            status: "MCEA lawsuit on hold while updated AUAR proceeds; separate resident lawsuit filed Apr 29, 2026",
            filedDate: "2025-11-05"
        },
        timeline: [
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
            environmentalReview: { status: "in_progress", type: "AUAR", detail: "Initial AUAR adopted Oct 6, 2025; updated Google-specific draft AUAR and mitigation plan posted June 11, 2026; comment period closed July 16, 2026" },
            localZoning: { status: "in_progress", detail: "Applications paused while updated AUAR proceeds; tax-abatement and development agreements tabled May 4, 2026" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "in_progress", detail: "Minnesota Power filed PUC electric service agreement docket 26-159 for Harmony Group LLC on Mar. 26, 2026; comments open through Aug. 28, 2026" }
        },
        sources: [
            { name: "City Project Page", url: "https://hermantownmn.com/project/" },
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
        lastUpdated: "2026-07-20"
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
        currentStatus: "Data center plans inactive. Judge ruled AUAR is adequate. MCEA watching for future data center projects.",
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
        currentStatus: "No data center coming per city officials; MCEA voluntarily dismissed lawsuit in May 2026 because no data center proposal is active. Project remains dead unless facts change.",
        notes: "One of the largest proposed data center developments in Minnesota at 4 million square feet. Oppidan Investment withdrew from project citing concerns about backup generator permit timelines. AUAR approved but lawsuit challenged its adequacy. No formal application was ever filed. At a March 2026 State of the Cities summit, North Mankato City Administrator Kevin McCann confirmed 'no data center' is coming to North Mankato. In May 2026, MCEA agreed to voluntarily dismiss the lawsuit without prejudice because no data center was proposed at the site; dismissal did not decide the merits of AUAR adequacy.",
        litigation: {
            active: false,
            caseNumber: "52-CV-25-568",
            court: "Nicollet County District Court",
            status: "Voluntarily dismissed without prejudice, May 2026",
            filedDate: "2025-08-05"
        },
        timeline: [
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
        lastUpdated: "2026-06-04"
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
        currentStatus: "Temporary injunction issued May 22, 2026 by Judge Biren; all construction halted. Judge rejected defendants' summary judgment. Google-backed facility (Ryan Companies developer) cannot proceed while the injunction remains in effect.",
        notes: "Google data center (Project Skyway), developed by Ryan Companies LLC. Google confirmed as client Feb 2026 after Nov 2024 NDA between Ryan Companies and city. MCEA argued Google was known before AUAR began, meaning EAW/EIS may have been required instead. First building: 250,000 sqft on min. 100 acres; estimated project value over $1 billion. Judge Biren found MCEA showed likelihood of success on the merits and cited failure to disclose data practices records.",
        litigation: {
            active: true,
            caseNumber: "25-CV-25-2298",
            court: "Goodhue County District Court",
            status: "Temporary injunction issued May 22, 2026; construction halted.",
            filedDate: "2025-10-16"
        },
        timeline: [
            { date: "2026-05-22", event: "Temporary injunction issued by Judge Patrick M. Biren; all construction/pre-construction halted" },
            { date: "2026-04-20", event: "Summary judgment hearing (defendants' motion denied)" },
            { date: "2026-04-14", event: "Xcel Energy filed PUC electric service agreement docket 26-170 for Echo Zone LLC" },
            { date: "2026-04-06", event: "Summary judgment hearing" },
            { date: "2026-02", event: "Google publicly confirmed as Project Skyway client" },
            { date: "2026-01-13", event: "City Council approved CUP for first building (250,000 sqft)" },
            { date: "2025-12-17", event: "City Council approved preliminary plat" },
            { date: "2025-11", even…10831 tokens truncated…-backup-power/" },
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
        currentStatus: "Cielo self-reports 157 acres/300 MW; no public entitlement record found.",
        notes: "Cielo Digital Infrastructure lists Chisago as active: 157 acres, 300 MW. No planning file or EQB notice found. Location approximate.",
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
            { name: "Cleanview - Cielo Chisago", url: "https://cleanview.co/public/data-centers/minnesota/2043/cielo-chisago-data-center" },
            { name: "Data Center Dynamics - Cielo national pipeline", url: "https://www.datacenterdynamics.com/en/news/cielo-digital-infrastructure-plans-300mw-data-center-campus-in-south-carolina/" }
        ],
        lastUpdated: "2026-04-07"
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
        status: "watching",
        city: "Inver Grove Heights",
        county: "Dakota",
        lat: 44.8629567,
        lng: -93.0398372,
        acres: null,
        sqft: 54070,
        sqftDisplay: "54,000-55,000 SF",
        mw: 5,
        currentStatus: "City Council approved a one-year moratorium on June 26, 2026 that includes the proposed 5 MW data center at the former Travel Tags site. A June 25 EAW petition pauses action on the site plan while the city reviews the petition.",
        notes: "The city is reviewing a major site plan request for the former Travel Tags property. City materials describe a roughly 50,000-square-foot building with anticipated 5 MW power use; council materials describe an approximately 54,070-square-foot data center. The May 11, 2026 moratorium includes the proposed data center while the city studies data center impacts and regulations.",
        litigation: { active: false },
        timeline: [
            { date: "2026-06-26", event: "City Council approved a one-year moratorium covering the proposed data center" },
            { date: "2026-06-25", event: "Residents filed an EAW petition for the proposed data center" },
            { date: "2026-05-26", event: "City Council tables moratorium second reading to June 8 and site plan request to a meeting before July 1" },
            { date: "2026-05-11", event: "City Council approves interim ordinance studying data centers and imposing moratorium including proposed data center" },
            { date: "2026-04-27", event: "Major site plan request presented to City Council" },
            { date: "2026-04-07", event: "Planning Commission public hearing held" },
            { date: "2026-03-26", event: "Developer hosts neighborhood meeting" }
        ],
        permits: {
            environmentalReview: { status: "in_progress", type: "EAW", detail: "Residents filed an EAW petition June 25, 2026; city review is underway and site-plan action is paused pending the determination" },
            localZoning: { status: "in_progress", detail: "One-year moratorium approved June 26, 2026; site plan vote tabled until after the EAW determination" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "City of Inver Grove Heights - Proposed Data Center Development", url: "https://www.ighmn.gov/CivicAlerts.aspx?AID=2896" },
            { name: "June 26, 2026 Item 7D Moratorium Packet (PDF)", url: "https://www.ighmn.gov/DocumentCenter/View/20108/June-26---Item-7D---Third-Reading-of-an-Interim-Ordinance-Authoring-Study-of-Data-Centers" },
            { name: "May 11, 2026 City Council Actions", url: "https://www.ighmn.gov/DocumentCenter/View/20014/2026-05-11-City-Council-Actions" },
            { name: "May 26, 2026 City Council Actions", url: "https://www.ighmn.gov/DocumentCenter/View/20051/2026-05-26-Council-Actions?bidId=" },
            { name: "Data Center Dynamics - Inver Grove Heights Moratorium", url: "https://www.datacenterdynamics.com/en/news/one-year-data-center-moratorium-approved-in-city-near-minneapolis/" }
        ],
        lastUpdated: "2026-06-29"
    },
    {
        id: 29,
        name: "Elk River Industrial Blvd Data Center",
        status: "watching",
        city: "Elk River",
        county: "Sherburne",
        lat: 45.3186,
        lng: -93.5863,
        acres: 3.223,
        sqft: 58000,
        currentStatus: "After City Council rejected the zoning text amendment on July 6, 2026, the applicant withdrew both the ordinance amendment and CUP applications on July 10. No city approval for a data center at 19178 Industrial Blvd NW is pending.",
        notes: "Applicant Michael Margulies, representing Elk River Capital LLC (Swervo Development), seeks to repurpose part of an existing industrial building into a 58,000-square-foot data center. City materials describe demolition of about 5,000 square feet to improve the loading dock area and closed-loop glycol cooling equipment at the southwest corner of the building.",
        litigation: { active: false },
        timeline: [
            { date: "2026-07-10", event: "Applicant withdrew ordinance amendment and conditional use permit applications" },
            { date: "2026-07-06", event: "City Council rejected the ordinance amendment that would have allowed a data center; conditional use permit remained pending at that point" },
            { date: "2026-06-15", event: "City Council public hearing opened and was continued to July 6, 2026" },
            { date: "2026-05-26", event: "Planning Commission held initial public hearing on ordinance amendment and CUP applications" }
        ],
        permits: {
            environmentalReview: { status: "not_started" },
            localZoning: { status: "withdrawn", detail: "Applicant withdrew the ordinance amendment and CUP applications July 10, 2026 after City Council rejected the ordinance amendment July 6" },
            buildingPermit: { status: "not_started" },
            utilities: { status: "unknown" }
        },
        sources: [
            { name: "Elk River Data Center - Timeline", url: "https://elkriverdatacenter.com/timeline/" },
            { name: "City Council Meeting - July 6, 2026", url: "https://elkriver.viebit.com/watch?hash=wyb78XEL9d2ntnS5" },
            { name: "MPR - Elk River Rejects Data Center Ordinance Change", url: "https://www.mprnews.org/story/2026/07/07/elk-river-rejects-changing-rules-to-allow-data-centers" },
            { name: "City of Elk River - Public Hearings", url: "https://www.elkrivermn.gov/1678/Public-Hearings" },
            { name: "Notice of Public Hearing (PDF)", url: "https://www.elkrivermn.gov/DocumentCenter/View/19540/Notice-of-Public-Hearing-Conditional-Use-Permit-and-Ordinance-Amendment-for-Michael-Margulies---data-center" }
        ],
        lastUpdated: "2026-07-20"
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

