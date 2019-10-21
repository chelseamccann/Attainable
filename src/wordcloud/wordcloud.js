import { mapData } from '../map/map';
var cities = require('../data/cities.js')

export var wordCloud = function(){

    const schoolData = []
    cities = cities.default

    d3.json("src/data/schoolInfo.json", function(schools){
        schools.map(el => {
            let currentCity = cities.filter(function(cities){return cities.city === el.city})
            el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({
                "schoolName": el["displayName"], 
                "overallRank": el["overallRank"],
                "acceptanceRate": el["acceptance-rate"]}):''
        })

        function draw(words){
            d3.select(".modal-body").append("svg")
            .attr("width", 450)
            .attr("height", 230)
            .append("g")
            .attr("transform", "translate(320, 200)")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", d => { return d.acceptanceRate/5 + "px" })
            // .attr("text-anchor", "middle")
            .style("fill", "blue")
            .attr("transform", (d, i)=> { 
                return "translate(" + [d.x, d.y] + ")rotate(" + i + ")" 
            })
            .text( d => { return d.schoolName })
        }
        
        
        d3.layout.cloud().size([500, 500])
            .words(schoolData)
            .padding(true) // 
            .rotate(0)
            .fontSize(22)
            .on("end", draw)
            .start()

    })
}