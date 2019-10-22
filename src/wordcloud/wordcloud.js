import { mapData } from '../map/map';
var cities = require('../data/cities.js')


export var wordCloud = function(){

    const schoolData = []
    cities = cities.default

    d3.json("src/data/schoolInfo.json", function(schools){
        // schools.map(el => {
        //     let currentCity = cities.filter(function(cities){return cities.city === el.city})
        //     el["hs-gpa-avg"] !== null && currentCity.length > 0 ? schoolData.push({
        //         "schoolName": el["displayName"], 
        //         "overallRank": el["overallRank"],
        //         "acceptanceRate": el["acceptance-rate"]
        //     }):''
        // })

        let i = 0;
        while (schoolData.length < 10){
            schools[i]["hs-gpa-avg"] !== null ? schoolData.push({
                "schoolName": schools[i]["displayName"], 
                "acceptanceRate": schools[i]["acceptance-rate"]
            }):''
            i += 1
        }
        debugger
        let color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        const w = 500,
        h = 300

        function draw(words){
            d3.select(".modal-body").append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            // .attr("transform", "translate(320, 200)")
            .attr("transform", "translate(" + w/2 + "," + h/2 + ")")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            // .style("font-size", d => { return d['acceptanceRate']/10 + "px" })
            .attr("text-anchor", "middle")
            .attr("transform", (d, i) => { 
                debugger
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")" })
            .text( d => { return d.schoolName })
            .style("fill", (d, i) => { return color(i) })
            .style("font-size", function(d) { return (d.acceptanceRate/10) + "vh"; })
        }
        
        // d3.layout.cloud().text(…)
        d3.layout.cloud().size([w, h])
            .words(schoolData)
            .padding(true) // 
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .text(d => { return d.schoolName })
            .fontSize(d => { return d.acceptanceRate })
            .on("end", draw)
            .start()

    })
}