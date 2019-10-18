export var zoom = function(){

var svg = d3.select("#layout")
 .append("svg")
 .attr("width", "100%") // changes width of view box
 .attr("height", "80%") // changes height of view box
 .call(d3.zoom()
//  .extent([[0,0], [100, 100]]) ??
 .scaleExtent([1,3]) // limits how much you can zoom in
 .on("zoom", function () {
    svg.attr("transform", d3.event.transform)
 }))
 .append("g")
 .attr("id", "zoom")

}