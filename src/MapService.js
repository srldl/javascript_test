'use strict';

var MapService = function() {

   //input example of several features
   var service = {};
   service.mapobjects = [];

   return {
     getJSON: function() {
       return [service];
     },
     //Setter - if del is true, remove old
     setJSON: function(places) {
        for (var i=0;i<places.length;i++) {
             (service.mapobjects).push(places[i]);
        };
        console.log("service: " + JSON.stringify(service));
        return [service];
     },
     delJSON: function(del) {

      console.log(del);
        //Find index
        var arrID;
        var max = (service.mapobjects).length;

        for (var i=0;i<max;i++) {
             console.log(service.mapobjects[i].properties);
             if ((service.mapobjects[i].properties.id) && (service.mapobjects[i].properties.id === del.toString())) {
                arrID = i;
             }
        }

        //Get object type first

        console.log(service.mapobjects);

        var type = service.mapobjects[parseInt(arrID)].geometry.type;

        //remove array entry
        (service.mapobjects).splice(parseInt(arrID), 1);

        //return object type
        console.log("service: " + JSON.stringify(service));
        return type;
     }
  };

};


module.exports = MapService;


