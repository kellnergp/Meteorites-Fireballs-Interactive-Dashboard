const csvPath = "../Resources/fb_altitude.csv";
const url = "https://raw.githubusercontent.com/kellnergp/Project-3/main/HTML%20Work/Resources/fb_altitude.csv";

const csvPath2 = "../Resources/year.csv";
const url2 = "https://raw.githubusercontent.com/kellnergp/Project-3/main/HTML%20Work/Resources/year.csv";



function bullet(_year){
    d3.csv(url).then((data)=>{
        console.log(data);


        for (let i=0; i<data.length; i++) {
                var fireballs = data[i];
                console.log(fireballs);

                
                 var min = fireballs.Alt_min_km;
                 var mean = fireballs.Alt_mean_km;
                 var max = fireballs.Alt_max_km;
                 var year = fireballs.year;
               
           
        }    
        
            
            console.log(min);
            console.log(mean);
            console.log(max);
            console.log(year);

            var bullet1Data = [
                {
                type: "indicator",
                mode: "number+gauge+delta",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                delta: { reference: 50 },
                value: min,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "Min",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'red'
            },
                },
                bar:{color:'red'}
                }
            ];

         var layout = { width: 900, height: 250 };
         var config = { responsive: true };
         Plotly.newPlot('bullet1', bullet1Data,  layout, config);

             var bullet2Data = [
                {
                type: "indicator",
                mode: "number+gauge+delta",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                delta: { reference: 50 },
                value: mean,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "Mean",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'red'
                    },
                },
                bar:{color:"red"}
                }
            ];
        var layout = { width: 900, height: 250 };
        var config = { responsive: true };
        Plotly.newPlot('bullet2', bullet2Data,  layout, config);                    

            var bullet3Data = [
                {
                type: "indicator",
                mode: "number+gauge+delta",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                delta: { reference: 50 },
                value: max,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "Max",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'red'
                    },
                },
                bar:{color:"red"}
                }
            ]; 
        
        var layout = { width: 900, height: 250 };
        var config = { responsive: true };
        Plotly.newPlot('bullet3', bullet3Data, layout, config);
        
    });
}        

function init() {
        

    let dateDropdown = document.getElementById('date-dropdown');

    let currentYear = new Date().getFullYear();
    let earliestYear = 1900;

    while (currentYear >= earliestYear) {
      let dateOption = document.createElement('option');
      dateOption.text = currentYear;
      dateOption.value = currentYear;
      dateDropdown.add(dateOption);
      currentYear -= 1;
    }


    // call the functions to display the data and the plots to the page
        var first_year = currentYear;
            bullet(first_year);
       
}
        //function for change in dropdown
function optionChanged(new_year) {
        bullet(new_year);
}

init();
//function init() {


//     //function for dropdown
      
//     var dropdown = d3.select("#selDataset");
      
//     d3.csv(url).then((data)=>{
//         console.log(data);
//         var year_id = data.year;
            
//             years.forEach((year) => {
//                 dropdown
//                     .append("option")
//                     .text(year)
//                     .property("value", year);
//             });       
           
    
            
//             // call the functions to display the data and the plots to the page
//             var firstyear = year_id[0];
//                 bullet(firstyear);
//         }
                
//     });    
    
// }    
      
//    //function for change in dropdown
// function optionChanged(newyear) {
//     bullet(newyear);

      
      //initailize dashboard
//init();