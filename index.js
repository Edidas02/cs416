d3.csv('Housing.csv', function(error, data) {
  if (error) throw error;

  let currentScene = 1;

  function updateVisualization() {
    d3.select('#visualization').html('');

    let filteredData;
    switch (currentScene) {
      case 1:
        filteredData = data; 
        break;
      case 2:
        filteredData = data.filter(d => d.bedrooms >= 3); 
        break;
      case 3:
        filteredData = data.filter(d => d.area >= 1500); 
        break;
      default:
        filteredData = data; 
    }


    const table = d3.select('#visualization').append('table');
    const headers = ['Price', 'Area', 'Bedrooms', 'Bathrooms'];
    table.append('thead').append('tr')
      .selectAll('th').data(headers)
      .enter().append('th').text(d => d);

    const rows = table.append('tbody').selectAll('tr')
      .data(filteredData).enter().append('tr');
    rows.selectAll('td')
      .data(d => headers.map(key => d[key]))
      .enter().append('td').text(d => d);
  }

  function onSceneButtonClick(sceneNumber) {
    currentScene = sceneNumber;
    updateVisualization();
  }

  d3.select('#scene1Button').on('click', () => onSceneButtonClick(1));
  d3.select('#scene2Button').on('click', () => onSceneButtonClick(2));
  d3.select('#scene3Button').on('click', () => onSceneButtonClick(3));

  updateVisualization();
});

