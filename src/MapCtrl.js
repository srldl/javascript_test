"use strict";

var MapCtrl =  function($scope, $controller, MapService) {


  var places = [{
       "type": "Feature",
       "geometry": {
       "type": "Point",
       "coordinates": [16.000, 78.000]
     },
       "properties": {
       "name": "Svalbard"
    }
    },
    {
      "type": "Feature",
      "geometry": {
      "type": "LineString",
      "coordinates": [
            [16.000, 78.000], [18.56, 79.89], [17.56, 78.67], [18.78, 79.45]
            ]
      },
      "properties": {
      "name": "Svalbard"
    }
    },
    {
      "type": "Feature",
      "geometry": {
      "type": "Polygon",
      "coordinates": [ [
            [20.000, 88.000], [18.56, 79.89], [17.56, 78.67], [18.78, 79.45], [20.000, 88.000]
      ]  ]
    },
    "properties": {
      "name": "Svalbard77"
    }
    } ];





 //MapService(place) is an object, mapobjects is a geojson array
  //var place = [];
  $scope.mapobj = MapService(places).mapobjects;
  console.log ("ctrl");
  console.log(JSON.stringify($scope.mapobj));

  var opt = {};
  opt.edits = [true, true, true, true, true];
  opt.lng = 16.000;
  opt.lat = 78.000;
  opt.attribute = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  opt.url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';


  $scope.opt = opt;

/*  $scope.$watch(function () {
       return MapService.mapobjects;
     },
      function(newVal, oldVal) {
        console.log("values out");
        console.log(newVal);
        console.log(oldVal);
  }, true); */


};

module.exports = MapCtrl;
