
let data;
let data2;


d3.csv("Housing.csv").then(dataset => {
  dataset.forEach(d => {
    d.price = +d.price;
    d.area = +d.area;
    d.bedrooms = +d.bedrooms;
    d.year = +d.year;
    d.saleprice = +d.saleprice;
    d.affindex = +d.affindex;
    d.afftime = +d.afftime;
    d.furnishingstatus = +d.furnishingstatus
  });
  data = dataset;

  let currentScene = 1; 
  const scenes = 3; 

function createChart1(data) {
  d3.select("#chartContainer").html("");

  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, width]);
  const yScale1 = d3.scaleLinear().domain(d3.extent(data, d => d.saleprice)).range([height, 0]);

  const xScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.date)).range([0, width]);
  const yScale2 = d3.scaleLinear().domain(d3.extent(data, d => d.income)).range([height, 0]);

  const chartWrapper = d3.select("#chartContainer").append("div").attr("class", "chart-wrapper");

  const svg1 = chartWrapper
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

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

  svg1.append("g").call(d3.axisLeft(yScale1));

  svg1
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Housing Sale Price Over Time");

  const svg2 = chartWrapper
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg2
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale2(d.date))
    .attr("cy", d => yScale2(d.income))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .on("mouseover", handleMouseOver);

  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale2).tickFormat(d3.format("d"))); 

  svg2.append("g").call(d3.axisLeft(yScale2));

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

  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


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

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Price vs. Area");
  svg.append("text")
    .attr("x", 50)
    .attr("y", 75)
    .text("Positive Correlation")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12px");
  
    const dataset = [
      { furnishingstatus: "furnished", count: 140 },
      { furnishingstatus: "semi-furnished", count: 227 },
      { furnishingstatus: "unfurnished", count: 178 },
    ];
  

    const radius = Math.min(width, height) / 2;
  
    const svg3 = d3.select("#chartContainer")
      .append("svg")
      .attr("width", 800)
      .attr("height", 400)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const pie = d3.pie().value(d => d.count);
  
    const arcs = pie(dataset);
  
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    svg3
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colorScale(d.data.furnishingstatus)) 
      .attr("stroke", "white")
      .attr("stroke-width", 2);
  
    svg3.append("text")
      .attr("x", 0)
      .attr("y", 180)
      .attr("text-anchor", "middle")
      .text("Furnishing Status");
  
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
  d3.select("#chartContainer").html("");
  console.log("Creating Chart 3");
  console.log(data);



  const filteredData = data.filter(d => !isNaN(d.affindex) && d.afftime);
  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .domain(filteredData.map(d => d.afftime))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d.affindex)])
    .range([height, 0]);

  const svg3 = d3.select("#chartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = svg3.append("g").attr("class", "tooltip").style("display", "none");

tooltip.append("rect")
  .attr("width", 150)
  .attr("height", 50)
  .attr("fill", "white")
  .attr("stroke", "black")
  .attr("rx", 5)
  .attr("ry", 5);

const tooltipText = tooltip.append("text")
  .attr("x", 10)
  .attr("y", 25);

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
    .on("click", function(d) {
      const [mouseX, mouseY] = d3.mouse(this); 
      tooltipText.text(`This is ${d.affindex > 130 ? "affordable" : "not affordable"} for most`)
        .attr("x",mouseX)
        .attr("y", mouseY - 10) 
        .style("display", "block");
    })
    .on("mouseout", function() {
      tooltip.style("display", "none");
      handleMouseOut;
    });

  svg3.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end");

  svg3.append("g")
    .call(d3.axisLeft(yScale));

  svg3.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Affordability Index Over Time");

  svg3.append("text")
    .attr("x", 25)
    .attr("y", 50)
    .text("100 Index represents Equal Income and Sale Price")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size", "12px");
}

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
  const value = d.y || d.affindex || "";

  tooltip
    .style("opacity", 1)
    .style("left", event.pageX + "px")
    .style("top", event.pageY - 30 + "px")
    .html(`Value: ${value}`);
}
function handleMouseOut() {
  tooltip.style("opacity", 0);
}


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
