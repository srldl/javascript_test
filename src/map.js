'use strict';


var map = function (MapService) {
    'ngInject';
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

      //Default markers are too big for many coord, use a small marker instead.
      var redIcon = L.icon({
                iconUrl: 'src/img/marker2.png',
                iconSize: [54, 54] // size of the icon
      });

      //Set base map, center
      var url = scope.opt.url,
      attrib = scope.opt.attribute,
      tiles = L.tileLayer(url, {maxZoom: 18, attribution: attrib}),
      map = new L.Map('map', {layers: [tiles], center: new L.LatLng(scope.opt.lat, scope.opt.lng), zoom: 4 });

      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      //Remove markers if none or view with small red icons.
      var marker1 = null;
      if (scope.opt.edits[4] === false ) {
         marker1 = false;
      } else {
         marker1 = {icon:redIcon};
      }

      //Deactivate edit or set it to featuregroup to show edit and delete.
       var edit1 = null;
       if (scope.opt.edits[0] === scope.opt.edits[1] === scope.opt.edits[2] === scope.opt.edits[3] === scope.opt.edits[4] === false) {
         edit1 = false;
      } else {
         edit1 = { featureGroup: drawnItems, remove:true };
      }

      //Create a draw control
      var drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polygon: scope.opt.edits[0],
          polyline: scope.opt.edits[1],
          rectangle: scope.opt.edits[2],
          circle: scope.opt.edits[3],
          marker: marker1
        },
        edit: edit1
      });

      map.addControl(drawControl);

      var inputLayer = L.geoJson().addTo(map);

      if  (scope.mapobj) {
              inputLayer.addData(scope.mapobj);
      }


      //When finishing the drawing catch event
      map.on('draw:created', function (e) {
        var type = e.layerType,
        layer = e.layer;
        var res = null;

        if (type === 'rectangle') {

           //Lat/lng needs to be reversed
           //last point is already reversed by Leaflet -thus lenght-1
           res = (layer.toGeoJSON()).geometry.coordinates;

           for (var i=0;i<(res[0].length-1);i++) {
               res[0][i] = res[0][i].reverse();
           }

           var rectangle1 = new L.Rectangle(res[0], {
                color: 'red',
                weight: 3
           });

           layer = rectangle1.addTo(map);

        }

        if (type === 'polygon') {
           //Get coord
           res = (layer.toGeoJSON()).geometry.coordinates;

           //Lat/lng needs to be reversed
           //last point is already reversed by Leaflet -thus lenght-1
           for (var i=0;i<(res[0].length-1);i++) {
               res[0][i] = res[0][i].reverse();
           }

           var polygon1 = new L.Polygon(res[0], {
                color: 'red',
                weight: 3
           });

           layer = polygon1.addTo(map);
           console.log("polygon");

        }

        if (type === 'polyline') {
           //Get coord
           res = (layer.toGeoJSON()).geometry.coordinates;

          //Lat/lng needs to be reversed
           for (var j=0;j<res.length;j++) {
               res[j] = res[j].reverse();
           }

           var polyline1 = new L.Polyline(res, {
                color: 'red',
                weight: 3
           });
           layer = polyline1.addTo(map);
           }


        if (type === 'circle') {
          //Get coord
          res = (layer.toGeoJSON()).geometry.coordinates;

          layer = L.circle([res[1], res[0]],e.layer._mRadius,{
                color: 'red',
                weight: 3
          }).addTo(map);
        }

        if (type === 'marker') {
          //Get coord
          res = (layer.toGeoJSON()).geometry.coordinates;

          layer =  L.marker([res[1], res[0]], {icon: redIcon}).addTo(map);
        }


        drawnItems.addLayer(layer);

        //convert coord to geoJson obj
        var coord = (layer.toGeoJSON()).geometry.coordinates;
        var geoJsonObj = getJsonObj(type, coord);
        MapService(geoJsonObj).mapobjects;

  });

        //If map is edited
        map.on('draw:edited', function (e) {
           var layers = e.layers;
           layers.eachLayer(function (layer) {
             //Update lng/lat from search
            // var res = (layer.toGeoJSON()).geometry.coordinates;
             console.log(layer.toGeoJSON());
             console.log("edited");
           });
        });

        //if map should delete
        map.on('draw:deleted', function (e) {
           console.log("deleted");
          //  var layers = e.layers;
            console.log(e);
        });
      }
  };

    //Convert coord into a full geoJSON object
      function getJsonObj(type, coord) {

        //Rectangle is a polygon according to geoJSON
        if (type == 'rectangle'){ type = 'polygon'};

        var json = [{
           "type": "Feature",
           "geometry": {
           "type": "",
           "coordinates": []
           },
           "properties": {
           "name": "Svalbard"}
        }];

        json[0].geometry.type = type;
        json[0].geometry.coordinates = coord;

        console.log(type);
        console.log(json);
        return json;
      };

};


module.exports = map;