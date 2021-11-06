// Function for chosing Year in dropdown menu (optionChanged)
function optionChanged(select_year) {
    console.log(select_year);

    // Read in fireball data with D3 library
    const url_F = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/Fireball_Data_Years.csv";

    d3.csv(url_F).then(function(data) {
        console.log(data);

        var fireball_radiation = [];
        var fireball_latlon = [];

        for (var i=0; i<data.length; i++) {
            var fireball = data[i];

            if (fireball['Peak Brightness Date/Time (UT)'] == select_year) {
                fireball_radiation.push(fireball['Total Radiated Energy (J)']/1000000000);
                fireball_latlon.push(`${fireball['Latitude (deg.)']}, ${fireball['Longitude (deg.)']}`)
            }

        }

        var counter = 1;
        var fireball_id = [];

        for (var i=0; i<fireball_radiation.length; i++) {
            fireball_id.push(counter);
            counter += 1;
        }

        var bubbleFireball = [{
            x: fireball_id,
            y: fireball_radiation,
            text: fireball_latlon,
            mode: "markers",
            marker: {
                size: fireball_radiation,
                sizeref: 1,
                sizemode: "area",
                color: "red"
            }
        }];

        var chartTitle_F = String(`Radiation of Fireballs from ${select_year}`);

        var layout_F = {
            yaxis: {title: "Total Radiated Energy (GJ)"},
            title: "<b>" + chartTitle_F + "</b>"
        };

        Plotly.newPlot("bubble1", bubbleFireball, layout_F);

    });

    const url_M = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/Meteorite_Landings_Years.csv"

    d3.csv(url_M).then(function(data) {
        console.log(data);

        var meteorite_mass = [];
        var meteorite_name = [];

        for (var i=0; i<data.length; i++) {
            var meteorite = data[i];

            if (meteorite['year'] == select_year) {
                meteorite_mass.push(meteorite['mass (g)']/1000);
                meteorite_name.push(meteorite['name'])

            }

        }

        var meteorite_id = [];
        var counter = 1;

        for (var i=0; i<meteorite_mass.length; i++) {
            meteorite_id.push(counter);
            counter += 1;
        }

        var bubbleMeteorite = [{
            x: meteorite_id,
            y: meteorite_mass,
            text: meteorite_name,
            mode: "markers",
            marker: {
                size: meteorite_mass,
                color: "blue"
            }
        }];

        var chartTitle_M = String(`Mass of Meteorites from ${select_year}`);

        var layout_M = {
            yaxis: {title: "Mass (kg)"},
            title: "<b>" + chartTitle_M + "</b>"
        };

        Plotly.newPlot("bubble2", bubbleMeteorite, layout_M);

    });
    // Call bargraph and bullet graph creation functions
    bargraph(select_year);
    bullet(select_year);
}

// Read in files with D3 library
d3.csv("https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/year.csv").then(function(data) {
    console.log(data);

    var dropdownMenu = d3.select("#selDataset");

    // Create <option> elements for each year in "year"
    for (var i=0; i<data.length; i++) {
        var entry = data[i];
        dropdownMenu.append("option").text(entry['year']);
    }
    
    // Use optionChanged function to set default plots
    optionChanged("2021");

});

// const url_F = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/Fireball_Data_Years.csv";

// const url_M = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/Meteorite_Landings_Years.csv"

// d3.csv(url_F).then(function(data) {
//     console.log(data);
// });

// d3.csv(url_M).then(function(data) {
//     console.log(data);
// });

