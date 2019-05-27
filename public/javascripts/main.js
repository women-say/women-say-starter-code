require('dotenv').config();
mapboxgl.accessToken = `${process.env.KEY}`;
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/antroposaurio/cjw690ahz3kg81crxfvqzytg8', // stylesheet location
center: [-74.50, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});