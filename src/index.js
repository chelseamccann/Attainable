import style from './styles/index.scss';
import { mapData } from './map/map.js'
import { searchColleges } from './search/search.js'
import { zoom } from './zoom/zoom.js'

document.addEventListener("DOMContentLoaded", () => {

    searchColleges()
    zoom()
    mapData()
})