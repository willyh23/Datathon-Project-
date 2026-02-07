mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbHloMjMiLCJhIjoiY21obDBjN2ttMW1kdDJxcHI3a2s3YjR1dCJ9.1afNW3K_mxg4u55J1MPeaA';

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v11', 
    center: [-122.3321, 47.6062], 
    zoom: 11,
    pitch: 45 
});

map.on('load', () => {
    map.addSource('accessibility-data', {
        type: 'geojson',
        data: 'data/Access_to_Everyday_Life.geojson' 
    });

    // 2. Optimized Heatmap Layer
    map.addLayer({
        id: 'barrier-heat',
        type: 'heatmap',
        source: 'accessibility-data',
        maxzoom: 15,
        paint: {
            // Use 'coalesce' to handle any missing severity values safely
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
            // --- INSERTED CODE STARTS HERE ---
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
                15, 0 // Heatmap fades out as you zoom in close
            ]
            // --- INSERTED CODE ENDS HERE ---
        }
    });

    // 3. Individual points (Visible when zoomed in)
    map.addLayer({
        id: 'barrier-points',
        type: 'circle',
        source: 'accessibility-data',
        minzoom: 13, // Lowered slightly so points appear as heatmap fades
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

    // --- POPUP LOGIC ---
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });

    map.on('click', 'barrier-points', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const props = e.features[0].properties;
        const status = props.is_temporary ? "Temporary (Construction)" : "Permanent Issue";
        
        const content = `
            <div style="color: #333; font-family: sans-serif;">
                <h3 style="margin:0; color:#ff0055;">${props.label_type}</h3>
                <hr>
                <p><strong>Neighborhood:</strong> ${props.neighborhood}</p>
                <p><strong>Severity:</strong> ${props.severity}/5</p>
                <p><strong>Type:</strong> ${status}</p>
            </div>
        `;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(content)
            .addTo(map);
    });

    // Cursor change on hover
    map.on('mouseenter', 'barrier-points', () => { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', 'barrier-points', () => { map.getCanvas().style.cursor = ''; });
});

// Sidebar Logic
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