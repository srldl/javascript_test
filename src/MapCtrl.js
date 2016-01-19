var MapCtrl =  function($scope, $controller) {

  //var editable = 'true';
  options = new Object();
  options.edits = [false, false, true, false, false];
  options.lng = 16.000;
  options.lat = 78.000;
  mapobj = [{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [16.000, 78.000]
  },
  "properties": {
    "name": "Svalbard"
  }
}];
  $scope.opt = options;
  $scope.mapobj = mapobj;
};

module.exports = MapCtrl;