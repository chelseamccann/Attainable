var cities = require('../data/cities.js')
var coords = require('../data/coordinates.js')


export var mapData = function(){

    d3.select("body")
    .append("h1")
    .text( "Attainable")
    

    cities = cities.default
    let schoolData = []
    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({"schoolName": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"], "city": el["city"], "longitude": currentCity[0]["longitude"], "latitude": currentCity[0]["latitude"]}) : ''
        })


    var width = 960,
        height = 600;
		
    var svg = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);
    
    d3.json("src/data/us.json", function(us) {

    var projection = d3.geoAlbersUsa()
        .scale(1200)
        .translate([width/2,height/2]);

    var path = d3.geoPath().projection(projection);

    // var radius = d3.scaleSqrt()
    // .domain([0, 1e1])
    // .range([0, 4]);

    svg.append("g")
        .attr("fill-opacity", 0.4)
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    svg.selectAll("circle")
        .data(schoolData)
        .enter()
        .append("circle")
        .attr("transform", function(d) {
            return "translate("+projection([d.longitude, d.latitude])+")";
          })
        .attr("r", "3px")
        .attr("class", "college")
        .append("title").text(function(d){
            return d.schoolName
        })
        .attr("fill", "green")   
            
        })
    })
}