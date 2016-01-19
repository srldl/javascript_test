"use strict";

var MapCtrl =  function($scope, $controller) {

  var opt = {};
  opt.edits = [false, false, true, false, false];
  opt.lng = 16.000;
  opt.lat = 78.000;
  opt.attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  opt.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

  $scope.opt = opt;
  $scope.mapobj = [{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [16.000, 78.000]
  },
  "properties": {
    "name": "Svalbard"
  }
}];
};

module.exports = MapCtrl;