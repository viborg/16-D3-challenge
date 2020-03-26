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

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from forcepoints.csv
d3.csv("assets/data/data.csv").then(function(censusData) {

  // Print the forceData
  console.log(censusData);

  // get only the needed data
  
  // cast the strings to a number
  censusData.forEach(function(data) {
    data.Abbr = data.Abbr;
    data.Poverty = +data.Poverty;
    data.HealthCare = +data.HealthCare;
  });

  // configure a poverty scale
  var xScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, data => data.Poverty)])
    .range([0, chartHeight]);

    // configure a healthcare scale
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(censusData, data => data.HealthCare)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.date))
    .y(data => yLinearScale(data.force));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(forceData))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});
