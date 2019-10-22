import style from './styles/index.scss';
import { mapData } from './map/map.js';
import { searchColleges } from './search/search.js';
import { zoom } from './zoom/zoom.js';
import { modal } from './modal/modal';
import { wordCloud } from './wordcloud/wordcloud';
import { instrux } from './instrux/instrux';

document.addEventListener("DOMContentLoaded", () => {
  instrux()
  zoom()
  mapData()
  searchColleges()
  modal()
})