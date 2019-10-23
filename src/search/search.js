import { wordCloud } from '../wordcloud/wordcloud';

export var searchColleges = function(){

    d3.select("nav").append("div").attr("id", "left")
    let boxes = d3.select("#left")
    boxes.append("div").attr("id", "container-one")
    boxes.append("div").attr("id", "container-two")

    d3.select("#container-one").append("button").attr("type", "submit")
    .attr("id", "searchCurrentButton").attr("class", "icon1 current-box").append("i").attr("class", "fa fa-search")

    d3.select("#container-one")
    .append("input")
    .attr("type", "number")
    .attr("id", "searchCurrent")
    .attr("class", "current-box")
    .attr("placeholder", "Current GPA")

    d3.select("#container-two").append("button").attr("type", "submit")
    .attr("id", "searchTargetButton").attr("class", "icon2 target-box").append("i").attr("class", "fa fa-search")

    d3.select("#container-two")
    .append("input")
    .attr("type", "number")
    .attr("id", "searchTarget")
    .attr("class", "target-box")
    .attr("placeholder", "Target GPA")


    // d3.select("#layout").insert("ul", "svg").attr("id", "school-list")
    
    // adding listener for current gpa input
    let inputCurrent = function(){
        // event.preventDefault();
        
        if (d3.select("#school-list-title").node() === null) { 
            d3.select("#layout").append("h1").attr("id", "school-list-title").append("text").text("Schools")
            d3.select("#school-list-title").append("ul").attr("id", "school-list")
        } else {
            d3.select("#school-list-title").append("ul").attr("id", "school-list")
        }

        d3.selectAll(".current").remove()
        d3.selectAll(".target").remove()

        var list = d3.select("#school-list")
        var currentGPA = d3.select("#searchCurrent").node().value;
        var circles = d3.selectAll("circle")

        circles.style("display", function(d){

            return d.gpa <= parseFloat(currentGPA) ? "block" : "none"
        }).attr("fill", function(d){
            return  d.gpa <= parseFloat(currentGPA) ? "maroon" : ""
        }).attr("",function(d){
            if (d.gpa <= parseFloat(currentGPA)){ 

                let c = d3.select(this)

                    list.append("li")
                    .text(d.schoolName)
                    .attr("class", `current`)// ${d.schoolName.split(' ').join('').replace("&", "").replace("'", "")}`)
                    // .attr("id", () => {
                    //     return d.acceptanceRate || 50
                    // })
                    .on("click", () => {
                        d3.select(".modal-header")
                        .append("text")
                        .text(c.node()["__data__"].schoolName)
                        .attr("id", "modal-school")

                        let gpa = c.node()["__data__"].gpa.toFixed(1)
                        let acceptanceRate = c.node()["__data__"].acceptanceRate
                        let enrollment = c.node()["__data__"].enrollment
                        let overallRank = c.node()["__data__"].overallRank
                        let sat = c.node()["__data__"].sat
                        let tuition = c.node()["__data__"].tuition
                        // wordCloud(c.node()["__data__"].schoolName, acceptanceRate, d3.select("#school-list").node().innerText.replace("&", "").replace("'", ""))

                        d3.select(".modal-body").append("div").attr("id", "pp")

                        // d3.select("#pp").append("img").attr("src", "src/data/bob.webp").attr("height", 100).attr("width", 100).attr("id", "bob")
                        wordCloud(c.node()["__data__"].schoolName, acceptanceRate)
                        

                        d3.select("#pp")
                        // .insert("div","svg")
                        .append("div")
                        .attr("class", "modal-body-p")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`GPA: ${gpa}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`SAT: ${sat}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Acceptance Rate: ${acceptanceRate} % `)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Enrollment: ${enrollment.toLocaleString('en')}`)
                        .attr("class", "modal-text")

                        // d3.select(".modal-body-p")
                        // .append("p")
                        // .text(`Overall Rank: ${overallRank}`)
                        // .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Tuition: $${tuition.toLocaleString('en')}`)
                        .attr("class", "modal-text")
                        

                        d3.select("#simple-modal")
                        .style("display", "block")
                    })
        }
    })
    
}
d3.select("#searchCurrentButton").on("click", inputCurrent, false)
// d3.select("#searchCurrent").on("keydown", inputCurrent, false)
d3.select("#searchCurrent").on("keydown", function(e){
    debugger
    if (event.keyCode === 13){
        debugger
        event.preventDefault()
        inputCurrent()
    }
})

    // adding listener for target gpa input
    let inputTarget = function(){
        // event.stopPropagation();
        // debugger
        d3.selectAll(".target").remove()
        // var list = d3.select("#layout").insert("ul", "svg").attr("id", "school-list")
        var currentGPA = d3.select("#searchCurrent").node().value;
        var targetGPA = d3.select("#searchTarget").node().value;
        var circles = d3.selectAll("circle")
        circles.style("display", function(d){
                return d.gpa <= parseFloat(targetGPA) && currentGPA <= targetGPA ? "block" : "none"
            }).attr("fill", function(d){
                if (d3.select(this).style('fill') === "rgb(128, 0, 0)"){ 
                    return "maroon"
                } else if (parseFloat(targetGPA) > parseFloat(currentGPA) && d.gpa <= parseFloat(targetGPA)) {
                    return "yellow"
                } 
            })
            .attr("",function(d){
                if (parseFloat(targetGPA) > parseFloat(currentGPA) && d.gpa <= parseFloat(targetGPA)){ 
                    var c = d3.select(this)
                    d3.select("#school-list")
                    .append("li")
                    .text(d.schoolName)
                    .attr("class", "target")
                    .on("click", () => {

                        d3.select(".modal-header")
                        .append("text")
                        .text(c.node()["__data__"].schoolName)
                        .attr("id", "modal-school")

                        d3.select("#simple-modal")
                        .style("display", "block")

                        let gpa = c.node()["__data__"].gpa.toFixed(1)
                        let acceptanceRate = c.node()["__data__"].acceptanceRate
                        let enrollment = c.node()["__data__"].enrollment
                        let overallRank = c.node()["__data__"].overallRank
                        let sat = c.node()["__data__"].sat
                        let tuition = c.node()["__data__"].tuition

                        d3.select(".modal-body").append("div").attr("id", "pp")

                        // d3.select("#pp").append("img").attr("src", "src/data/bob.webp").attr("height", 100).attr("width", 100).attr("id", "bob")
                        wordCloud(c.node()["__data__"].schoolName, acceptanceRate)

                        d3.select("#pp")
                        // .insert("div","svg")
                        .append("div")
                        .attr("class", "modal-body-p")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`GPA: ${gpa}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Acceptance Rate: ${acceptanceRate}%`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Enrollment: ${enrollment}`)
                        .attr("class", "modal-text")

                        // d3.select(".modal-body-p")
                        // .append("p")
                        // .text(`Overall Rank: ${overallRank}`)
                        // .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`SAT: ${sat}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body-p")
                        .append("p")
                        .text(`Tuition: ${tuition}`)
                        .attr("class", "modal-text")

                        d3.select("#simple-modal")
                        .style("display", "block")
                    })
                }
            })
    }

    d3.select("#searchTargetButton").on("click", inputTarget, false)
    // d3.select("#searchTarget").on("keydown", inputTarget, false)
    d3.select("#searchTarget").on("keydown", function(e){
        debugger
        if (event.keyCode === 13){
            debugger
            event.preventDefault()
            inputTarget()
        }
    })

}