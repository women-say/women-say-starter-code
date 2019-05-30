const contenedormagico = document.querySelector(".contenedormagico")
const leyendacontenedor = document.querySelector(".leyenda")

const paintLegend = (chart) => {
  leyendacontenedor.innerHTML = chart.generateLegend(chart)

  var legendItems = leyendacontenedor.getElementsByTagName('li');
  for (var i = 0; i < legendItems.length; i += 1) {
    legendItems[i].addEventListener("click", legendClickCallback, false);
  }
}

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
    target.classList.remove('hidden');
  } else {
    target.classList.add('hidden');
  }
}


axios.get("http://localhost:3000/erjason")
  .then(response => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYW50cm9wb3NhdXJpbyIsImEiOiJjanc2Nms3cnoxOXFpM3pxcnNpcnR0cjI4In0.Q_Lt8t3lOyEB0NkdGHBn9w';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-100.04, 38.907],
      zoom: 3
    });

    map.on('load', function () {
      // Add a layer showing the state polygons.
      map.addLayer({
        'id': 'states-layer',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': 'https://res.cloudinary.com/evilloh/raw/upload/v1559144600/custom.geo_n7lvl3.json'
        },
        'paint': {
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
      });

      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on('click', 'states-layer', function (e) {
        console.log(e.features[0].properties)
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', 'states-layer', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'states-layer', function () {
        map.getCanvas().style.cursor = '';
      });
    });
  })



axios.get("http://localhost:3000/erjason")
  .then(response => {

    console.log("Response.data", response.data)

    const labels = [2000, 2005, 2010, 2011, 2012, 2013, 2014, 2015]

    // let countries = response.data.map((obj) => {

    //   return obj.Country
    // })

    let datasetsArr1 = response.data.map((obj, idx) => {

      let datasets = {}

      datasets.label = obj.Country
      datasets.fill = false
      if (idx < 50) datasets.borderColor = "red"

      datasets.data = []
      labels.forEach(label => {
        if (obj[label] > 0.25 && obj[label] < 1.04)
          datasets.data.push(obj[label])
      })
      return datasets
    })
    // AQUI EJEMPLO SI QUISIESES SOLO LOS PRIMEROS DIEZ, CAMBIA EL NOMBRE DE DATASETSARR EN DATASETSARR1
    // let datasetsArr = []
    // datasetsArr1.forEach((element, idx) => {
    //   if (idx < 10) {
    //     datasetsArr.push(element)
    //   }
    // });

    let datasetsArr = []
    datasetsArr1.forEach((element, idx) => {

      datasetsArr.push(element)

    });
    // console.log(datasetsArr)

    // let data = []

    // datasetsArr.forEach(obj => {
    //   data.push(obj)
    // })

    // console.log("data", data)

    // console.log(countries)

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasetsArr
      },
      options: {
        legend: {
          display: false
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
    paintLegend(myChart)
  })


