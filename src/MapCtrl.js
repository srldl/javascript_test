"use strict";

var MapCtrl =  function($scope, $controller, MapService) {


  var place = [{
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [17.000, 80.000]
    },
    "properties": {
      "name": "Sval"
    }
}]


  console.log("--mapobj--");
  console.log(MapService);

  var opt = {};
  opt.edits = [true, true, true, true, true];
  opt.lng = 16.000;
  opt.lat = 78.000;
  opt.attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  opt.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';


  $scope.opt = opt;


};

module.exports = MapCtrl;
