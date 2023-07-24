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
    d.affindex = +d.affindex;
    d.afftime = +d.afftime;
    d.furnishingstatus = +d.furnishingstatus
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
  const xScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, width]);
  const yScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.saleprice)).range([height, 0]);

  const xScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.date)).range([0, width]);
  const yScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.income)).range([height, 0]);

  // Create a wrapper <div> to contain both SVG elements
  const chartWrapper = d3.select("#chartContainer").append("div").attr("class", "chart-wrapper");

  // Create the first SVG element for the first chart (Price vs. Area)
  const svg1 = chartWrapper
    .append("svg")
    .attr("width", width + margin.left + margin.right)
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

  svg1
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale1).tickFormat(d3.format("d"))); 

  // Add y-axis for the first chart (Price vs. Area)
  svg1.append("g").call(d3.axisLeft(yScale1));

  // Add chart title for the first chart (Price vs. Area)
  svg1
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Housing Sale Price Over Time");

  // Create the second SVG element for the second chart (Time vs. Income)
  const svg2 = chartWrapper
    .append("svg")
    .attr("width", width + margin.left + margin.right)
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
    .attr("fill", "steelblue")
    .on("mouseover", handleMouseOver) 
    .on("mouseout", handleMouseOut); 

  // Add x-axis for the second chart (Time vs. Income)
  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale2).tickFormat(d3.format("d"))); 

  // Add y-axis for the second chart (Time vs. Income)
  svg2.append("g").call(d3.axisLeft(yScale2));

  // Add chart title for the second chart (Time vs. Income)
  svg2
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Time vs. Income");

    const xloc = width / 4 + 10;
    const yloc = height / 2 - 30;
  
    svg1
      .append("text")
      .attr("x", xloc + 75)
      .attr("y", yloc + 45)
      .text("Positive Correlation")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "12px");
    svg2
      .append("text")
      .attr("x", xloc + 75)
      .attr("y", yloc + 45)
      .text("Positive Correlation")
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "12px");
}


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

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.area))
    .attr("cy", d => yScale(d.price))
    .attr("r", 5)
    .attr("fill", "steelblue")

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
    .text("Price vs. Area");
  svg.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .text("Positive Correlation")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12px");
  
    const dataset = [
      { furnishingstatus: "furnished", count: 140 },
      { furnishingstatus: "semi-furnished", count: 227 },
      { furnishingstatus: "unfurnished", count: 178 },
    ];
  
    // Set up dimensions for the pie chart

    const radius = Math.min(width, height) / 2;
  
    // Create an SVG element for the fifth chart
    const svg3 = d3.select("#chartContainer")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    // Set up the pie generator
    const pie = d3.pie().value(d => d.count);
  
    // Generate the arcs for the pie chart
    const arcs = pie(dataset);
  
    // Set up color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Draw the pie chart slices
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    svg3
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colorScale(d.data.furnishingstatus)) // Set fill color based on category
      .attr("stroke", "white")
      .attr("stroke-width", 2);
  
    // Add chart title for the fifth chart
    svg3.append("text")
      .attr("x", 0)
      .attr("y", 0 - radius - 10)
      .attr("text-anchor", "middle")
      .text("Pie Chart: Furnishing Status");
  
    // Add legend
    const legend = svg3.selectAll(".legend")
      .data(arcs)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius + 20}, ${(i - 1.5) * 20})`);
  
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => colorScale(d.data.furnishingstatus));
  
    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(d => d.data.furnishingstatus)
      .attr("fill", "black"); 

}

function createChart3(data) {
  // Clear the previous chart
  d3.select("#chartContainer").html("");
  console.log("Creating Chart 3");
  console.log(data);

  // Filter out empty values in the data


  // Filter out data points with empty "afftime" or "affindex"
  const filteredData = data.filter(d => !isNaN(d.affindex) && d.afftime);
  console.log(filteredData);
  // Set up the dimensions and margins for the chart
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // Set up the scales for x and y axes
  const xScale = d3.scaleBand()
    .domain(filteredData.map(d => d.afftime))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d.affindex)])
    .range([height, 0]);

  // Create an SVG element for the third chart
  const svg3 = d3.select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Create the bars for the bar chart
  svg3.selectAll(".bar")
    .data(filteredData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.afftime))
    .attr("y", d => yScale(d.affindex))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.affindex))
    .attr("fill", "steelblue")
    .on("mouseover", handleMouseOver) 
    .on("mouseout", handleMouseOut); 

  // Add x-axis to the chart
  svg3.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

  // Add y-axis to the chart
  svg3.append("g")
    .call(d3.axisLeft(yScale));

  // Add chart title for the third chart
  svg3.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Affordability Index Over Time");

  svg3.append("text")
    .attr("x", 850)
    .attr("y", annotationY)
    .text("Affordability Index of 100 represents Median Income equal to Median Sale Price")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12px");
}

// Function to update the scene and chart
function updateScene(sceneNumber) {
  currentScene = sceneNumber;
  if (currentScene === 1) {
    createChart1(data);
  } else if (currentScene === 2) {
    createChart2(data);
  } else if (currentScene === 3) {
    createChart3(data);
  }
}
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function handleMouseOver(event, d) {
  // Get the data value for the tooltip
  const value = d.y || d.affindex || "";

  // Show the tooltip
  tooltip
    .style("opacity", 1)
    .style("left", event.pageX + "px")
    .style("top", event.pageY - 30 + "px")
    .html(`Value: ${value}`);
}
function handleMouseOut() {
  tooltip.style("opacity", 0);
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
