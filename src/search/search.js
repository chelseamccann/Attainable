
export var searchColleges = function(){


    // adding text boxes 
    d3.select("body")
    .append("input")
    .attr("type", "text")
    .attr("id", "searchCurrent")
    .attr("placeholder", "Current GPA")

    d3.select("body")
    .append("button")
    .attr("id", "searchCurrentButton")
    .text("Search")

    d3.select("body")
    .append("input")
    .attr("type", "text")
    .attr("id", "searchTarget")
    .attr("placeholder", "Target GPA")

    d3.select("body")
    .append("button")
    .attr("id", "searchTargetButton")
    .text("Search")
    
    // adding listener for current gpa input
    d3.select("#searchCurrentButton").on("click", function(){
        var currentGPA = d3.select("#searchCurrent").node().value;
        var circles = d3.selectAll("circle")
        circles.style("display", function(d){
                return d.gpa <= parseFloat(currentGPA) ? "block" : "none"
            }).attr("fill", function(d){
                return  d.gpa <= parseFloat(currentGPA) ? "maroon" : ""
            })
    })

    // adding listener for target gpa input
    d3.select("#searchTargetButton").on("click", function(){
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
    })

}