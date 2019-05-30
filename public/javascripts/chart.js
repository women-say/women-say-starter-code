function legendClickCallback(event) {
  event = event || window.event;

  var target = event.target || event.srcElement;
  while (target.nodeName !== 'LI') {
      target = target.parentElement;
  }
  var parent = target.parentElement;
  var chartId = parseInt(parent.classList[0].split("-")[0], 10);
  var chart = Chart.instances[chartId];
  var index = Array.prototype.slice.call(parent.children).indexOf(target);

  chart.legend.options.onClick.call(chart, event, chart.legend.legendItems[index]);
  if (chart.isDatasetVisible(index)) {
    target.classList.add('hidden');
  } else {
    target.classList.remove('hidden');
  }
}

axios.get("http://localhost:3000/erjason")
  .then(response => {

    console.log("Response.data", response.data)

    const labels = [2000, 2005, 2010, 2011, 2012, 2013, 2014, 2015]


    let datasetsArr = response.data.map((obj) => {

      let datasets = {}

      datasets.label = obj.Country

      
      datasets.fill = false,
      datasets.hidden = true,
      
      datasets.data = []
      labels.forEach(label => {
        datasets.data.push(obj[label])
      })
      console.log(datasets.data)
      if (datasets.data[7]> 1) datasets.borderColor = 'rgb(28, 114, 110)' 
      if (datasets.data[7]<= 1 && datasets.data[6]>= 0.9) datasets.borderColor = 'rgb(231, 229, 229)' 
      if (datasets.data[7]<= 0.9) datasets.borderColor = 'rgb(65, 59, 59)' 
      
      return datasets
    })

    console.log(datasetsArr)

    // console.log(countries)

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasetsArr, 
      },
      options: {
        legend:{
        fullWidth: false,
        display: false,
        position: 'left',
        labels: {
          
          boxWidth: 20,
          fontColor:'white',
          fontSize: 9,
        }
      },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    console.log(myChart.generateLegend())
    var myLegendContainer = document.getElementById("myChartLegend");
    // generate HTML legend
    myLegendContainer.innerHTML = myChart.generateLegend();
    var legendItems = myLegendContainer.getElementsByTagName('li');
    for (var i = 0; i < legendItems.length; i += 1) {
    legendItems[i].addEventListener("click", legendClickCallback, false);
    
    
  }
})




