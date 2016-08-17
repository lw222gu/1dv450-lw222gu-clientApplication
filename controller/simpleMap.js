'use strict';

angular.module('clientApp')
.controller('SimpleMapCtrl', ['$scope', '$http', 'LocationService', 'SalaryService', function($scope, $http, Location, Salary){

  var markers = {};
  var index = 0;

  // Get all salaries
  var salaryPromise = Salary.get();
  salaryPromise
    .then(function(data){

      // For each salary, get location and save marker.
      angular.forEach(data['salaries'], function(value, key){
        var locPromise = Location.getLocation(value.location.id);
        locPromise
        .then(function(locationData){
          var marker = {
            lat : parseFloat(locationData['location'].latitude),
            lng : parseFloat(locationData['location'].longitude),
            message: '<a href="#/salary/' + value.id + '">' + data['salaries'][key].title + '</a>, ' + data['salaries'][key].wage
          };
          index += 1;
          markers[index] = marker;
        });
      });
    })
    .catch(function(error){
      console.log(error);
    });

  // Set scope to map settings.
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
