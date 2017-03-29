var w = 1000;
var h = 500; 

//Data 
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * xRange);
    var newNumber2 = Math.floor(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

//Create SVG element- size of the canvas
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)

//Scaling the input tot he whole canvas
var padding = 30;
var xScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     .range([padding, w-padding * 2]);
var xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(5);

var yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([h - padding, padding]);

var yAxis = d3.axisRight()
            .scale(yScale)
            .ticks(5);



var rScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, function(d){return d[1];})])
                .range([2,5]);
var circles = svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx",function(d){return xScale(d[0]);})
                .attr("cy",function(d){return yScale(d[1]);})
                .attr("r", function(d){return rScale(d[1]);})
                .attr("fill",function(d){return "rgb("+ d[0]+d[1] -100 +","+ (d[1])+ ", "+ (d[0]) + ")"});;

/*
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){return d[0] + ',' + d[1];})
    .attr("x",function(d,i){ return xScale(d[0]);})
    .attr("y",function(d,i){ return yScale(d[1]);})
    .attr("font-family","sans-serif")
    .attr("font-size","11px")
    .attr("fill", "red");
*/

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

svg.append("g")
        .attr("class","axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

d3.select("p")
    .on("click",function(){
    
     svg.selectAll("circle")
           .data(dataset)
           .transition()
           .duration(1000)
           .each("start", function() {      // <-- Executes at start of transition
               d3.select(this)
                 .attr("fill", "magenta")
                 .attr("r", 3);
           })
           .attr("cx", function(d) {
                return xScale(d[0]);
           })
           .attr("cy", function(d) {
                return yScale(d[1]);
           })
           .each("end", function() {        // <-- Executes at end of transition
               d3.select(this)
                 .attr("fill", "black")
                 .attr("r", 2);
   });
    
        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);

        //Update y-axis
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);
    
    });
