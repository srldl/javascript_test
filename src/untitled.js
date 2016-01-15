var L = require('leaflet');
  L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images/';
  require('leaflet-draw');

// if (map !== undefined) { map.remove(); console.log("remove");}

  var url = 'http://tilestream.data.npolar.no/v2/WorldHax/{z}/{x}/{y}.png',
      attrib = '&copy; <a href="http://openstreetmap.org/copyright">Norwegian Polar Institute</a>',
      tiles = L.tileLayer(url, {maxZoom: 18, attribution: attrib}),
      map = new L.Map('map', {layers: [tiles], center: new L.LatLng(78.000, 16.000), zoom: 4 });

      var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      var drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polygon: false,
          polyline: false,
          circle: false,
          marker: false,
        },
        edit: {
          featureGroup: drawnItems
        }
      });
      map.addControl(drawControl);

      //When finishing the drawing catch event
      map.on('draw:created', function (e) {
        //Remove previous markers


        var type = e.layerType,
          layer = e.layer;

        //When finishing a rectangle, show lat lon in input fields
        if (type === 'rectangle') {
          var res = (layer.toGeoJSON()).geometry.coordinates;


          var lat1 = res[0][0][0];
          var lng1 = res[0][0][1];
          var lat2 = res[0][2][0];
          var lng2 = res[0][2][1];

           var redIcon = L.icon({
                iconUrl: 'src/reddot.png',
                iconSize:     [8, 8] // size of the icon
            });


       var marker1 = L.marker([lng1, lat1], {icon: redIcon}).addTo(map).bindPopup("1.").openPopup();
       var marker2 = L.marker([lng2, lat2], {icon: redIcon}).addTo(map).bindPopup("2.").openPopup();

        var markers =  L.layerGroup([marker1,marker2]);
      }
  });
