//date entry field using cleave.js Javascript Library
// var cleaveDate = new Cleave('.input-date', {
//    date: true
// });


const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";

d3.json(url).then(function(data) {
    console.log(data[0].geolocation.latitude);

    var names;
    var locations;

    /* for (let j=0; j<data.length; j++) {
        console.log(data[j].id, data[j].geolocation);
    } */
    createMarkers(data);
    
});

function createMarkers(data) {
    var markers = [];

    for (let i=0; i<data.length; i++) {
        var meteorite = data[i];
        var name = meteorite.name;
        var mass = meteorite.mass;
        
        var year = meteorite.year;

        // not all entries have geolocations
        if (meteorite.geolocation) {
            var latitude = Number(meteorite.geolocation.latitude);
            var longitude = Number(meteorite.geolocation.longitude);
            var location = [latitude, longitude];

            var marker = L.marker(location)
                .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + year + "</h3>");

            markers.push(marker);
        }

        
    }
    console.log(markers);

    var markerLayer = L.layerGroup(markers);

    console.log(markerLayer);
    createMap(markerLayer);
}

function createMap(markerLayer) {
    // Create the tile layer that will be the background of our map.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    console.log(street);

    // Create a baseMaps object to hold the lightmap layer.
    var baseMaps = {
        Street: street
    };
    console.log(baseMaps);
    // Create an overlayMaps object to hold the meteorite layer.
    var overlayMaps = {
        Meteorites: markerLayer
    };
    console.log(overlayMaps);
    // Create the map object with options.
    var meteoriteMap = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        layers: [street, markerLayer]
    });

    console.log(meteoriteMap);
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(meteoriteMap); 
}

