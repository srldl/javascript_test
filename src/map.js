'use strict';

/**
 * @ngInject
 */
var map = function () {
    var L = require('leaflet');
    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

    return {
      restrict: 'AE',
      templateUrl: 'src/map.html',
      scope: {
         mapobj: '=',
         opt: '='
      }, //isolate the scope

      link: function(scope, elem, attrs) {

        var L = require('leaflet');
        L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
        require('leaflet-draw');

    //    var url = 'http://tilestream.data.npolar.no/v2/WorldHax/{z}/{x}/{y}.png',
   //   attrib = '&copy; <a href="http://openstreetmap.org/copyright">Norwegian Polar Institute</a>',
      var url = scope.opt.url,
      attrib = scope.opt.attribute,
      tiles = L.tileLayer(url, {maxZoom: 18, attribution: attrib}),
      map = new L.Map('map', {layers: [tiles], center: new L.LatLng(scope.opt.lat, scope.opt.lng), zoom: 4 });

      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      //Default markers are too big for many coord, use a small marker instead.
      var redIcon = L.icon({
                iconUrl: 'src/reddot.png',
                iconSize:     [8, 8] // size of the icon
      });

      //Set markers to false (remove) or alternative options
      if (scope.opt.edits[4] == false ) {
         var marker1 = false;
      } else {
         var marker1 = {icon:redIcon};
      };

      //Set edit to false or alternative options
       if (scope.opt.edits[0] == scope.opt.edits[1] == scope.opt.edits[2] == scope.opt.edits[3] == scope.opt.edits[4] == false) {
         var edit1 = false;
      } else {
         var edit1 = { featureGroup: drawnItems, remove:true }
      };

      var drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polygon: scope.opt.edits[0],
          polyline: scope.opt.edits[1],
          rectangle: scope.opt.edits[2],
          circle: scope.opt.edits[3],
          marker: marker1
        },
        edit: edit1 /* {
          featureGroup: drawnItems,
          remove:true
       } */
      });

      //console.log(L);


      map.addControl(drawControl);




      //return res object
      var res = new Object();

      //When finishing the drawing catch event
      map.on('draw:created', function (e) {
        var type = e.layerType,
        layer = e.layer;
        drawnItems.addLayer(layer);


        if ((type === 'polygon') || (type === 'rectangle')) {
           //Get coord
           var res = (layer.toGeoJSON()).geometry.coordinates;

           console.log(layer.toGeoJSON());
           console.log("rectangle");

           //Lat/lng needs to be reversed
           //last point is already reversed by Leaflet -thus lenght-1
           for (var i=0;i<(res[0].length-1);i++) {
               res[0][i] = res[0][i].reverse();
           };


           var polygon1 = new L.Polygon(res[0], {
                color: 'red',
                weight: 3
           });

           polygon1.addTo(map);

        };

        if (type === 'polyline') {
           //Get coord
           res = (layer.toGeoJSON()).geometry.coordinates;
           console.log(layer.toGeoJSON());

          //Lat/lng needs to be reversed
           for (var i=0;i<res.length;i++) {
               res[i] = res[i].reverse();
           };

           var polyline1 = new L.Polyline(res, {
                color: 'red',
                weight: 3
           });
           polyline1.addTo(map);

           };


        if (type === 'circle') {
          //Get coord
          var res = (layer.toGeoJSON()).geometry.coordinates;
          console.log(layer.toGeoJSON());
          L.circle([res[1], res[0]],e.layer._mRadius,{
                color: 'red',
                weight: 3
          }).addTo(map);
        };

        if (type === 'marker') {
          //Get coord
          var res = (layer.toGeoJSON()).geometry.coordinates;
          console.log(layer.toGeoJSON());
          var marker1 = L.marker([res[1], res[0]], {icon: redIcon}).addTo(map);
        };

  });
        //If map is edited
         map.on('draw:editstart', function (e) {
            var layers = e.layers;
              console.log(e);
              console.log("editstart");
         });

         //If map is edited
         map.on('draw:editstop', function (e) {
            var layers = e.layers;
              console.log(e);
              console.log("editstop");
         });

         //If map is edited
         map.on('draw:edited', function (e) {

           var layers = e.layers;
           layers.eachLayer(function (layer) {
             //Update lng/lat from search
             var res = (layer.toGeoJSON()).geometry.coordinates;
             console.log(layer.toGeoJSON());
             console.log("edited");

       /*      var polygon1 = layer.Polygon(res[0], {
                color: 'red',
                weight: 3
             });
             polygon1.addTo(map); */


             //  console.log(layer.toGeoJSON());
           });
        });

        //if map should delete
        map.on('draw:deleted', function (e) {
           console.log("deleted");
            var layers = e.layers;
            console.log(e);
        });

      }
  };
};


module.exports = map;