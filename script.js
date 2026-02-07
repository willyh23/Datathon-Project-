// 1. Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

// 2. Neighborhood Center Points (Calculated from CSV)
const neighborhoodCenters = {
    "Adams": [-122.3859, 47.6705], "Atlantic": [-122.3041, 47.5940], "Belltown": [-122.3436, 47.6159],
    "Briarcliff": [-122.4087, 47.6445], "Broadway": [-122.3208, 47.6221], "Bryant": [-122.2869, 47.6752],
    "Central Business District": [-122.3349, 47.6078], "East Queen Anne": [-122.3504, 47.6359],
    "Eastlake": [-122.3252, 47.6420], "First Hill": [-122.3244, 47.6098], "Fremont": [-122.3529, 47.6575],
    "Green Lake": [-122.3355, 47.6894], "Harbor Island": [-122.3539, 47.5778], "Harrison/Denny-Blaine": [-122.2881, 47.6232],
    "Industrial District": [-122.3551, 47.5549], "Interbay": [-122.3835, 47.6464], "International District": [-122.3230, 47.5982],
    "Laurelhurst": [-122.2785, 47.6602], "Lawton Park": [-122.3983, 47.6570], "Leschi": [-122.2908, 47.6001],
    "Lower Queen Anne": [-122.3548, 47.6258], "Loyal Heights": [-122.3844, 47.6883], "Madison Park": [-122.2828, 47.6345],
    "Madrona": [-122.2895, 47.6135], "Mann": [-122.2993, 47.6120], "Minor": [-122.3090, 47.6083],
    "Montlake": [-122.3085, 47.6398], "Mount Baker": [-122.2804, 47.5588], "North Beacon Hill": [-122.3082, 47.5771],
    "North Queen Anne": [-122.3652, 47.6458], "Phinney Ridge": [-122.3539, 47.6748], "Pike-Market": [-122.3417, 47.6098],
    "Pioneer Square": [-122.3322, 47.6001], "Portage Bay": [-122.3200, 47.6463], "Ravenna": [-122.2994, 47.6959],
    "Roosevelt": [-122.3175, 47.6970], "Sand Point": [-122.2613, 47.6793], "South Lake Union": [-122.3375, 47.6231],
    "Southeast Magnolia": [-122.3922, 47.6408], "Stevens": [-122.3052, 47.6265], "Sunset Hill": [-122.3992, 47.6829],
    "University District": [-122.3115, 47.6621], "View Ridge": [-122.2802, 47.6894], "Wallingford": [-122.3338, 47.6602],
    "West Queen Anne": [-122.3670, 47.6348], "West Woodland": [-122.3685, 47.6685], "Westlake": [-122.3418, 47.6328],
    "Whittier Heights": [-122.3687, 47.6956], "Windermere": [-122.2678, 47.6705], "Yesler Terrace": [-122.3203, 47.6035],
};

// Original HTML for the City-Wide Stats (to restore when "All Seattle" is selected)
const defaultStatsHTML = `
    <p><strong>Total Barriers:</strong> 81,973</p>
    <p><strong>Most Common Issue:</strong> Curb Ramps</p>
    <p><strong>Top Priority Area:</strong> Industrial District</p>
    <div class="mini-chart-container" style="margin-top: 15px;">
        <p style="font-size: 11px; color: #aaa; margin-bottom: 5px;">Barrier Type Distribution:</p>
        <div style="background: #444; height: 10px; width: 100%; border-radius: 5px; overflow: hidden; display: flex;">
            <div style="width: 33%; background: #ff0055;" title="Curb Ramps"></div>
            <div style="width: 23%; background: #fbb03b;" title="No Sidewalk"></div>
            <div style="width: 44%; background: #00ffcc;" title="Other"></div>
        </div>
        <p style="font-size: 10px; color: #888; margin-top: 5px;">
            <span style="color:#ff0055">●</span> Curb Ramps | 
            <span style="color:#fbb03b">●</span> Sidewalks | 
            <span style="color:#00ffcc">●</span> Other
        </p>
    </div>
`;

// 3. Initialize the Map
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11', 
    center: [-122.3321, 47.6062], 
    zoom: 11,
    pitch: 45 
});

// 4. Load Data and Layers
map.on('load', () => {
    map.addSource('accessibility-data', {
        type: 'geojson',
        data: 'data/Access_to_Everyday_Life.geojson' 
    });

    map.addLayer({
        id: 'barrier-heat',
        type: 'heatmap',
        source: 'accessibility-data',
        maxzoom: 15,
        paint: {
            'heatmap-weight': ['interpolate', ['linear'], ['coalesce', ['get', 'severity'], 1], 0, 0, 5, 1],
            'heatmap-color': [
                'interpolate', ['linear'], ['heatmap-density'],
                0, 'rgba(33,102,172,0)', 0.2, 'rgb(103,169,207)', 0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)', 0.8, 'rgb(239,138,98)', 1, 'rgb(178,24,43)'
            ],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 11, 1, 15, 3],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 11, 2, 15, 20],
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.8, 15, 0]
        }
    });

    map.addLayer({
        id: 'barrier-points',
        type: 'circle',
        source: 'accessibility-data',
        minzoom: 13,
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 13, 1, 16, 8],
            'circle-color': [
                'interpolate', ['linear'], ['get', 'severity'],
                1, '#00ffcc', 3, '#fbb03b', 5, '#ff0055'  
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    map.setLayoutProperty('barrier-points', 'visibility', 'none');
});

// 5. Combined Filter Logic
function updateMapFilters() {
    const minSeverity = parseInt(document.getElementById('severity-filter').value);
    const neighborhood = document.getElementById('neighborhood-select').value;

    let filters = ['all', ['>=', ['get', 'severity'], minSeverity]];
    if (neighborhood !== 'all') filters.push(['==', ['get', 'neighborhood'], neighborhood]);

    if (map.getLayer('barrier-heat')) map.setFilter('barrier-heat', filters);
    if (map.getLayer('barrier-points')) map.setFilter('barrier-points', filters);

    document.getElementById('sev-val').innerText = minSeverity + "+";
}

// 6. UI Event Listeners
document.getElementById('severity-filter').addEventListener('input', updateMapFilters);

document.getElementById('neighborhood-select').addEventListener('change', (e) => {
    updateMapFilters();
    const selected = e.target.value;

    // A. MAP NAVIGATION
    if (selected === 'all') {
        map.flyTo({ center: [-122.3321, 47.6062], zoom: 11, pitch: 45, essential: true });
        document.getElementById('stats-panel').innerHTML = defaultStatsHTML;
    } else if (neighborhoodCenters[selected]) {
        map.flyTo({ center: neighborhoodCenters[selected], zoom: 14.5, speed: 1.2, essential: true });

        // B. DYNAMIC STATS PANEL UPDATE
        const neighborhoodData = {
            "Industrial District": { score: 36528, count: 11481, topIssue: "No Curb Ramp" },
            "Ravenna": { score: 17754, count: 5282, topIssue: "No Sidewalk" },
            "Wallingford": { score: 11078, count: 3470, topIssue: "Surface Problem" },
            "Mount Baker": { score: 13189, count: 4924, topIssue: "No Sidewalk" }
        };

        const data = neighborhoodData[selected];
        if (data) {
            document.getElementById('stats-panel').innerHTML = `
                <p><strong>Neighborhood:</strong> ${selected}</p>
                <p><strong>Accessibility Index:</strong> ${data.score.toLocaleString()}</p>
                <p><strong>Total Barriers:</strong> ${data.count}</p>
                <p><strong>Primary Issue:</strong> ${data.topIssue}</p>
                <button onclick="location.reload()" style="margin-top:10px; background:none; border:1px solid #666; color:#ccc; cursor:pointer; font-size:10px; padding:2px 5px;">Reset Dashboard</button>
            `;
        } else {
            // Fallback if data for a neighborhood isn't in our manual list yet
            document.getElementById('stats-panel').innerHTML = `<p><strong>Neighborhood:</strong> ${selected}</p><p>Detailed metrics pending...</p>`;
        }
    }
});

// Layer Toggle
document.querySelectorAll('input[name="viz"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        map.setLayoutProperty('barrier-heat', 'visibility', (value === 'heatmap' ? 'visible' : 'none'));
        map.setLayoutProperty('barrier-points', 'visibility', (value === 'points' ? 'visible' : 'none'));
    });
});

// 7. Popups
map.on('click', 'barrier-points', (e) => {
    const props = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();
    const cleanType = props.label_type.replace(/([A-Z])/g, ' $1').trim();

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
            <div style="font-family: sans-serif; min-width: 150px; color: #333;">
                <h3 style="margin:0; color:#ff0055; font-size:16px; border-bottom: 2px solid #ff0055; padding-bottom: 4px;">${cleanType}</h3>
                <div style="margin-top: 10px;">
                    <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase;">Neighborhood</p>
                    <p style="margin: 0 0 8px 0; font-weight: bold;">${props.neighborhood}</p>
                    <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase;">Severity Score</p>
                    <p style="margin: 0; font-weight: bold;">${props.severity} / 5</p>
                </div>
            </div>
        `)
        .addTo(map);
});

// 8. Interaction
map.on('mouseenter', 'barrier-points', () => { map.getCanvas().style.cursor = 'pointer'; });
map.on('mouseleave', 'barrier-points', () => { map.getCanvas().style.cursor = ''; });