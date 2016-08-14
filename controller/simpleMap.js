'use strict';

angular.module('clientApp')
.controller('SimpleMapCtrl', ['$scope', 'API', '$http', 'LocationService', function($scope, API, $http, Location){

  var markers = {};
  var jsonMarkers;
/*
  var url = API.Url + '/locations';
  var config = {
    headers: {
      'X-ApiKey': API.ApiKey,
      'Accept': 'application/json'
    }
  };
  var promise = $http.get(url, config);
  promise.success(function(data, status, headers, config){
    jsonMarkers = data;
    for(var i = 0; i < jsonMarkers.locations.length; i++){
      var marker = {
        lat: parseFloat(jsonMarkers.locations[i]['latitude']),
        lng: parseFloat(jsonMarkers.locations[i]['longitude']),
        draggable: false
      }
      markers[i] = marker;
    }
  });
  promise.error(function(data, status, headers, config){
    console.log('FEL');
  });*/

  //console.log(Location)

  var locationPromise = Location.get();
  locationPromise
    .then(function(data){
      console.log('data::' + data);

      /*jsonMarkers = data;
      console.log(data + 'data');
      for(var i = 0; i < jsonMarkers.locations.length; i++){
        var marker = {
          lat: parseFloat(jsonMarkers.locations[i]['latitude']),
          lng: parseFloat(jsonMarkers.locations[i]['longitude']),
          draggable: false
        }
        markers[i] = marker;
      }*/
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
