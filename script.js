// 1. Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

// 2. Neighborhood Center Points
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

// 3. Analytics Data
const neighborhoodData = {
    "Adams": { score: 2610, count: 1037, topIssue: "Curb Ramp" },
    "Atlantic": { score: 2720, count: 1165, topIssue: "Curb Ramp" },
    "Belltown": { score: 1800, count: 1067, topIssue: "Curb Ramp" },
    "Briarcliff": { score: 3808, count: 1714, topIssue: "No Sidewalk" },
    "Broadway": { score: 4389, count: 1824, topIssue: "Curb Ramp" },
    "Bryant": { score: 3081, count: 1125, topIssue: "Curb Ramp" },
    "Central Business District": { score: 1342, count: 842, topIssue: "Curb Ramp" },
    "East Queen Anne": { score: 3089, count: 1197, topIssue: "Curb Ramp" },
    "Eastlake": { score: 935, count: 387, topIssue: "Curb Ramp" },
    "First Hill": { score: 1753, count: 736, topIssue: "Curb Ramp" },
    "Fremont": { score: 5370, count: 2133, topIssue: "Curb Ramp" },
    "Green Lake": { score: 7362, count: 2650, topIssue: "Curb Ramp" },
    "Harbor Island": { score: 500, count: 170, topIssue: "Obstacle" },
    "Harrison/Denny-Blaine": { score: 2479, count: 904, topIssue: "Surface Problem" },
    "Industrial District": { score: 36908, count: 11481, topIssue: "No Sidewalk" },
    "Interbay": { score: 2039, count: 637, topIssue: "No Sidewalk" },
    "International District": { score: 927, count: 452, topIssue: "Curb Ramp" },
    "Laurelhurst": { score: 2257, count: 1001, topIssue: "Curb Ramp" },
    "Lawton Park": { score: 3571, count: 1326, topIssue: "Curb Ramp" },
    "Leschi": { score: 4572, count: 1669, topIssue: "Curb Ramp" },
    "Lower Queen Anne": { score: 1948, count: 946, topIssue: "Curb Ramp" },
    "Loyal Heights": { score: 6167, count: 2110, topIssue: "No Sidewalk" },
    "Madison Park": { score: 1814, count: 681, topIssue: "Surface Problem" },
    "Madrona": { score: 3789, count: 1408, topIssue: "Surface Problem" },
    "Mann": { score: 1380, count: 669, topIssue: "Curb Ramp" },
    "Minor": { score: 3226, count: 1400, topIssue: "Curb Ramp" },
    "Montlake": { score: 2352, count: 880, topIssue: "Curb Ramp" },
    "Mount Baker": { score: 13336, count: 4924, topIssue: "Curb Ramp" },
    "North Beacon Hill": { score: 10807, count: 4147, topIssue: "Surface Problem" },
    "North Queen Anne": { score: 4200, count: 1602, topIssue: "Curb Ramp" },
    "Phinney Ridge": { score: 5030, count: 1782, topIssue: "No Curb Ramp" },
    "Pike-Market": { score: 266, count: 140, topIssue: "Curb Ramp" },
    "Pioneer Square": { score: 941, count: 539, topIssue: "Curb Ramp" },
    "Portage Bay": { score: 743, count: 328, topIssue: "Curb Ramp" },
    "Ravenna": { score: 17841, count: 5282, topIssue: "No Sidewalk" },
    "Roosevelt": { score: 8011, count: 2634, topIssue: "No Sidewalk" },
    "Sand Point": { score: 598, count: 188, topIssue: "No Sidewalk" },
    "South Lake Union": { score: 1261, count: 756, topIssue: "Curb Ramp" },
    "Southeast Magnolia": { score: 3603, count: 1385, topIssue: "Curb Ramp" },
    "Stevens": { score: 3901, count: 1666, topIssue: "Curb Ramp" },
    "Sunset Hill": { score: 4091, count: 1464, topIssue: "No Sidewalk" },
    "University District": { score: 4550, count: 2035, topIssue: "Curb Ramp" },
    "View Ridge": { score: 5583, count: 1699, topIssue: "No Sidewalk" },
    "Wallingford": { score: 11142, count: 3470, topIssue: "No Curb Ramp" },
    "West Queen Anne": { score: 2573, count: 1086, topIssue: "Curb Ramp" },
    "West Woodland": { score: 2833, count: 1275, topIssue: "Curb Ramp" },
    "Westlake": { score: 253, count: 127, topIssue: "Curb Ramp" },
    "Whittier Heights": { score: 9056, count: 2684, topIssue: "No Sidewalk" },
    "Windermere": { score: 1993, count: 696, topIssue: "No Sidewalk" },
    "Yesler Terrace": { score: 1273, count: 453, topIssue: "Curb Ramp" },
};

// Global toggle function
window.toggleNote = function() {
    const note = document.getElementById('index-note');
    note.style.display = (note.style.display === 'none' || note.style.display === '') ? 'block' : 'none';
};

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

// 4. Initialize Map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-122.3321, 47.6062],
    zoom: 11,
    pitch: 45
});

map.on('load', () => {
    map.addSource('accessibility-data', { type: 'geojson', data: 'data/Access_to_Everyday_Life.geojson' });
    
    map.addLayer({
        id: 'barrier-heat', type: 'heatmap', source: 'accessibility-data', maxzoom: 15,
        paint: {
            'heatmap-weight': ['interpolate', ['linear'], ['coalesce', ['get', 'severity'], 1], 0, 0, 5, 1],
            'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(33,102,172,0)', 0.2, 'rgb(103,169,207)', 0.4, 'rgb(209,229,240)', 0.6, 'rgb(253,219,199)', 0.8, 'rgb(239,138,98)', 1, 'rgb(178,24,43)'],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 11, 1, 15, 3],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 11, 2, 15, 20],
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0.8, 15, 0]
        }
    });

    map.addLayer({
        id: 'barrier-points', type: 'circle', source: 'accessibility-data', minzoom: 13,
        paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 13, 1, 16, 8],
            'circle-color': ['interpolate', ['linear'], ['get', 'severity'], 1, '#00ffcc', 3, '#fbb03b', 5, '#ff0055'],
            'circle-stroke-width': 1, 'circle-stroke-color': '#fff'
        }
    });
    map.setLayoutProperty('barrier-points', 'visibility', 'none');
});

// 5. Filter Logic
function updateMapFilters() {
    const minSeverity = parseInt(document.getElementById('severity-filter').value);
    const neighborhood = document.getElementById('neighborhood-select').value;
    let filters = ['all', ['>=', ['get', 'severity'], minSeverity]];
    if (neighborhood !== 'all') filters.push(['==', ['get', 'neighborhood'], neighborhood]);
    if (map.getLayer('barrier-heat')) map.setFilter('barrier-heat', filters);
    if (map.getLayer('barrier-points')) map.setFilter('barrier-points', filters);
    document.getElementById('sev-val').innerText = minSeverity + "+";
}

document.getElementById('severity-filter').addEventListener('input', updateMapFilters);

// 6. Neighborhood Logic
document.getElementById('neighborhood-select').addEventListener('change', (e) => {
    updateMapFilters();
    const selected = e.target.value;

    if (selected === 'all') {
        map.flyTo({ center: [-122.3321, 47.6062], zoom: 11, pitch: 45, essential: true });
        document.getElementById('stats-panel').innerHTML = defaultStatsHTML;
    } else if (neighborhoodCenters[selected]) {
        map.flyTo({ center: neighborhoodCenters[selected], zoom: 14.5, speed: 1.2, essential: true });

        const data = neighborhoodData[selected];
        if (data) {
            document.getElementById('stats-panel').innerHTML = `
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; border: 1px solid #444;">
                    <p style="margin-top:0; font-size:14px;"><strong>${selected}</strong></p>
                    
                    <p style="margin-bottom:2px;">
                        <strong>Accessibility Index:</strong> ${data.score.toLocaleString()}
                        <span onclick="toggleNote()" style="cursor:pointer; margin-left:5px; background:#444; border-radius:50%; width:15px; height:15px; display:inline-flex; align-items:center; justify-content:center; font-size:10px; border:1px solid #888; color:white;" title="Click for info">i</span>
                    </p>
                    
                    <div id="index-note" style="display:none; background:#222; padding:8px; border:1px solid #555; border-radius:4px; font-size:10px; color:#ccc; margin-bottom:10px; position:relative;">
                        The Index is the sum of all barrier severity scores. A higher score means more "Mobility Friction" for pedestrians.
                        <span onclick="toggleNote()" style="position:absolute; top:2px; right:5px; cursor:pointer; color:#ff0055; font-weight:bold;">×</span>
                    </div>

                    <p><strong>Total Barriers:</strong> ${data.count.toLocaleString()}</p>
                    <p><strong>Primary Issue:</strong> ${data.topIssue}</p>
                    
                    <button onclick="location.reload()" style="
                        margin-top: 15px; 
                        width: 100%; 
                        background: #ff0055; 
                        color: white; 
                        border: none; 
                        cursor: pointer; 
                        font-weight: bold;
                        font-size: 11px; 
                        padding: 10px 5px;
                        border-radius: 4px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    ">RESET DASHBOARD</button>
                </div>
            `;
        }
    }
});

// View Toggle
document.querySelectorAll('input[name="viz"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        map.setLayoutProperty('barrier-heat', 'visibility', (value === 'heatmap' ? 'visible' : 'none'));
        map.setLayoutProperty('barrier-points', 'visibility', (value === 'points' ? 'visible' : 'none'));
    });
});

// Popups
map.on('click', 'barrier-points', (e) => {
    const props = e.features[0].properties;
    const cleanType = props.label_type.replace(/([A-Z])/g, ' $1').trim();
    new mapboxgl.Popup().setLngLat(e.features[0].geometry.coordinates).setHTML(`
        <div style="font-family: sans-serif; min-width: 150px; color: #333;">
            <h3 style="margin:0; color:#ff0055; font-size:16px; border-bottom: 2px solid #ff0055; padding-bottom: 4px;">${cleanType}</h3>
            <div style="margin-top: 10px;">
                <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase;">Neighborhood</p>
                <p style="margin: 0 0 8px 0; font-weight: bold;">${props.neighborhood}</p>
                <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase;">Severity Score</p>
                <p style="margin: 0; font-weight: bold;">${props.severity || 1} / 5</p>
            </div>
        </div>
    `).addTo(map);
});

map.on('mouseenter', 'barrier-points', () => { map.getCanvas().style.cursor = 'pointer'; });
map.on('mouseleave', 'barrier-points', () => { map.getCanvas().style.cursor = ''; });