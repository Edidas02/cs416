// Load the Housing.csv dataset

let data;
let data2;
d3.csv("Housing.csv").then(dataset => {
  // Convert data types if necessary
  dataset.forEach(d => {
    d.price = +d.price;
    d.area = +d.area;
    d.bedrooms = +d.bedrooms;
    d.year = +d.year;
    d.saleprice = +d.saleprice;
    // Add other conversions as needed for other numeric columns
  });
  data = dataset;

  // Set up parameters
  let currentScene = 1; // Track the current scene
  const scenes = 3; // Total number of scenes

// Function to create Chart 1 - Scatter Plot (Price vs. Area)
function createChart1(data) {
// Function to create Chart 4 - Scatter Plot (Sale Price vs. Year)
  // Clear the previous chart
  d3.select("#chartContainer").html("");

  // Set up the dimensions and margins for the chart
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Set up the scales for x and y axes for both charts
  const xScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, width / 2]);
  const yScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.saleprice)).range([height, 0]);

  const xScale2 = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([width / 2, width]);
  const yScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.income)).range([height, 0]);

  // Create a wrapper <div> to contain both SVG elements
  const chartWrapper = d3.select("#chartContainer").append("div").attr("class", "chart-wrapper");

  // Create the first SVG element for the first chart (Price vs. Area)
  const svg1 = chartWrapper
    .append("svg")
    .attr("width", width / 2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scatter plot for the first chart (Price vs. Area)
  svg1
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale1(d.year))
    .attr("cy", d => yScale1(d.saleprice))
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add x-axis for the first chart (Price vs. Area)
  svg1
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale1));

  // Add y-axis for the first chart (Price vs. Area)
  svg1.append("g").call(d3.axisLeft(yScale1));

  // Add chart title for the first chart (Price vs. Area)
  svg1
    .append("text")
    .attr("x", width / 4)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Scatter Plot: Sale Price Over Time");

  // Create the second SVG element for the second chart (Time vs. Income)
  const svg2 = chartWrapper
    .append("svg")
    .attr("width", width / 2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the scatter plot for the second chart (Time vs. Income)
  svg2
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale2(d.date))
    .attr("cy", d => yScale2(d.income))
    .attr("r", 5)
    .attr("fill", "steelblue");

  // Add x-axis for the second chart (Time vs. Income)
  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale2));

  // Add y-axis for the second chart (Time vs. Income)
  svg2.append("g").call(d3.axisLeft(yScale2));

  // Add chart title for the second chart (Time vs. Income)
  svg2
    .append("text")
    .attr("x", width / 4)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Scatter Plot: Time vs. Income");
}


  // Function to create Chart 2 - Scatter Plot (Price vs. Bedrooms)
function createChart2(data) {
  // Clear the previous chart
  d3.select("#chartContainer").html("");

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
    updateChartTitle("Scatter Plot: Sale Price vs. Year");
  } else if (currentScene === 2) {
    createChart2(data);
    updateChartTitle("Scatter Plot: Price vs. Area");
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
