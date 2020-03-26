// ************************************************************************
// ** I could not find a D3 circle generator, like the D3.line()
// ** line generator so I will bind the SVG to data, like we first learned
// ************************************************************************

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select article class, append SVG area to it, and set its dimensions
var svg = d3.select(".article")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var circles = svg.selectAll("circle");

var rValues = [40, 25, 10];

circles.data(rValues)
    .enter()
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 50)
    .attr("stroke", "white")
    .attr("stroke-width", "5")
    // .attr("fill", "LightSteelBlue")
    // .attr("fill", "PowderBlue");
    .attr("fill", "LightBlue");
    
