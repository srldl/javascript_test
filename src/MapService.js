'use strict';

var MapService = function() {

   //input example of several features
   var service = {
     mapobjects: [{
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
      "name": "Svalbard"
    }
    } ]
    }

   return function(place) {
      for (var i=0;i<place.length;i++) {
          (service.mapobjects).push(place[i]);
      }
     return service;
  }


};


module.exports = MapService;


