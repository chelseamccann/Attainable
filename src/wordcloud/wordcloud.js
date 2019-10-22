import { mapData } from '../map/map';
var cities = require('../data/cities.js')


export var wordCloud = function(schoolName, acceptanceRate){
    // debugger
    // let schoolData = [{"schoolName": schoolName, "acceptanceRate": acceptanceRate, "current": true}]
    // let list = schoolList.split("\n")
    // let idx = 1
    // while (schoolData.length < 10 || schoolData.length !== list.length){
    //     // list.forEach((school) => {

    //     debugger
    //         let classz = list[idx].split(' ').join('').replace("&", "").replace("'", "")
            
    //         debugger
    //     schoolData.push({"schoolName": list[idx], 
    //                 "acceptanceRate": d3.select(`.${classz}`).node().id, 
    //                 "current": false
    //             })
    //             idx += 1 
    //         }
    
    // debugger

    d3.json("src/data/schoolInfo.json", function(schools){
        let schoolData = [{"schoolName": schoolName, "acceptanceRate": acceptanceRate, "current": true}]
        // schools.map(el => {
        //     el["hs-gpa-avg"] !== null ? schoolData.push({
        //         "schoolName": el["displayName"], 
        //         "overallRank": el["overallRank"],
        //         "acceptanceRate": el["acceptance-rate"]
        //     }):''
        // })

        let i = 0;
        while (schoolData.length < 10){
            schools[i]["hs-gpa-avg"] !== null ? schoolData.push({
                "schoolName": schools[i]["displayName"], 
                "acceptanceRate": schools[i]["acceptance-rate"], 
                "current": false
            }):''
            i += 1
        }
        debugger
        let color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        const w = 300,
        h = 500
debugger
        function draw(schoolData){
            debugger
            d3.select(".modal-body")
            // .append("svg")
            .insert("svg", "div")
            .attr("id", "wordcloud")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w/2.3 + "," + h/2.5 + ")")
            .selectAll("text")
            .data(schoolData)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("transform", (d, i) => { 
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")" })
            .text( d => { 
                debugger 
                return d.schoolName
            })
            .style("fill", (d, i) => { 
                debugger
                if (d.current){
                    return "blue"
                } else {
                return color(i) 
                }
            })
            .style("font-size", function(d) { return (d.acceptanceRate/20) + "vh"; })
        }
        

        d3.layout.cloud()
            .size([w, h])
            .words(schoolData)
            // .padding(true) // 
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            // .text(schoolData)
            .fontSize(d => { return d.acceptanceRate })
            .on("end", draw)
            .start()
    })
    
}