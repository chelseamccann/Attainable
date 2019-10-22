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
                "acceptanceRate": el["acceptance-rate"]
            }):''
        })
        // debugger
        let color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        const size = [400, 150]

        function draw(words){
            d3.select(".modal-body").append("svg")
            .attr("width", 425)
            .attr("height", 175)
            .append("g")
            // .attr("transform", "translate(320, 200)")
            .attr("transform", "translate(175, 80)")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .style("font-size", d => { return d['acceptance-rate']/2 + "px" })
            .attr("text-anchor", "middle")
            .attr("transform", (d, i) => { 
                debugger
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")" })
            .text( d => { return d.displayName })
            .style("fill", (d, i) => { return color(i) })
        }
        
        // d3.layout.cloud().text(…)
        d3.layout.cloud().size(size)
            .words(schools)
            .padding(true) // 
            .rotate(0)
            .text(d => { 
                return d.displayName })
            .fontSize(d => { return d['acceptance-rate'] })
            .on("end", draw)
            .start()

    })
}