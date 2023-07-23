// Load the Housing.csv dataset

let data;
d3.csv("Housing.csv").then(dataset => {
  // Convert data types if necessary
  dataset.forEach(d => {
    d.price = +d.price;
    d.area = +d.area;
    d.bedrooms = +d.bedrooms;
    // Add other conversions as needed for other numeric columns
  });
  data = dataset;


  // Set up parameters
  let currentScene = 1; // Track the current scene
  const scenes = 3; // Total number of scenes

  // Function to create Chart 1 - Scatter Plot (Price vs. Area)
// Function to create Chart 1 - Scatter Plot (Price vs. Area)
function createChart1(data) {
  d3.select("#chartContainer1").html("");

  // Set up the dimensions and margins for the chart
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create an SVG element
  const svg = d3
    .select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Set up the scales for x and y axes
  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.area)).range([0, width]);
  const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.price)).range([height, 0]);

  // Create the scatter plot
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.area))
    .attr("cy", d => yScale(d.price))
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Add chart title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Scatter Plot: Price vs. Area");
}

  // Function to create Chart 2 - Bar Chart (Bedrooms Count)
  // Function to create Chart 2 - Scatter Plot (Price vs. Bedrooms)
function createChart2(data) {
  // Clear the previous chart
  d3.select("#chartContainer").html("");
  console.log("Creating chart2");

  // Set up the dimensions and margins for the chart
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Create an SVG element
  const svg = d3
    .select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Set up the scales for x and y axes
  const xScale = d3.scaleLinear().domain(d3.extent(data, d => d.bedrooms)).range([0, width]);
  const yScale = d3.scaleLinear().domain(d3.extent(data, d => d.price)).range([height, 0]);

  // Create the scatter plot
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.bedrooms))
    .attr("cy", d => yScale(d.price))
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Add chart title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Scatter Plot: Price vs. Bedrooms");
}


  // Function to create Chart 3 - Pie Chart (Furnishing Status)
 // Function to create Chart 3 - Pie Chart (Furnishing Status)
function createChart3(data) {
  // Clear the previous chart
  d3.select("#chartContainer").html("");

  // Prepare data for the pie chart
  const furnishingStatusData = d3.rollups(
    data,
    v => v.length,
    d => d.furnishingstatus
  );

  // Set up dimensions for the pie chart
  const width = 500;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  // Create an SVG element
  const svg = d3
    .select("#chartContainer")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Set up the pie generator
  const pie = d3.pie().value(d => d[1]);

  // Generate the arcs for the pie chart
  const arcs = pie(furnishingStatusData);

  // Set up color scale
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Draw the pie chart slices
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  svg
    .selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i));

  // Add chart title
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", 0 - radius - 10)
    .attr("text-anchor", "middle")
    .text("Pie Chart: Furnishing Status");
}
function updateChartTitle(title) {
  // Clear the previous chart title
  d3.select("#chartContainer").select(".chart-title").html("");

  // Append the new chart title
  d3.select("#chartContainer")
    .select(".chart-title")
    .style("text-align", "center")
    .style("font-size", "18px")
    .text(title);
}
// Function to update the scene and chart
function updateScene(sceneNumber) {
  currentScene = sceneNumber;
  if (currentScene === 1) {
    createChart1(data);
    updateChartTitle("Scatter Plot: Price vs. Area");
  } else if (currentScene === 2) {
    createChart2(data);
    updateChartTitle("Scatter Plot: Price vs. Bedrooms");
  } else if (currentScene === 3) {
    createChart3(data);
    updateChartTitle("Pie Chart: Furnishing Status");
  }
}


  // Initial chart creation (default to Chart 1)
  updateScene(1);

d3.select("#chart1Btn").on("click", function () {
  updateScene(1);
});

d3.select("#chart2Btn").on("click", function () {
  updateScene(2);
});

d3.select("#chart3Btn").on("click", function () {
  updateScene(3);
});

});
