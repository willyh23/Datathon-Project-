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

    // 2. Add the Heatmap Layer (Great for "Friction Zones")
    map.addLayer({
        id: 'barrier-heat',
        type: 'heatmap',
        source: 'accessibility-data',
        maxzoom: 15,
        paint: {
            // Increase weight as severity increases
            'heatmap-weight': [
                'interpolate', ['linear'], ['get', 'severity'],
                0, 0,
                5, 1
            ],
            // Color ramp for heatmap. 
            // Blue (low) -> Pink (high) looks great on dark mode
            'heatmap-color': [
                'interpolate', ['linear'], ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': 15,
            'heatmap-opacity': 0.8
        }
    });

    // 3. Add individual points (Visible when zoomed in)
    map.addLayer({
        id: 'barrier-points',
        type: 'circle',
        source: 'accessibility-data',
        minzoom: 14,
        paint: {
            'circle-radius': [
                'interpolate', ['linear'], ['get', 'severity'],
                1, 3,
                5, 8
            ],
            'circle-color': [
                'interpolate', ['linear'], ['get', 'severity'],
                1, '#00ffcc', // Cyan for low severity
                3, '#fbb03b', // Orange for mid
                5, '#ff0055'  // Bright Pink/Red for high
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });
});

// Logic for Sidebar Radio Buttons (Switching Views)
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