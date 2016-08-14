'use strict';

angular.module('clientApp')
.controller('SimpleMapCtrl', ['$scope', 'API', '$http', 'LocationService', function($scope, API, $http, Location){

  var markers = {};
  var jsonMarkers;

  var locationPromise = Location.get();
  locationPromise
    .then(function(data){
      var index = 0;
      for(var key in data['locations']){
        index += 1;
        var value = data['locations'][key];
        var marker = {
          lat: parseFloat(value['latitude']),
          lng: parseFloat(value['longitude']),
          draggable: false
        }
        markers[index] = marker;
      }
    })
    .catch(function(error){
      console.log('Ett fel inträffade.');
    });

  angular.extend($scope, {
    center: {
      lat: 59.3,
      lng: 15.0,
      zoom: 6
    },
    defaults: {
      minZoom: 4,
      maxZoom: 15,
      scrollWheelZoom: false
    },
    markers: markers
  })

}]);
