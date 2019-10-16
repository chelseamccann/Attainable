import * as d3 from 'd3'
import style from './styles/index.scss';
var cities = require('./data/cities')
var schoolData = require('./data/schoolInfo')


function myMap(){
    d3.select("svg")
        .append("image")
        .attr("xlink:href", "src/data/usa2.svg")
        .attr("id", "map")
}


// let schoolData = []
// d3.json("src/data/schoolInfo.json", function(data){
//     data.map(el => {
//         //     el["hs-gpa-avg"] !== null ? console.log({"name": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"]}) : '' // 244 with GPA
//     //     // el["hs-gpa-avg"] === null ? console.log(el["displayName"], el["hs-gpa-avg"], el["state"]) : '' // shows colleges that show null gpa avg
//         schoolData.push({[el["displayName"]]: {"gpa": el["hs-gpa-avg"], "state": el["state"]}})
//         el["state"]
//     })
//     console.log(schoolData)
// })


document.addEventListener("DOMContentLoaded", () => {
    myMap();
    
    var albersProjection = d3.geoAlbers()
    .scale(1500)
    .rotate([70, 0])
    .center([90, 0])
    .translate([1500/2, 1500/2]);
    
    var geoPath = d3.geoPath()
    .projection(albersProjection);
    
    var projection = d3.geoMercator().center([0, 5]);

    var svg = d3.select('#map')
    .append('svg')
    .attr('width', 1500)
    .attr('height', 1500);

    var g = svg.append('g');

    g.selectAll('path')
    .data(schoolData.default)
    .enter()
    .append('path')
    .attr('fill', 'red')
    .attr('d', geoPath)

    svg.append("g")
    .selectAll("path")
    .data(cities.default)
    .enter()
    .append("circle", ".pin")
    .attr("r", 5)
    .attr("transform", function(d) {
        debugger
        return "translate(" + albersProjection([
            (d.latitude), 
            (d.longitude)
        ]) + ")";
    })
    .style("fill", "green")
    .style("stroke", "black");

    // svg.selectAll("circle")
    // .data(cities.default)
    // .enter()
    // .append("circle")
    // .attr("transform", function (d) { 
    //     debugger 
    //     return "translate(" + albersProjection([
    //         (d.latitude), 
    //         (d.longitude)
    //     ]) + ")"
    // })
    // .attr("r", "8px")
    // .attr("fill", "red")

})