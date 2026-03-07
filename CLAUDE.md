# CLAUDE.md - Instructions for Claude Code

## Project Overview
Minnesota Data Center Tracker - an interactive map tracking proposed data center developments across Minnesota. Uses Leaflet.js for mapping with project data stored in `data.js`.

## Key Files
- `data.js` - All project data (coordinates, status, timelines, sources). This is the primary file to edit when updating project information.
- `app.js` - Map rendering, filtering, and UI logic.
- `index.html` - Main page layout and styles.

## Workflow Requirements

### Always merge to main
After committing and pushing changes to the feature branch, always create a PR to merge into `main` and remind the user to merge it. The deployed site serves from `main`, so changes on feature branches won't be visible until merged.

### Data entry requirements
When adding or updating entries in `data.js`, every project **must** have:
- `id` (unique number)
- `name`, `city`, `county` (strings)
- `lat` and `lng` (numbers) - **required for the marker to appear on the map**
- `status` (one of: `in_litigation`, `in_review`, `review_complete`, `construction`, `operational`, `watching`, `suspended`)

### Coordinate accuracy
When adding new locations or updating coordinates, research the actual site location using road intersections, parcel descriptions, and AUAR documents rather than using city center coordinates. Verify coordinates place the marker in the correct area (e.g., near described roads/intersections).
