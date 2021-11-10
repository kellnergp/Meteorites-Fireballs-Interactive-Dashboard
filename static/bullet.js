const csvPath = "../Resources/fb_altitude.csv";
const url = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/fb_altitude.csv";

const csvPath2 = "../Resources/year.csv";
const url2 = "https://raw.githubusercontent.com/kellnergp/Project-3/main/Resources/year.csv";



function bullet(_year){
    d3.csv(url).then((data)=>{
        console.log(data);


        for (let i=0; i<data.length; i++) {
            var fireballs = data[i];
            if(fireballs.year == _year){
                console.log(fireballs);
                var min = fireballs.Alt_min_km;
                var mean = fireballs.Alt_mean_km;
                var max = fireballs.Alt_max_km;
                var counts = fireballs.fb_count;
                var year = fireballs.year;
            }
            else{

            }
        }    
        
            console.log(min);
            console.log(mean);
            console.log(max);
            console.log(counts);
            console.log(year);

            var bullet1Data = [
                {
                type: "indicator",
                mode: "number+gauge",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                // delta: { reference: 50 },
                value: min,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "<b>Min</b>",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'black'
            },
                },
                bar:{color:'red'}
                }
            ];

         var layout = { height: 250, title:"<b>Fireball Altitude (km)</b>" };
         var config = { responsive: true };
         Plotly.newPlot('bullet1', bullet1Data,  layout, config);

             var bullet2Data = [
                {
                type: "indicator",
                mode: "number+gauge",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                // delta: { reference: 50 },
                value: mean,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "<b>Mean</b>",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'black'
                    },
                },
                bar:{color:"red"}
                }
            ];
        var layout = { height: 250 };
        var config = { responsive: true };
        Plotly.newPlot('bullet2', bullet2Data,  layout, config);                    

            var bullet3Data = [
                {
                type: "indicator",
                mode: "number+gauge",
                gauge: { 
                    shape: "bullet", 
                    axis: {range:[null, 100]},
                    steps: [
                        {range:[0,50], color: "yellow"},
                        {range:[50,100], color:"orange"}
                    ]
                },
                // delta: { reference: 50 },
                value: max,
                domain: { x: [0,1], y: [0, 1] },
                title: { 
                    text: "<b>Max</b>",
                        font: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: 'black'
                    },
                },
                bar:{color:"red"}
                }
            ]; 
        
        var layout = { height: 250 };
        var config = { responsive: true };
        Plotly.newPlot('bullet3', bullet3Data, layout, config);

        var gaugeData = [{
            type: "indicator",
            mode: "gauge+number",
            value: counts,
            title: { 
                text: "<b>Total Number of Fireballs</b>",
                    font: {
                    // family: 'Courier New, monospace',
                    size: 18,
                    color: 'black'
                },
            },
            //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
            gauge: {
              axis: { range: [null, 30], tickwidth: 1, tickcolor: "darkblue" },
              bar: { color: "yellow" },
              bgcolor: "white",
              borderwidth: 2,
              bordercolor: "gray",
              steps: [
                { range: [0,5], color: 'rgb(165,0,38)'},
                { range: [5,10], color: 'rgb(215,48,39)'},
                { range: [10,15], color: 'rgb(244,109,67)'},
                { range: [15,20], color: 'rgb(253,174,97)'},
                { range: [20,25], color: 'rgb(254,224,144)'},
                { range: [25,30], color: 'rgb(224,243,248)'}
             ],
            }
          }];

          var layout = { height: 900, margin:{ t: 50, r: 25, l: 25, b: 25 }, paper_bgcolor: "white", font: { color: "darkblue", family: "Arial" }};
          var config = { responsive: true };
          Plotly.newPlot('gauge', gaugeData, layout, config);
        
    });
}        

function init() {
        

    // let dateDropdown = document.getElementById('date-dropdown');

    // let currentYear = new Date().getFullYear();
    // let earliestYear = 1900;

    // while (currentYear >= earliestYear) {
    //   let dateOption = document.createElement('option');
    //   dateOption.text = currentYear;
    //   dateOption.value = currentYear;
    //   dateDropdown.add(dateOption);
    //   currentYear -= 1;
    // }


    // // call the functions to display the data and the plots to the page
    //     var first_year = currentYear;
    //         bullet(first_year);
    bullet(2021);
       
}
        //function for change in dropdown
// function optionChanged(new_year) {
//         bullet(new_year);
// }

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