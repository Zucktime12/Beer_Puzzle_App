var beerApp = angular.module('beerApp', [])

beerApp.factory('beerFactory', function($resource) {
  return $resource('http://beer.fluentcloud.com/v1/beer', { beerId:'@id' });
});