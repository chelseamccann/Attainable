# Attainable
Attainable is an app that allows high school students to input their current GPA and view the potential colleges on a map that they can gain admission to. The student can also input a target GPA, which will update the map to show the additional colleges that they could reach for if they bring their GPA up to the target number. The results will show on both a map and in a list, whereas there will also be additional filters that can be applied on these results.

## Functionality & MVP
With the Attainable application, users will be able to:
* Input a students current GPA
* View the potential colleges based on this number
* Allow for secondary target GPA input to show updated results if GPA is attained by the time they apply
In addition, this project will include:
* A production README

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
