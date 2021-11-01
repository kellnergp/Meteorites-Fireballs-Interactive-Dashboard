const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";

d3.json(url).then(function(data) {
    console.log(data[0].geolocation.latitude);

    var names;
    var locations;

    /* for (let j=0; j<data.length; j++) {
        if (data[j].year) {
            
                var year = data[j].year.slice(0,4);
                console.log(data[j].id, year);
            
            
        }
        
    } */
    createMarkers(data);
    
});

function createMarkers(data) {
    var markers = [];
    var pre17Markers = [];
    var c17Markers = [];
    var c18Markers = [];
    var c19Markers = [];
    var c20Markers = [];

    for (let i=0; i<data.length; i++) {
        var meteorite = data[i];
        var name = meteorite.name;
        var mass = meteorite.mass;
        
        // pull out year component of date and make sure it is treated as a number
        if (meteorite.year) {
            var fullYearString = meteorite.year;
            var justYear = Number(fullYearString.slice(0,4));
        }
        
        // not all entries have geolocations
        if (meteorite.geolocation && meteorite.year) {
            var latitude = Number(meteorite.geolocation.latitude);
            var longitude = Number(meteorite.geolocation.longitude);
            var location = [latitude, longitude];

            /* var marker = L.marker(location, {icon: greenIcon})
                .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>"); */

            //markers.push(marker);

            // divy up markers into different lists based on year
            if (justYear < 1700) {
                    var marker = L.marker(location, {icon: greenIcon})
                        .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>");
                    pre17Markers.push(marker);
            }
            else if (justYear >= 1700 && justYear < 1800) {
                var marker = L.marker(location, {icon: yellowIcon})
                    .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>");
                c17Markers.push(marker);
            }
            else if (justYear >= 1800 && justYear < 1900) {
                var marker = L.marker(location, {icon: blueIcon})
                    .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>");
                c18Markers.push(marker);
            }
            else if (justYear >= 1900 && justYear < 2000) {
                var marker = L.marker(location, {icon: orangeIcon})
                    .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>");
                c19Markers.push(marker);
            }
            else if (justYear >= 2000) {
                var marker = L.marker(location, {icon: redIcon})
                    .bindPopup("<h3>" + name + "</h3><h3>Mass: " + mass + "</h3><h3>Year: " + justYear + "</h3>");
                c20Markers.push(marker);
            }
        }

        
    }
    //console.log(markers);
    //var markerLayer = L.layerGroup(markers);
    //console.log(markerLayer);

    // create marker layers for each century
    pre17Layer = L.layerGroup(pre17Markers);
    c17Layer = L.layerGroup(c17Markers);
    c18Layer = L.layerGroup(c18Markers);
    c19Layer = L.layerGroup(c19Markers);
    c20Layer = L.layerGroup(c20Markers);

    // collect layers into an array
    layerList = [pre17Layer, c17Layer, c18Layer, c19Layer, c20Layer];

    createMap(layerList);
}

function createMap(layerList) {
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
    // Create an overlayMaps object to hold the meteorite layers.
    var overlayMaps = {
        "Pre 1700s Meteorites": layerList[0],
        "1700s Meteorites": layerList[1],
        "1800s Meteorites": layerList[2],
        "1900s Meteorites": layerList[3],
        "2000s Meteorites": layerList[4]
    };
    console.log(overlayMaps);
    // Create the map object with options.
    var meteoriteMap = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        layers: [street, layerList[0]]
    });

    console.log(meteoriteMap);
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(meteoriteMap); 
}
