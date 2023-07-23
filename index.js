d3.csv("Housing.csv").then(data => {
    data.forEach(d => {
      d.price = +d.price;
      d.area = +d.area;
      d.bedrooms = +d.bedrooms;
    });
  
    let currentScene = 1; // Track the current scene
    const scenes = 3; // Total number of scenes
  
    // Function to create Chart 1 - Scatter Plot (Price vs. Area)
    function createChart1() {
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
  
    // Function to create Chart 2 - Bar Chart (Bedrooms Count)
    function createChart2() {
      // Clear the previous chart
      d3.select("#chartContainer2").html("");
    
      // Set up the dimensions and margins for the chart
      const margin = { top: 20, right: 20, bottom: 50, left: 70 };
      const width = 500 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
    
      // Create an SVG element
      const svg = d3
        .select("#chartContainer2")
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
    function createChart3() {
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
        .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
      // Prepare the data for the pie chart (furnishing status)
      const furnishingCounts = d3.rollup(data, v => v.length, d => d.furnishingstatus);
      const pieData = Array.from(furnishingCounts, d => ({ name: d[0], value: d[1] }));
  
      // Set up the pie generator
      const pie = d3.pie().value(d => d.value);
  
      // Set up the arc generator
      const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2 - 20);
  
      // Create the pie chart slices
      const slices = svg
        .selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i]);
  
      // Add chart title
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .text("Pie Chart: Furnishing Status");
  
      // Add data labels
      svg
        .selectAll("text.label")
        .data(pie(pieData))
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.name);
    }
  
    // Function to update the scene and chart
    function updateScene(sceneNumber) {
      currentScene = sceneNumber;
      // Call the appropriate function to create the chart based on the scene number
      if (currentScene === 1) {
        createChart1();
      } else if (currentScene === 2) {
        createChart2();
      } else if (currentScene === 3) {
        createChart3();
      }
    }
  
    // Initial chart creation (default to Chart 1)
    updateScene(1);
  
// Event listeners for the buttons
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
  