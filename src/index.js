import { mapData } from './map/map.js'
import { searchColleges } from './search/search.js'
import { zoom } from './zoom/zoom.js'

document.addEventListener("DOMContentLoaded", () => {

    d3.select("body")
    .append("h1")
    .text( "Attainable")

    searchColleges()
    zoom()
    mapData()
})