// Google Maps Integration
let map;
let marker;

// Initialize map when Google Maps API is loaded
function initMap() {
    // Create map centered on Resende, RJ
    map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: { lat: -22.4689, lng: -44.4469 }, // Resende, RJ coordinates
        mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }]
            },
            {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#242f3e' }]
            },
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });

    // Create AdvancedMarkerElement for Elevate office
    const position = { lat: -22.4689, lng: -44.4469 };
    
    // Create marker content
    const markerView = new google.maps.marker.PinElement({
        background: '#FFD700',
        borderColor: '#000',
        glyphColor: '#000',
        scale: 1.2
    });

    // Create AdvancedMarkerElement
    marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        content: markerView.element,
        title: 'Elevate - Software House'
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #FFD700;">Elevate</h3>
                <p style="margin: 0; font-size: 14px;">
                    Rua Vinte Nove de Setembro, 53, 2º andar<br>
                    Campos Elíseos, Resende - RJ, Brasil
                </p>
            </div>
        `
    });

    // Add click listener to marker
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Load Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYk0AmkAo24326xM5oHZBa3Rr2u9q4Ok&callback=initMap&loading=async&libraries=marker';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load Google Maps API
    loadGoogleMapsAPI();
}); 