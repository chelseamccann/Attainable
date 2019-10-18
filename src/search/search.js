

export var searchColleges = function(){


    // adding text boxes 

    d3.select("#layout")
    .append("div")
    .attr("id", "left")

    d3.select("#left")
    .append("div")
    .attr("id", "searches-parent")
    .append("div")
    .attr("id", "searches")


    d3.select("#searches")
    .append("input")
    .attr("type", "text")
    .attr("id", "searchCurrent")
    .attr("class", "current-box")
    .attr("placeholder", "Current GPA")

    // d3.select("#searches")
    // .append("i")
    // .attr("class", "fa fa-search")

    d3.select("#searches")
    .append("button")
    .attr("type", "submit")
    .attr("id", "searchCurrentButton")
    .attr("class", "current-box")
    .append("i")
    .attr("class", "fa fa-search")

    d3.select("#searches")
    .append("input")
    .attr("type", "text")
    .attr("id", "searchTarget")
    .attr("class", "target-box")
    .attr("placeholder", "Target GPA")

    d3.select("#searches")
    .append("button")
    .attr("id", "searchTargetButton")
    .attr("class", "target-box")

    // d3.select("#layout").insert("ul", "svg").attr("id", "school-list")
    d3.select("#left").append("ul").attr("id", "school-list")
    
    // adding listener for current gpa input
    d3.select("#searchCurrentButton").on("click", function(){
        d3.selectAll(".current").remove()

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
                    .attr("class", "current")
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


                        d3.select(".modal-body")
                        .append("p")
                        .text(`GPA: ${gpa}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body")
                        .append("p")
                        .text(`Acceptance Rate: ${acceptanceRate}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body")
                        .append("p")
                        .text(`Enrollment: ${enrollment}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body")
                        .append("p")
                        .text(`Overall Rank: ${overallRank}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body")
                        .append("p")
                        .text(`SAT: ${sat}`)
                        .attr("class", "modal-text")

                        d3.select(".modal-body")
                        .append("p")
                        .text(`Tuition: ${tuition}`)
                        .attr("class", "modal-text")

                        d3.select("#simple-modal")
                        .style("display", "block")
                    })
        }
    })

    })

    // adding listener for target gpa input
    d3.select("#searchTargetButton").on("click", function(){
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
                    })
                }
            })
    })

}