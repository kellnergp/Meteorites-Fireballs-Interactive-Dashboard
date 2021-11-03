const url = "https://data.nasa.gov/resource/mc52-syum.json";

d3.json(url).then(function(data) {
    console.log(data);

    var counter = 0;
/* 
    for (let i=0; i<data.length; i++) {
        var date = data[i].date_time_peak_brightness_ut;
        tlat = data[i].latitude_deg;

        //console.log(typeof(data[i].date_time_peak_brightness_ut));
        console.log(counter, tlat.slice(-1));

        counter += 1;
    } */
    createMarkers(data);
});

function createMarkers(data) {
    var markers = [];

    for (let i=0; i<data.length; i++) {
        var fireball = data[i];

        var latitude;
        var longitude;
       
        // fix coordinate formatting; pull string value 
        rawLat = fireball.latitude_deg;
        rawLng = fireball.longitude_deg;

        // slice off hemisphere notation and store in variables
        latHemi = rawLat.slice(-1);
        lngHemi = rawLng.slice(-1);

        // store numeric component of coordinates as numbers
        cutLat = Number(rawLat.slice(0,-1));
        cutLng = Number(rawLng.slice(0, -1));

        // use if statements to negate southern and western hemisphere values
        if (latHemi == "S") {
            latitude = cutLat * -1;
        }
        else {latitude = cutLat;}
        if (lngHemi == "W") {
            longitude = cutLng * -1;
        }
        else {longitude = cutLng;}


        var location = [latitude, longitude];
        var date = fireball.date_time_peak_brightness_ut;
        var radiated = fireball.total_radiated_energy_j;
        var velocity = fireball.velocity_km_s;

        var marker = L.marker(location)
            .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");

        markers.push(marker);

        
        
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
        Fireballs: markerLayer
    };
    console.log(overlayMaps);
    // Create the map object with options.
    var fireballMap = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        layers: [street, markerLayer]
    });

    console.log(fireballMap);
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(fireballMap); 
}
