'use strict';

// @ngInject
var angular = require('angular');
require('angular-resource');

var map_test = angular.module('map_test',[]);

var app = angular.module('map_test',[
 // 'leaflet-directive',
  'ngResource'
]);

app.controller('MapCtrl', require('./src/MapCtrl'));
app.directive('map', require('./src/map'));
app.service('MapService', require('./src/MapService'));
