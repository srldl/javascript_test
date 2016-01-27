"use strict";

var MapCtrl =  function($scope, $controller, MapService) {


  console.log($scope);
  var map = [{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
            [17.000, 79.000], [18.56, 79.89], [17.56, 78.67], [18.78, 79.45]
            ]
  },
  "properties": {
    "name": "Svalbard77"
  }}];

  $scope.mapobj = MapService(map);

  var opt = {};
  opt.edits = [true, true, true, true, true];
  opt.lng = 16.000;
  opt.lat = 78.000;
  opt.attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  opt.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';


  $scope.opt = opt;


};

module.exports = MapCtrl;