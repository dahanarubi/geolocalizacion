// Ubicación fija mi casa
const refLat = 25.46901;
const refLon = -100.98526
;

// Inicializar mapa
const map = L.map('map').setView([refLat, refLon], 13);

// Mapa oscuro futurista
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Ubicación fija (manual)
L.circleMarker([refLat, refLon], {
    radius: 10,
    color: '#c084fc',
    fillColor: '#c084fc',
    fillOpacity: 0.9
}).addTo(map).bindPopup('📍 Ubicación fija (casa dahana rubi)');

// Ubicación del usuario (GPS)
function mostrarMiUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            L.circleMarker([lat, lon], {
                radius: 10,
                color: '#22c55e',
                fillColor: '#22c55e',
                fillOpacity: 0.9
            }).addTo(map)
              .bindPopup(`🧍 Ubicación en tiempo real (GPS)<br>
              Lat: ${lat.toFixed(4)}<br>
              Lon: ${lon.toFixed(4)}`)
              .openPopup();

            map.setView([lat, lon], 15);
        });
    }
}

// Volver a ubicación fija
function irReferencia() {
    map.setView([refLat, refLon], 13);
}

let searchMarker = null;

function buscarLugar() {
    const lugar = document.getElementById("search").value;

    if (!lugar) return;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${lugar}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                alert("Ubicación no encontrada");
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            if (searchMarker) {
                map.removeLayer(searchMarker);
            }

            searchMarker = L.circleMarker([lat, lon], {
                radius: 10,
                color: '#c084fc',
                fillColor: '#c084fc',
                fillOpacity: 0.9
            }).addTo(map)
              .bindPopup(`🔎 Resultado de búsqueda<br>${lugar}`)
              .openPopup();

            map.setView([lat, lon], 15);
        });
}

