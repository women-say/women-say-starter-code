

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50cm9wb3NhdXJpbyIsImEiOiJjanc2Nms3cnoxOXFpM3pxcnNpcnR0cjI4In0.Q_Lt8t3lOyEB0NkdGHBn9w';
console.log(mapboxgl.accessToken)

var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/antroposaurio/cjw690ahz3kg81crxfvqzytg8', // stylesheet location
center: [0,0], // starting position [lng, lat]
zoom: 2 // starting zoom
});

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
  });
   
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));





getPosts(map)

function getPosts(map) {
  axios.get("/api")
      .then(response => postPosts(response.data.posts, map))
      .catch(error => console.log(error))
} 

// GEOCODER RESULT OBJECT
geocoder.on('results', function(results) {
  console.log(results);
  let longitude = results.features[0].geometry.coordinates[1]
  let latitude = results.features[0].geometry.coordinates[0]
  console.log(`la longitud es ${longitude}`)
  console.log(`la latitud es ${latitude}`)
})

let geocodeName = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')
geocodeNameArray = [...geocodeName]
geocodeNameArray[0].setAttribute("name","location")
console.log(geocodeNameArray)

const postPosts = (posts, map) =>{

  posts.forEach(function(marker){
    // console.log(posts)
    
    var el = document.createElement('div')
    el.className = 'marker'
    
    new mapboxgl.Marker(el)
    .setLngLat(marker.location.coordinates)
    .addTo(map)
  

})

}

// var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
// const casa = function (el){
// mapboxClient.geocoding.forwardGeocode({
// query: el,
// autocomplete: false,
// limit: 1
// })
// .send()
// .then(function (response) {
// if (response && response.body && response.body.features && response.body.features.length) {
// var feature = response.body.features[0];
 
// new mapboxgl.Marker()
// .setLngLat(feature.center)
// .addTo(map);
// }
// });
// }
// map.on("load", function() {
//   map.addSource("national-park", {
//   "type": "geojson",
//   "data": {
//   "type": "FeatureCollection",
//   "features": [{
//   "type": "Feature",
//   "geometry": {
//   "type": "Polygon",
//   "coordinates": [
//   [
//   [-121.353637, 40.584978],
//   [-121.284551, 40.584758],
//   [-121.275349, 40.541646],
//   [-121.246768, 40.541017],
//   [-121.251343, 40.423383],
//   [-121.326870, 40.423768],
//   [-121.360619, 40.434790],
//   [-121.363694, 40.409124],
//   [-121.439713, 40.409197],
//   [-121.439711, 40.423791],
//   [-121.572133, 40.423548],
//   [-121.577415, 40.550766],
//   [-121.539486, 40.558107],
//   [-121.520284, 40.572459],
//   [-121.487219, 40.550822],
//   [-121.446951, 40.563190],
//   [-121.370644, 40.563267],
//   [-121.353637, 40.584978]
//   ]
//   ]
//   }
//   }, {
//   "type": "Feature",
//   "geometry": {
//   "type": "Point",
//   "coordinates": [-121.415061, 40.506229]
//   }
//   }, {
//   "type": "Feature",
//   "geometry": {
//   "type": "Point",
//   "coordinates": [-121.505184, 40.488084]
//   }
//   }, {
//   "type": "Feature",
//   "geometry": {
//   "type": "Point",
//   "coordinates": [-121.354465, 40.488737]
//   }
//   }]
//   }
//   });

     
//     map.addLayer({
//     "id": "park-volcanoes",
//     "type": "circle",
//     "source": "national-park",
//     "paint": {
//     "circle-radius": 6,
//     "circle-color": "#B42222"
//     },
//     "filter": ["==", "$type", "Point"],
//     });


//     });
// map.addLayer({
//   "type": "circle",
//   "source": "womenPost",
//   "paint": {
//   "circle-radius": 6,
//   "circle-color": "rbg(224, 90, 90)"
//   },
//   "filter": ["==", "$type", "Point"],
//   });
