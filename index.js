'use strict';

var angular = require('angular');

var appMap_test = angular.module('map_test',[]);

// require leaflet.js
var L = require('leaflet');
require('leaflet-draw');

// specify the path to the leaflet images folder
L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/'

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map', {drawControl: true}).setView([78.000, 16.000], 4);

// add an OpenStreetMap tile layer
L.tileLayer('http://tilestream.data.npolar.no/v2/WorldHax/{z}/{x}/{y}.png', {
   attribution: 'Norwegian Polar Institute'
}).addTo(map);

// Initialize the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialize the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
   edit: {
       featureGroup: drawnItems
   }
});
map.addControl(drawControl);


map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
        console.log("hei");
        var res = (layer.toGeoJSON()).geometry.coordinates;

        /*fetch zero and second coordinate pair to get a rectangle */
        $scope.lat1= res[0][0][0];
        $scope.lng1= res[0][0][1];
        $scope.lat2= res[0][2][0];
        $scope.lng2= res[0][2][1];


     console.log(res[0][0][0]);
    if (type === 'marker') {
        // Do marker specific actions
    }

    // Do whatever else you need to. (save to db, add to map etc)
    drawnItems.addLayer(layer);
});

map.on('draw:edited', function () {
    // Update db to save latest changes.
     console.log("hei");
});

map.on('draw:deleted', function () {
    // Update db to save latest changes.
});
