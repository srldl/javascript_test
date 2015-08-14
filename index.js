'use strict';

var angular = require('angular');

var appMap_test = angular.module('map_test',[]);


// require leaflet.js
var L = require('leaflet');

// specify the path to the leaflet images folder
//L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

// initialize the map
var map = L.map('map', {
  scrollWheelZoom: false
});

// set the position and zoom level of the map
map.setView([78.00, 16.00], 4);


// set the tiles the map will use
var tiles = 'http://tilestream.data.npolar.no/v2/WorldHax/{z}/{x}/{y}.png';

// create a tileLayer with the tiles, attribution
var layer = L.tileLayer(tiles, {
  maxZoom: 14,
  attribution: 'NPI'
});

// add the tile layer to the map
layer.addTo(map);
