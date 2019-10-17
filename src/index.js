var cities = require('./data/cities')
var coords = require('./data/coordinates')

document.addEventListener("DOMContentLoaded", () => {
    cities = cities.default
    let schoolData = []
    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({"schoolName": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"], "city": el["city"], "longitude": currentCity[0]["longitude"], "latitude": currentCity[0]["latitude"]}) : ''
        })


    var width =960,height = 600;
		
    var svg = d3.select("body")
        .append("svg")
      .attr("width",width)
      .attr("height",height);
    
    d3.json("src/data/us.json", function(us) {
        debugger

      var projection = d3.geoAlbersUsa()
        .scale(1200)
        .translate([width/2,height/2]);

       var path = d3.geoPath().projection(projection);
        
      svg.append("g")
        .attr("fill-opacity", 0.4)
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);
        
        var places = [
          [-122.3367534,47.5996582],
          [-80.1942949,25.7645783]
        ]
        
        svg.selectAll(null)
          .data(places)
          .enter()
          .append("circle")
          .attr("r", 3)
          .attr("transform", function(d) {
            return "translate("+projection(d)+")";
          })

        svg.selectAll("circle")
        .data(schoolData)
        .enter()
        .append("circle")
        .attr("transform", function(d) {
            debugger
            return "translate("+projection([d.longitude, d.latitude])+")";
          })
        .attr("r", "8px")
        .attr("fill", "red")   
            
        })
    })
})