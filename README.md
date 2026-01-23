# Minnesota Data Center Tracker

An interactive dashboard tracking proposed and approved data center developments across Minnesota.

## Features

- **Interactive Map** - Visualize all project locations across Minnesota with color-coded status markers
- **Real-time Filtering** - Filter by project status (Active, Potential, Approved, Monitoring)
- **Project Details** - Click any project to see full details including acreage, square footage, timeline, and notes
- **Search** - Quickly find projects by name, city, or county
- **Data Export** - Download all project data as JSON

## Status Categories

| Status | Color | Description |
|--------|-------|-------------|
| 🔴 Active | Red | Active lawsuit or appeal window open |
| 🟠 Potential | Orange | Potential legal action possible |
| 🟢 Approved | Green | Approved, no appeal/lawsuit window expired |
| 🔵 Monitoring | Blue | Being monitored, no AUAR filed yet |
| ⚫ Suspended | Gray | Suspended or rumored projects |

## Data Sources

- [EQB Monitor](https://www.eqb.state.mn.us/eqb-monitor) - Weekly environmental review notices
- City Council meeting minutes and agendas
- News reports (Star Tribune, local papers)
- Industry publications (Data Center Dynamics)

## Deployment

This is a static site that can be hosted on GitHub Pages:

1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" and choose `main`
4. Your site will be live at `https://yourusername.github.io/repository-name`

## Updating Data

Edit `data.js` to add, update, or remove projects. Each project has:

```javascript
{
    id: 1,
    name: "Project Name",
    status: "active|potential|approved|monitoring|suspended",
    statusLabel: "Display Label",
    city: "City Name",
    county: "County Name",
    lat: 45.0000,  // Latitude
    lng: -93.0000, // Longitude
    acres: 100,
    sqft: 1000000,
    deadline: "Date string or null",
    currentStatus: "Current status description",
    notes: "Additional notes",
    sources: ["Source 1", "Source 2"],
    lastUpdated: "YYYY-MM-DD"
}
```

## Local Development

```bash
# Start a local server
python -m http.server 8080

# Open http://localhost:8080 in your browser
```

## License

MIT License - Feel free to use and modify.

## Credits

Built with:
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [CARTO](https://carto.com/) - Dark map tiles
- [Inter](https://rsms.me/inter/) - Typography
