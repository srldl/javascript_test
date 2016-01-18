'use strict';

/**
 * @ngInject
 */
var map = function () {
    var L = require('leaflet');
    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';

    return {
      restrict: 'E',
      templateUrl: 'src/map.html',
    /*  scope: {
          pictures: "="
      }, */
      link: function(scope, elem, attrs) {

        var L = require('leaflet');
        L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
        require('leaflet-draw');

    //    var url = 'http://tilestream.data.npolar.no/v2/WorldHax/{z}/{x}/{y}.png',
   //   attrib = '&copy; <a href="http://openstreetmap.org/copyright">Norwegian Polar Institute</a>',
      var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      tiles = L.tileLayer(url, {maxZoom: 18, attribution: attrib}),
      map = new L.Map('map', {layers: [tiles], center: new L.LatLng(78.000, 16.000), zoom: 4 });

      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      //Default markers are too big for many coord, use a small marker instead.
      var redIcon = L.icon({
                iconUrl: 'src/reddot.png',
                iconSize:     [8, 8] // size of the icon
      });


      var drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polygon: true,
          polyline: true,
          rectangle: true,
          circle: true,
          marker: {icon:redIcon},
        },
        edit: {
          featureGroup: drawnItems
        }
      });

      console.log(L);


      map.addControl(drawControl);




      //return res object
      var res = new Object();

      //When finishing the drawing catch event
      map.on('draw:created', function (e) {

        var type = e.layerType,
          layer = e.layer;
          console.log("draw created");
          console.log(e);


        if ((type === 'polygon') || (type === 'rectangle')) {
           //Get coord
           var res = (layer.toGeoJSON()).geometry.coordinates;
           console.log(layer.toGeoJSON());

           //Lat/lng needs to be reversed
           //last point is already reversed by Leaflet -thus lenght-1
           for (var i=0;i<(res[0].length-1);i++) {
               res[0][i] = res[0][i].reverse();
           };


           var polygon1 = new L.Polygon(res[0], {
                color: 'red',
                weight: 3 //,
            //    opacity: 0.5,
            //    smoothFactor: 1

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
                weight: 3 //,
           //     opacity: 0.5,
           //     smoothFactor: 1

           });
           polyline1.addTo(map);

           };


        if (type === 'circle') {
          //Get coord
          console.log("circle1");
          console.log(e.layer._mRadius);
          var res = (layer.toGeoJSON()).geometry.coordinates;
          console.log(layer.toGeoJSON());
          L.circle([res[1], res[0]],e.layer._mRadius,{
                color: 'red',
                weight: 3
          }).addTo(map);

          console.log("circle");
        };

        if (type === 'marker') {
          //Get coord
          var res = (layer.toGeoJSON()).geometry.coordinates;
          console.log(layer.toGeoJSON());
          var marker1 = L.marker([res[1], res[0]], {icon: redIcon}).addTo(map);
          //var marker1 = L.marker([res[1], res[0]]).addTo(map);
        };

  });

         //If map is edited
         map.on('draw:edited', function (e) {

          console.log('edited');

           var layers = e.layers;
           layers.eachLayer(function (layer) {
             //Update lng/lat from search
             var res = (layer.toGeoJSON()).geometry.coordinates;

               console.log(res);
           });
        });

        //if map should delete
        map.on('draw:deleted', function (e) {
           console.log("deleted");
        });

      }
  };
};


module.exports = map;