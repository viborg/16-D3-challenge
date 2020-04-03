// ************************************************************************
// ** I could not find a D3 circle generator, like the D3.line()
// ** line generator, so I will bind the SVG to data, like we first learned
// ************************************************************************
// **
// ** In the example the x-axis is "In Poverty (%)".  The "poverty" column
// **  in the census data has values that range from 9.1 (NH) to 21.5 (MS).
// **  The example chart shows NH at 5% and MS at 21.5%.  Accounting for data
// **  staleness, the "poverty" column of the census data appears to match the
// **  example chart. 
//
// **  In the example the y-axis is "Lacks Healthcare (%)".  The "healthcare" 
// **  column in the census data has values that range from 4.6 (MA) to 
// **  24.9 (TX).  The example chart shows MA at 5% and TX at 25%.  
// **  Accounting for data staleness, the "Healthcare" column of the census 
// **  data appears to match the example chart. 
// ************************************************************************

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 200
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
// NOTE:  This svg element is added below whatever is already 
// in <body>..</body>
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it 
// to the right and down to adhere to the margins set in the 
// "chartMargin" object.  The "g" SVG element is a container used
// to group other SVG elements.  Transformations applied to the 
// "g" element are performed on all of its child elements.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from path that is relative to the index.html
d3.csv("assets/data/data.csv").then(function(censusData) {

  // Verify the censusData was loaded
  console.log(`censusData: ${censusData[0]}`);

  // Cast the poverty and healthcare values to a number for each 
  // piece (row) of censusData
  censusData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  // Create the time scales for the chart, using D3's scale functions
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, d => d.poverty))
    .range([0, chartWidth]);
  var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(censusData, d => d.healthcare))
    .range([chartHeight, 0]);

  // Create the axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g")
    .call(leftAxis);

  // Add y-axis label  
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "-2em")
    .classed("axis-text", true)
    .text("Lacks healthcare (%)");

  // Add x-axis label
  chartGroup.append("text")             
      .attr("transform",
            "translate(" + (chartWidth/2) + " ," + 
                           (chartHeight + chartMargin.bottom/2 + 10) + ")")
      .style("text-anchor", "middle")
      .text("In poverty (%)");

  // Define a radius, which is used by the circles and the circle text 
  var radius = 15;

  // Add circles to the scatterplot
  var circleGroup = chartGroup.selectAll("circle")
    .data(censusData)   // callback to censusData
    .enter()
    .append("circle")
    .text(d => d.abbr).attr("fill", "red")
    .attr("r", radius)
    .attr("fill", "LightBlue")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare));

  chartGroup.append("g")
    .selectAll('text')
    .data(censusData)   // callback to censusData
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr('font-size',12)
    .attr("dx", -radius/2)
    .attr("dy", radius/2)
    .attr("fill", "red")
    .text(d => d.abbr);

}).catch(function(error) {
  console.log(error);
});
