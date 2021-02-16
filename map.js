var mymap;
const getMap = (lattitude, longitude) => {
    if (mymap !== undefined) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([lattitude, longitude], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 13,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hyaXNsYWYiLCJhIjoiY2trbnNxNHFzMTE0ajJxcnFqcG5jY3VvMCJ9.zpMc4eAOLGxjWPXEUSQ_zA'
    }).addTo(mymap);
}