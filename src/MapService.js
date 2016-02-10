'use strict';

var MapService = function() {

   //input example of several features
   var service = {};
   service.mapobjects = [];

   return {
     getJSON: function() {
       return [service];
   },
     setJSON: function(places) {
         for (var i=0;i<places.length;i++) {
          (service.mapobjects).push(places[i]);
          }
         console.log("service: " + JSON.stringify(service));
        return [service];
    }
  };

};


module.exports = MapService;


