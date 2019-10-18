
export var searchColleges = function(){


    // adding text boxes 

    d3.select("#layout")
    .append("div")
    .attr("id", "searches")

    d3.select("#searches")
    .append("input")
    .attr("type", "text")
    .attr("id", "searchCurrent")
    .attr("class", "current-box")
    .attr("placeholder", "Current GPA")

    d3.select("#searches")
    .append("button")
    .attr("id", "searchCurrentButton")
    .attr("class", "current-box")
    .text("Search")

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
    .text("Search")

    
    // adding listener for current gpa input
    d3.select("#searchCurrentButton").on("click", function(){
        d3.selectAll(".current").remove()
        var list = d3.select("#layout").insert("ul", "svg").attr("id", "school-list")
        var currentGPA = d3.select("#searchCurrent").node().value;
        var circles = d3.selectAll("circle")

        circles.style("display", function(d){
                return d.gpa <= parseFloat(currentGPA) ? "block" : "none"
            }).attr("fill", function(d){
                return  d.gpa <= parseFloat(currentGPA) ? "maroon" : ""
            }).attr("",function(d){
                if (d.gpa <= parseFloat(currentGPA)){ 
                    list.append("li")
                    .text(d.schoolName)
                    .attr("class", "current")
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
                    d3.select("#school-list")
                    .append("li")
                    .text(d.schoolName)
                    .attr("class", "target")
                }
            })
    })

}