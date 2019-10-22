var cities = require('../data/cities.js')
var coords = require('../data/coordinates.js')
import { wordCloud } from '../wordcloud/wordcloud';

export var mapData = function(){

    const schoolData = []
    cities = cities.default
    
    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({
                "schoolName": el["displayName"], 
                "gpa": el["hs-gpa-avg"], 
                "state": el["state"], 
                "city": el["city"], 
                "acceptanceRate": el["acceptance-rate"],
                "enrollment": el["enrollment"],
                "isPublic": el["isPublic"],
                "overallRank": el["overallRank"],
                "photo": el["primaryPhotoThumb"],
                "sat": el["sat-avg"],
                "tuition": el["tuition"],
                "longitude": currentCity[0]["longitude"], 
                "latitude": currentCity[0]["latitude"]}) : ''
        })

    var width = 960,
        height = 600;
		
    var svg = d3.select("#zoom")
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

    svg.append("svg:g")
        .attr("fill-opacity", 1)
        .style("fill", "#546683")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    svg.selectAll("circle")
        .data(schoolData)
        .enter()
        .append("svg:circle").attr("fill", "orange")
        .attr("transform", function(d) {
            return "translate("+projection([d.longitude, d.latitude])+")"
          })
        .attr("r", "3px")
        .attr("class", "college")
        .attr("margin", "80px")
        .attr("cursor", "pointer")
        
        .on("mouseover", function(d){
            d3.select(this.parentNode)
            .append("text")
            .style("fill", "#f4f4f4")
            .attr("id", "school-name")
            .attr("transform", function() { return "translate("+projection([d.longitude, d.latitude])+")" })
            .text(function(){ return `${d.schoolName}` })

            // d3.select("#layout").append("div").attr("id", "gpa").text(function(){
            d3.select("h1").append("div").attr("id", "gpa").text(function(){
                return (`  @   ${d.gpa.toFixed(1)}`)
            })
            
        })
        
        
        .on("mouseleave", function(d){
            d3.select("#school-name").remove()
            d3.select("#gpa").remove()
        })
        
        .on("click", (e) => {
            d3.select("#simple-modal").style("display", "block")
            wordCloud(e.schoolName, e.acceptanceRate)
            d3.select(".modal-header").append("text").text(e.schoolName).attr("id", "modal-school").attr("class", "modal-text")
            d3.select(".modal-body").append("div").attr("class", "modal-body-p")
            d3.select(".modal-body-p").append("p").text(`GPA: `).attr("class", "modal-text").append("p").text(e.gpa)
            d3.select(".modal-body-p").append("p").text(`SAT: ${e.sat}`).attr("class", "modal-text")
            d3.select(".modal-body-p").append("p").text(`Acceptance Rate: ${e.acceptanceRate} % `).attr("class", "modal-text")
            d3.select(".modal-body-p").append("p").text(`Enrollment ${e.enrollment.toLocaleString('en')}`).attr("class", "modal-text")
            d3.select(".modal-body-p").append("p").text(`Tuition: $${e.tuition.toLocaleString('en')}`).attr("class", "modal-text")
            // d3.select(".modal-body").append("image").attr("href", e.photo)
        })
            
        })
    })
    
    // module.exports = { schoolData };
}
// d3.select(".modal-body").append("div").attr("class", "modal-body-p")