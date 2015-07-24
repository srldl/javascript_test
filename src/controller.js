/*jshint strict:false */

var projectApp = angular.module('projectApp', ['ngRoute']);


projectApp.controller('ProjectCtrl', ['$scope', '$http', function ($scope, $http) {
   // $http.jsonp('http://api.npolar.no/project/?q=&format=json&callback=JSON_CALLBACK&locales=utf-8')
   $http.get('http://apptest.data.npolar.no/project/00bfb1ae-6f1e-5ada-8266-f905b5d60a94')
    .success(function(data) {
      $scope.all = data;
      console.log($scope.all);
      }).error(function(data, status, headers, config) {
         console.log('error' + status);
      });
}]);


projectApp.controller('SaveCtrl', ['$scope', '$http', function ($scope, $http) {
   $scope.all2 = ['Per', 'Paal', 'Espen'];

}]);






