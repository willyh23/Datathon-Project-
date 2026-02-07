// 1. Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

// 2. Initialize the Map
const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11', 
    center: [-122.3321, 47.6062], // Seattle coordinates
    zoom: 11,
    pitch: 45 // 3D tilt
});

// 3. Load Data and Layers
map.on('load', () => {
    map.addSource('accessibility-data', {
        type: 'geojson',
        data: 'data/Access_to_Everyday_Life.geojson' 
    });

    // Heatmap Layer: Visualizes density of issues
    map.addLayer({
        id: 'barrier-heat',
        type: 'heatmap',
        source: 'accessibility-data',
        maxzoom: 15,
        paint: {
            'heatmap-weight': [
                'interpolate', ['linear'], ['coalesce', ['get', 'severity'], 1],
                0, 0,
                5, 1
            ],
            'heatmap-color': [
                'interpolate', ['linear'], ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            'heatmap-intensity': [
                'interpolate', ['linear'], ['zoom'],
                11, 1,
                15, 3
            ],
            'heatmap-radius': [
                'interpolate', ['linear'], ['zoom'],
                11, 2, 
                15, 20
            ],
            'heatmap-opacity': [
                'interpolate', ['linear'], ['zoom'],
                13, 0.8,
                15, 0 
            ]
        }
    });

    // Point Layer: Individual markers visible when zoomed in
    map.addLayer({
        id: 'barrier-points',
        type: 'circle',
        source: 'accessibility-data',
        minzoom: 13,
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], ['zoom'],
                13, 1,
                16, 8
            ],
            'circle-color': [
                'interpolate', ['linear'], ['get', 'severity'],
                1, '#00ffcc', 
                3, '#fbb03b', 
                5, '#ff0055'  
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // Initial state: Start with heatmap visible, points hidden
    map.setLayoutProperty('barrier-points', 'visibility', 'none');
});

// 4. Combined Filter Logic (This fixes the Slider and Dropdown)
function updateMapFilters() {
    // Get values from the HTML elements
    const minSeverity = parseInt(document.getElementById('severity-filter').value);
    const neighborhood = document.getElementById('neighborhood-select').value;

    // Build the filter array
    let filters = ['all', ['>=', ['get', 'severity'], minSeverity]];

    // If a neighborhood is selected, add it to the filter
    if (neighborhood !== 'all') {
        filters.push(['==', ['get', 'neighborhood'], neighborhood]);
    }

    // Apply the combined filter to both layers
    if (map.getLayer('barrier-heat')) map.setFilter('barrier-heat', filters);
    if (map.getLayer('barrier-points')) map.setFilter('barrier-points', filters);

    // Update the number text next to the slider
    document.getElementById('sev-val').innerText = minSeverity + "+";
}

// 5. Setup UI Event Listeners

// Severity Slider
document.getElementById('severity-filter').addEventListener('input', updateMapFilters);

// Neighborhood Dropdown
document.getElementById('neighborhood-select').addEventListener('change', (e) => {
    updateMapFilters();
    
    // Fly to the neighborhood when selected
    if (e.target.value !== 'all') {
        const features = map.querySourceFeatures('accessibility-data', {
            filter: ['==', ['get', 'neighborhood'], e.target.value]
        });
        if (features.length > 0) {
            map.flyTo({
                center: features[0].geometry.coordinates,
                zoom: 14,
                essential: true
            });
        }
    }
});

// Heatmap/Points Toggle Buttons
document.querySelectorAll('input[name="viz"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === 'heatmap') {
            map.setLayoutProperty('barrier-heat', 'visibility', 'visible');
            map.setLayoutProperty('barrier-points', 'visibility', 'none');
        } else {
            map.setLayoutProperty('barrier-heat', 'visibility', 'none');
            map.setLayoutProperty('barrier-points', 'visibility', 'visible');
        }
    });
});

// 6. Interactive Popups (Simplified to Neighborhood, Severity, and Label)
map.on('click', 'barrier-points', (e) => {
    const props = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();
    
    // Formatting "NoCurbRamp" -> "No Curb Ramp"
    const cleanType = props.label_type.replace(/([A-Z])/g, ' $1').trim();

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
            <div style="font-family: sans-serif; min-width: 150px; color: #333;">
                <h3 style="margin:0; color:#ff0055; font-size:16px; border-bottom: 2px solid #ff0055; padding-bottom: 4px;">
                    ${cleanType}
                </h3>
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

// 7. Mouse interactions
map.on('mouseenter', 'barrier-points', () => { map.getCanvas().style.cursor = 'pointer'; });
map.on('mouseleave', 'barrier-points', () => { map.getCanvas().style.cursor = ''; });