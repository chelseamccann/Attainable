// import style from './styles/index.scss';

let schoolData = []
d3.json("src/data/schoolInfo.json", function(data){
    data.map(el => {
        //     el["hs-gpa-avg"] !== null ? console.log({"name": el["displayName"], "gpa": el["hs-gpa-avg"], "state": el["state"]}) : '' // 244 with GPA
    //     // el["hs-gpa-avg"] === null ? console.log(el["displayName"], el["hs-gpa-avg"], el["state"]) : '' // shows colleges that show null gpa avg
        schoolData.push({[el["displayName"]]: {"gpa": el["hs-gpa-avg"], "state": el["state"]}})
        // d3.select("body").append("svg").append("")
    })
    console.log(schoolData)
})

// function myMap(){
//     d3.select("svg")
//         .append("image")
//         .attr("xlink:href", "src/data/usa2.svg")
// }

function myMap(){
    d3.select("body")
        .append("img")
        .attr("src", "src/data/usa2.svg")
}

document.addEventListener("DOMContentLoaded", () => {
    // document.getElementById("canvas")
    myMap();
})