"use strict";

var MapCtrl =  function($scope, $controller, MapService) {


  /*var place = [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [17.000, 80.000]
    },
    "properties": {
      "name": "Sval"
    }
  }] */

  var place = [];

 //MapService(place) is an object, mapobjects is a geojson array
  $scope.mapobj = MapService(place).mapobjects;

  var opt = {};
  opt.edits = [true, true, true, true, true];
  opt.lng = 16.000;
  opt.lat = 78.000;
  opt.attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  opt.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';


  $scope.opt = opt;


};

module.exports = MapCtrl;
