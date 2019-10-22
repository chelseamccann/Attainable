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

        let color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        const w = 400,
        h = 350

        function draw(schoolData){
            d3.select(".modal-body")
            .insert("svg", "#dog")
            .attr("id", "wordcloud")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w/2.8 + "," + h/2.2 + ")")
            .selectAll("text")
            .data(schoolData)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("transform", (d, i) => { 
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")" })
                .style("fill", (d, i) => { 
                    if (d.current){
                        return "#002664"
                    } else {
                        return color(i) 
                    }
                })
            .style("font-size", function(d) { 
                debugger
                if (d.acceptanceRate === null){
                    return "6px"
                } else {
                    return d.acceptanceRate/3 + "px"; 
                }
            })
            .text( d => { return d.schoolName })
        }
        

        d3.layout.cloud()
            .size([w, h])
            .words(schoolData)
            .padding(true) 
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            // .text(schoolData)
            .fontSize(d => { return d.acceptanceRate })
            .on("end", draw)
            .start()
    })
    
}