import style from './styles/index.scss';
import { mapData } from './map/map.js'
import { searchColleges } from './search/search.js'
import { zoom } from './zoom/zoom.js'
import { modal } from './modal/modal';

document.addEventListener("DOMContentLoaded", () => {
    modal()
    zoom()
    mapData()
    searchColleges()
})