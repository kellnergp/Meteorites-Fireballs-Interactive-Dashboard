// Function to build bar graph of meteor count with active year highlighted
function bargraph(year) {
    // Pull years and count from Flask
    var years = m_years.slice(1,-7).split(", ");
    var counts = m_count.slice(1,-4).split(", ");
    console.log(years);
    console.log(counts);

    // create color list
    color_list = [];
    for (let i = 0; i < years.length; i++) {
        if (years[i] == year){
            color_list.push("gold");
        }
        else{
            color_list.push("skyblue");
        }
    }

    // Trace for meteorite data
    let trace = {
        x: years,
        y: counts,
        type: "bar",
        marker: {
            color: color_list
        }
    };
    // Data trace array
    let traceData = [trace];
    // Apply title to the layout
    let layout = {
        title: "Meteorites per Year",
        xaxis: {
            title: "Year",
            type: "category"
        },
        yaxis: {
            title: "Meteorites"
        }
    };
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("plot", traceData, layout);

}

bargraph(2001);