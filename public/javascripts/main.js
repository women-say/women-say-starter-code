mapboxgl.accessToken = "pk.eyJ1IjoiYW50cm9wb3NhdXJpbyIsImEiOiJjanc2Nms3cnoxOXFpM3pxcnNpcnR0cjI4In0.Q_Lt8t3lOyEB0NkdGHBn9w";
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/antroposaurio/cjw690ahz3kg81crxfvqzytg8', // stylesheet location
  center: [-74.50, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});