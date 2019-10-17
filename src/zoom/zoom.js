export var zoom = function(){

var svg = d3.select("body")
 .append("svg")
 .attr("width", "100%")
 .attr("height", "100%")
 .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 }))
 .append("g")
 .attr("id", "zoom")

}