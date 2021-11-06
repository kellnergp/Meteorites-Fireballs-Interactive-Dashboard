// Function to build bar graph of meteor count with active year highlighted
function bargraph(year) {
    // Use the D3 library to read in meteorite data
    d3.csv("Meteorite_Landings_Years.csv").then(function(data) {
        console.log(data);
        data.year.forEach(function(year) {

        });

        // Trace for meteorite data
        let trace = {
            X: data.map(row => row.year),
            y: data.map(row => row.year),
            type: "bar"
        };
        // Data trace array
        let traceData = [trace];
        // Apply title to the layout
        let layout = {
            title: "Meteorites per Year"
        };
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot", traceData, layout);

    });
} 

bargraph(2000);