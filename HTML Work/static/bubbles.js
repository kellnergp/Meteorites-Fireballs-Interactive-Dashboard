// Function for chosing Test Subject ID Number in dropdown menu (optionChanged)
function optionChanged(idNum) {
    console.log(idNum);

    // Read in samples.json with D3 library
    d3.csv("./Resources/Cleaned_Fireball_Data_CNEOS.csv").then(function(data) {

        // Pull metadata values for matching subject ID Number
        metadata = Object.values(data.metadata.filter(function(findMeta) {
            return findMeta.id.toString() == idNum;
        }));
        metadata = metadata[0];
        console.log(metadata);

        // Clear the Demographic Info under the "sample-metadata" ID, 
        // then fill it in using the entry's key-value pairs
        d3.select("#sample-metadata").html("");
        Object.entries(metadata).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });

        // Pull sample values for matching subject ID Number
        samples = Object.values(data.samples.filter(function(findSample) {
            return findSample.id.toString() == idNum;
        }));
        samples = samples[0];
        console.log(samples);

        // Sort samples by sample_values in descending order
        samples.sample_values.sort(function sortFunction(a, b) {
            return b - a;
        });

        // Create bubble chart that displays each sample for the subject
        var bubbleChart = [{
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            }
        }];

        var layout = {
            xaxis: {title: "OTU ID"},
            title: "<b>Values of All OTUs</b>"
        };

        Plotly.newPlot("bubble", bubbleChart, layout);
        
    });

}

// Read in samples.jason with D3 library
d3.json("samples.json").then(function(data) {
    console.log(data);

    var dropdownMenu = d3.select("#selDataset");

    // Create <option> elements for each ID number in "names"
    data.names.forEach(function(name) {
        dropdownMenu.append("option").text(name);
    });
    
    // Use optionChanged function to set default plots
    optionChanged("940");

});