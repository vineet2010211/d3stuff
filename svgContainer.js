var w = 200; 
var h = 200;

var circleData = [
    {"cx":20, "cy":20, "radius": 20, "color":"green"},
    {"cx":70, "cy":70, "radius":20, "color":"purple"}];

var rectData = [
    {"rx":110, "ry":110, "height":30, "width":30, "color":"blue"},
    {"rx":160, "ry": 160, "height":30, "width":30, "color":"red"}];

//Defining the svg container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width",w)
                                    .attr("height",h);

//defining circle group to which all the circles will be attached
var circleGroup = svgContainer.append("g")
                                .attr("id","circles")
                                .attr("transform", "translate(80,0)");

var circles = circleGroup.selectAll("cirlce")
                            .data(circleData)
                            .enter()
                            .append("circle");

var circleAttributes = circles
                        .attr("cx",function(d){return d.cx;})
                        .attr("cy", function(d){return d.cy;})
                        .attr("r", function(d){return d.radius;})
                        .style("fill", function(d){return d.color;});


//defining rect group to which all the rects will be attached 
var rectGroup = svgContainer.append("g");

var rectangles = rectGroup.selectAll("rect")
                            .data(rectData)
                            .enter()
                            .append("rect");


var rectAttributes = rectangles
                        .attr("x",function(d){return d.rx;})
                        .attr("y", function(d){return d.ry;})
                        .attr("height", function(d){return d.height;})
                        .attr("width", function(d){return d.width;})
                        .style("fill", function(d){return d.color;});
