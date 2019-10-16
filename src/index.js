import style from './styles/index.scss';
var cities = require('./data/cities')
// var schoolData = require('./data/schoolInfo')






document.addEventListener("DOMContentLoaded", () => {
    
    d3.xml('src/data/usa2.svg', function(data){
        document.body.append(data.documentElement)
    })
    

    cities = cities.default
    let schoolData = []
    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({"schoolName": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"], "city": el["city"], "longitude": currentCity[0]["longitude"], "latitude": currentCity[0]["latitude"]}) : ''
        })





    //     var width = 1300;
    //     var height = 800;


    //     var projection = d3.geoAlbers()
    //         .translate([width/2, height/2]) 
    //         .scale([1000])
    //         .center([-100, 50]); 
                   
    //     var svg = d3.select('body')
    //         .append('svg')
    //         .attr('width', width)
    //         .attr('height', height);

    //     svg.selectAll("circle")
    //         .data(schoolData)
    //         .enter()
    //         .append("circle")
    //         .attr("cx", function(d) {
    //         debugger
    //         return projection([d.longitude, d.latitude])[0];
    //     })
    //     .attr("cy", function(d) {
    //         debugger
    //         return projection([d.longitude, d.latitude])[1];
    //     })
    //     .style("fill", "rgb(217,91,67)")	
    //     .style("opacity", 0.85)

    //     var path = d3.geoPath()
    //     .projection(null);

    //     d3.select("svg")
    //     .append("g")
    //     .attr("class", "bubble")
    //     .selectAll("circle")
    //     .data(schoolData)
    //     .enter()
    //     .append("circle")
    //     .attr("transform", function(d) { 
    //         return "translate(" + path.centroid(d) + ")"; 
    //     })
    //     .attr("r", 1.5);
    // })









        var width = 1200,
        height = 720;
    
        var albersProjection = d3.geoAlbers()
        .scale(1000)
        .rotate([70, 0])
        .center([90, 0])
        .translate([5000/2, 5000/2]);
    
        var svg = d3.select('#svg2')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
        var projection = d3.geoMercator()
            .scale(500)
            .center([-100, 55])

    
        svg.selectAll("circle")
        .data(schoolData).enter()
        .append("circle")
        .attr("transform", function(d) {
    
            let coords = albersProjection([ d.longitude, d.latitude ]);
            return `translate(${coords[0]}px, ${coords[1]}px)`
    
        })
        .attr("r", "8px")
        .attr("fill", "red")

        

    })
// })
    
    // .attr("cx", function (d) { return projection(d.latitude); })
    // .attr("cy", function (d) { return projection(d.longitude); })

    // debugger
    // var albersProjection = d3.geoAlbers()
    // .scale(1000)
    // .rotate([70, 0])
    // .center([90, 0])
    // .translate([5000/2, 5000/2]);
    
    // var svg = d3.select('body')
    // .append('svg')
    // .attr('width', 1000)
    // .attr('height', 500);

    // var projection = d3.geoMercator();
    // projection
    //     .scale(1000)
    //     .center([-100, 45])
    
    // var a = [-122.490402, 37.786453];
	// var b = [-122.389809, 37.72728];
	// console.log(projection(a),projection(b));

    // // add circles to svg
    // svg.selectAll("circle")
	// 	.data([a,b]).enter()
	// 	.append("circle")
	// 	.attr("cx", function (d) { return projection(d)[0]; })
	// 	.attr("cy", function (d) { return projection(d)[1]; })
	// 	.attr("r", "8px")
    //     .attr("fill", "red")




})
