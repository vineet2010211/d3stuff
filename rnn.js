var w = 2000;
var h = 500; 
background_dataset= [[100,100,100,800]];

// padding on left, right, top, bottom
var lp=10;
var rp=10;
var bp=10;
var up=10;


//Setting up the geometry of the rrn cells
var total_height = background_dataset[0][2] - (up+bp);
//var total_width = background_dataset[0][3] - (lp+rp);


var cell_height = total_height; 
var cell_width = cell_height; 

//Input Prams: calculate no of square that can fit
var n_cells = 8;//Math.floor(total_width/(cell_width+cell_spacing));
var cell_spacing = 35;

//statrt co-ordinate of cells 
var cell_x = background_dataset[0][0]+lp;
var cell_y = background_dataset[0][1]+up;

var cell_params = [];


for(var i=0; i < n_cells; i++){
    var x = {};
    x['x'] = cell_x + i*(cell_width + cell_spacing);
    x['y'] = cell_y; 
    x['h']= cell_height; 
    x['w'] = cell_width; 
    x['color'] = "teal";
    console.log(x);
    cell_params.push(x);
    background_dataset[0][3] = 80+lp+rp+i*(80+35); // key to understand
}
console.log(n_cells);
console.log(cell_params);

//Calculating the background end dimensions

console.log(background_dataset[0][3]);
//Create SVG element- size of the canvas
var svgContainer = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


var background = svgContainer.append("g").attr("id","back-rect");
var rects = background.selectAll("rect")
            .data(background_dataset)
            .enter()
            .append("rect");
var rectAttributes = rects
                        .attr("x",function(d,i){return d[0] ;})
                        .attr("y",function(d){return d[1];})
                        .attr("rx", 10)
                        .attr("ry",10)
                        .attr("width",function(d){return d[3];})
                        .attr("height",function(d){return d[2];})
                        .attr("fill",function(d,i){return "#f0f0f5";});



var cellGroup = svgContainer.append("g")
                            .attr("id","rnn-cells");

var cells = cellGroup.selectAll("rect")
                    .data(cell_params)
                    .enter()
                    .append("rect");

var cell_attrs = cells  
                    .attr("x",function(d){return d["x"]})
                    .attr("y",function(d){return d["y"]})
                    .attr("rx", 10)
                    .attr("ry",10)
                    .attr("width",function(d){return d["w"];})
                    .attr("height",function(d){return d["h"];})
                    .attr("fill",function(d,i){return "#c1c1c1";});

var cell_state = svgContainer.append("g")
                                .attr("id","cell_state");

var cell_state_arrow = cell_state.selectAll("line")
                                    .data(cell_params)
                                    .enter()
                                    .append("line");
var cell_state_attrs = cell_state_arrow
                                    .attr("x1", function(d){return d['x']+d['w']; })
                                    .attr("y1", function(d){return d['y']+d['h']/2; })
                                    .attr("x2", function(d){return d['x']+d['w'] + cell_spacing;})
                                    .attr("y2", function(d){return d['y']+d['h']/2; })
                                    .attr("stroke", "gray")
                                    .attr("marker-end","url(#triangle)" );

/*
//puting points on the canvas/ debugging stuff 
var point = svgContainer.append("g")
                            .attr("id","rnn-cells");
var points = point.selectAll("circle")
                    .data(cell_params)
                    .enter()
                    .append("circle");

var pointsAttr = points.attr("cx",function(d){return d.x;})
                        .attr("cy", function(d){return d.y})
                        .attr("r", function(d){return 5;});
*/
