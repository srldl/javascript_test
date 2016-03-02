'use strict';

// @ngInject
var angular = require('angular');

var map_test = angular.module('map_test',[]);

var app = angular.module('map_test',[]);

console.log("git index.js");

app.controller('MapCtrl', require('./MapCtrl'));
app.directive('map', require('../src/mapdraw'));
app.factory('MapService', require('../src/MapService'));
