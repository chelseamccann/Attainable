var cities = require('./data/cities')
var coords = require('./data/coordinates')

document.addEventListener("DOMContentLoaded", () => {

    // loads svg map
    d3.xml('src/data/usa2.svg', function(data){
        document.body.append(data.documentElement)
    })
    
    // adjusts data to include coordinates for each city
    cities = cities.default
    let schoolData = []
    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({"schoolName": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"], "city": el["city"], "longitude": currentCity[0]["longitude"], "latitude": currentCity[0]["latitude"]}) : ''
        })
        

    var width = 1200,
        height = 720;

    var albersProjection = d3.geoAlbers()
        .scale(1000)
        .rotate([70, 0])
        .center([-15, 35])
        .translate([width/2, height/2]);
    
    var svg = d3.select('svg')
    
    svg.selectAll("circle")
    .data(schoolData)
    .enter()
    .append("circle")
    .attr("transform", function(d) {
        let coords = albersProjection([ d.longitude, d.latitude ]);
        debugger
        return `translate(${coords[0]}, ${coords[1]})`

    })
    .attr("r", "8px")
    .attr("fill", "red")   


    
    // var projection = d3.geoMercator()
    //     .center([-100, 50])    
    //     .scale(1020) 
    //     .translate([ width/2, height/2 ])

    // svg.append("g")
    //     .selectAll("path")
    //     .data(schoolData)
    //     .enter()
    //     .append("path")
    //         .attr("fill", "#b8b8b8")
    //         .attr("d", d3.geoPath()
    //             .projection(projection)
    //         )
    //     .style("stroke", "black")
    //     .style("opacity", .3)
    

    })

})









    // d3.queue(2)
    // .defer(d3.xml, 'src/data/usa2.svg')
    // .defer(d3.json, "src/data/schoolInfo.json")
    // .await((error, usData, schoolsData) => {
    //     let schoolData = []
    //     schoolsData.map(el => {
    //         let currentCity = cities.default.filter(function(cities){return cities.city === el.city})
    //         el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({"schoolName": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"], "city": el["city"], "longitude": currentCity[0]["longitude"], "latitude": currentCity[0]["latitude"]}) : ''
    //     })

    //     var width = 1200,
    //     height = 720;
    
    //     var albersProjection = d3.geoAlbers()
    //     .scale(1000)
    //     .rotate([70, 0])
    //     .center([90, 0])
    //     .translate([5000/2, 5000/2]);
    
    //     var svg = d3.select('#svg2')
    //     .append('svg')
    //     .attr('width', width)
    //     .attr('height', height);
    
    //     // var projection = d3.geoMercator()
    //     //     .scale(500)
    //     //     .center([-100, 55])

    
    //     svg.selectAll("circle")
    //     .data(schoolData).enter()
    //     .append("circle")
    //     .attr("transform", function(d) {
    
    //         let coords = albersProjection([ d.longitude, d.latitude ]);
    //         return `translate(${coords[0]}px, ${coords[1]}px)`
    
    //     })
    //     .attr("r", "8px")
    //     .attr("fill", "red")

    //     document.body.append(usData.documentElement)
    // })


