//getFireballs();

function getFireballs() {

    const csvPath = "../Resources/Fireball_Data_Years.csv";
    const url = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/Cleaned_Fireball_Data_CNEOS.csv";

    d3.csv(url).then(function(data){
        //console.log(data);

        /* for (let i=0; i<data.length; i++) {
            var fireball = data[i];
            console.log(i, typeof fireball['Latitude (deg.)'], typeof fireball['Longitude (deg.)']);
        } */
        createFbMarkers(data);
    });
}
function createFbMarkers(data) {
    var markers = [];

    // create empty lists for markers by decade
    var d90sMarkers = [];
    var d00sMarkers = [];
    var d10sMarkers = []; 
    var d20sMarkers = [];

    // iterate through data entries to create markers
    for (let i=0; i<data.length; i++) {
        var fireball = data[i];

        var latitude;
        var longitude;
       
        // fix coordinate formatting; pull string value 
        rawLat = fireball['Latitude (deg.)'];
        rawLng = fireball['Longitude (deg.)'];

        try {
            //console.log(i, rawLat, rawLng)
            
            // slice off hemisphere notation and store in variables
            latHemi = rawLat.slice(-1);
            lngHemi = rawLng.slice(-1);

            // store numeric component of coordinates as numbers
            cutLat = Number(rawLat.slice(0,-1));
            cutLng = Number(rawLng.slice(0,-1));
        }
        catch (e) {
            // exit the loop
            break; 
          }

        // use if statements to negate southern and western hemisphere values
        if (latHemi == "S") {
            latitude = cutLat * -1;
        }
        else {latitude = cutLat;}
        if (lngHemi == "W") {
            longitude = cutLng * -1;
        }
        else {longitude = cutLng;}

        // declare more variables for popup
        var location = [latitude, longitude];
        var date = (new Date(fireball['Peak Brightness Date/Time (UT)']));
        var radiated = fireball['Total Radiated Energy (J)'];
        var velocity = fireball['Velocity (km/s)'];

        //console.log(i, date, typeof date);

        // pull just the year into a separate variable
        var justYear = date.getFullYear();
        //console.log(typeof justYear);

        // conditionals to divide markers by decade
        if (justYear < 2000) {
            var marker = L.marker(location, {icon: greenIcon})
                .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                    + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");
            d90sMarkers.push(marker);
        }
        else if (justYear >= 2000 && justYear < 2010) {
            var marker = L.marker(location, {icon: blueIcon})
                .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                    + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");
            d00sMarkers.push(marker);
        }
        else if (justYear >= 2010 && justYear < 2020) {
            var marker = L.marker(location, {icon: violetIcon})
                .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                    + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");
            d10sMarkers.push(marker);
        }
        else if (justYear >= 2020 && justYear < 2030) {
            var marker = L.marker(location, {icon: redIcon})
                .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                    + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");
            d20sMarkers.push(marker);
        }

        /* var marker = L.marker(location)
            .bindPopup("<h3>Date:" + date + "</h3><h3>Location: " + rawLat + ", " + rawLng + "</h3><h3>Total Radiated Energy (J): " 
                + radiated + "</h3><h3>Velocity (km/s): " + velocity + "</h3>");

        markers.push(marker); */

        
        
    }
    //console.log(markers);

    //var markerLayer = L.layerGroup(markers);
    // create markerlayer for each decade
    var d90Layer = L.layerGroup(d90sMarkers);
    var d00Layer = L.layerGroup(d00sMarkers);
    var d10Layer = L.layerGroup(d10sMarkers);
    var d20Layer = L.layerGroup(d20sMarkers);

    // store all layers in an array
    var markerLayers = [d90Layer, d00Layer, d10Layer, d20Layer];

    //console.log(markerLayer);
    createFbMap(markerLayers);
}

function createFbMap(markerLayers) {

    // Create the tile layer that will be the background of our map.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    //console.log(street);

    // Create a baseMaps object to hold the lightmap layer.
    var baseMaps = {
        Street: street
    };
    //console.log(baseMaps);
    // Create an overlayMaps object to hold the meteorite layer.
    var overlayMapsF = {
        "1990s Fireballs": markerLayers[0],
        "2000s Fireballs": markerLayers[1],
        "2010s Fireballs": markerLayers[2],
        "2020s Fireballs": markerLayers[3]
    };
    //console.log(overlayMaps);
    // Create the map object with options.
    var fireballMap = L.map("map-id-f", {
        center: [0.00, 0.00],
        zoom: 2,
        layers: [street, markerLayers[0]]
    }); 

    console.log(fireballMap);
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMapsF, {collapsed: false}).addTo(fireballMap); 

    return fireballMap;
}
