# Attainable
Attainable is an app that allows high school students to input their GPA to see the results of colleges that they can currently apply to, as well as a target GPA which will update the map with the additional results showing how the target GPA would expand their selection.

## MVP List
** Map displaying colleges
** User inputs GPA, filtering results
** Allow for secondary GPA input to show updated results if GPA is attained by the time they apply

## Technologies
* Vanilla JavaScript
* D3.js + HTML5 + CSS3
* Webpack

## Data
* Parse json file which includes university with corresponding GPA, as well as additional information

## Wireframe
<img width="944" alt="Wireframe" src="https://user-images.githubusercontent.com/27509847/66796821-d0806c00-eed6-11e9-8f03-905128ebed5c.png">


## Implementation Timeline

### Day 1
* D3 tutorials
* Determine how to parse json file
* Generate US map skeleton

### Day 2
* Use parsed json to place universities in proper locations on map
* Generate filtering via current GPA
* Generate filtering via target GPA

### Day 3
* Illuminate graphs that are found using filter
* Generate list of filtered colleges to the left of map

## Bonus Features
* Add additional filter options for the results
