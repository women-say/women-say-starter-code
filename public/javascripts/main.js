
   

//MAP BOX ACCESS TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50cm9wb3NhdXJpbyIsImEiOiJjanc2Nms3cnoxOXFpM3pxcnNpcnR0cjI4In0.Q_Lt8t3lOyEB0NkdGHBn9w';

//MAP

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/antroposaurio/cjw690ahz3kg81crxfvqzytg8', // stylesheet location
  center: [0, 0], // starting position [lng, lat]
  zoom: 2 // starting zoom

});

//GEOCODER

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

///FUNCION para crear chincheta pasandole un argumento string 

var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
const casa = (el) => {
  mapboxClient.geocoding.forwardGeocode({
    query: el,
    autocomplete: false,
    limit: 1
  })
    .send()
    .then(function (response) {
      if (response && response.body && response.body.features && response.body.features.length) {
        var feature = response.body.features[0];
      }
    });
}

//RETRIEVE POSTS FROM DATABASE

getPosts(map)

function getPosts(map) {
  axios.get("/api")
    .then(response => {
      console.log(`Respuesta: ${{response}}`)
      postPosts(response.data.posts, map)
      
    })
    .catch(error => console.log(error))
}

// GEOCODER RESULT OBJECT//result guardar el dato entero
// geocoder.on('results', function (results) {
//   console.log(results);
//   let longitude = results.features[0].geometry.coordinates[1]
//   let latitude = results.features[0].geometry.coordinates[0]
//   console.log(`la longitud es ${longitude}`)
//   console.log(`la latitud es ${latitude}`)
// })

//APPEND ATTRIBUTE TO GEOCODER TO RETRIEVE DATA FROM FORM

let geocodeName = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')
geocodeNameArray = [...geocodeName]
geocodeNameArray[0].setAttribute("name", "location")
console.log(geocodeNameArray)

//FOR EACH POST FROM MODEL DRAQ MARJER AND POPUP WITH DATA

const postPosts = (posts, map) => {
  
  
  posts.forEach((post, marker)=>{
    
    var el = document.createElement('div')
    el.className = 'marker'
  
  var popup = new mapboxgl.Popup({ offset: 25 })
  .setHTML(post.text);

  mapboxClient.geocoding.forwardGeocode({
    query: post.location,
    autocomplete: false,
    limit: 1
  })
  .send()
  .then(function (response) {
    if (response && response.body && response.body.features && response.body.features.length) {
      var feature = response.body.features[0];
      
      new mapboxgl.Marker(el)
      .setLngLat(feature.center)
      .setPopup(popup)
      .addTo(map);
      
    }
  });
})}

///CHART JS


  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [['June', '2015'], 'July', 'August', 'September', 'October', 'November', 'December', ['January', '2016'], 'February', 'March', 'April', 'May'],
      datasets: [{
        label: 'My First dataset',
        fill: false,
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      }, {
        label: 'My Second dataset',
        fill: false,
        backgroundColor: window.chartColors.blue,
        borderColor: window.chartColors.blue,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart with Multiline Labels'
      },
    }
  })

  axios.get("http://localhost:3000/erjason")
  .then(response => {
  
    console.log("ASSSSHHH", response.data)
  
    const labels = [2000,2005,2010,2011,2012,2013,2014,2015]

  let countries = response.data.map((obj) => {

    return obj.Country
  })

  let datasetsArr = response.data.map((obj) => {

    let datasets = {datasets:{}}

  datasets.datasets.label = obj.Country
  datasets.datasets.data = []
  labels.forEach(label => {
    datasets.datasets.data.push(obj[label])
  })

  
// var config = {
//     type: 'line',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: datasets.datasets.label,
//         fill: false,
//         backgroundColor: window.chartColors.red,
//         borderColor: window.chartColors.red,
//         data: data
//       }]
//     },
//     options: {
//       responsive: true,
//       title: {
//         display: true,
//         text: 'Chart'
//       },
//     }
//   };

var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};




console.log(datasetsArr)
return datasets
})
})
///acaba promesa
  
  /////////////////charrrrrrrrttttttttt////////////////
  // var config = {
  //   type: 'line',
  //   data: {
  //     labels: labels,
  //     datasets: [{
  //       label: label,
  //       fill: false,
  //       backgroundColor: window.chartColors.red,
  //       borderColor: window.chartColors.red,
  //       data: data
  //     }]
  //   },
  //   options: {
  //     responsive: true,
  //     title: {
  //       display: true,
  //       text: 'Chart'
  //     },
  //   }
  // };

  // window.onload = function() {
  //   var ctx = document.getElementById('canvas').getContext('2d');
  //   window.myLine = new Chart(ctx, config);
  // };
