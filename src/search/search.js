
export var searchColleges = function(){

    d3.select("button").on("click", function(){
        var gpa = d3.select("#search").node().value;
        var circles = d3.selectAll("circle")
        circles.style("display", function(d){
                debugger
                return d.gpa <= parseFloat(gpa) ? "block" : "none"
            })
    })

    function search(e){
        search = e.value
        document.querySelectorAll("college").forEach(function(college){
            gpa = college.innerText
            debugger
            if (gpa.match(search)){
                college.style.display="block"
            } else {
                college.style.display="none"
            }
        })
        d3.select("body")
        .attr("onkeyup", search(this))
    }



}