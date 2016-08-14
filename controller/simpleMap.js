'use strict';

angular.module('clientApp')
.controller('SimpleMapCtrl', ['$scope', '$http', 'LocationService', 'SalaryService', function($scope, $http, Location, Salary){

  var salaryPromise = Salary.get();
  salaryPromise
    .then(function(data){
      console.log(data['salaries']);
      for(var key in data['salaries']){
        var value = data['salaries'][key];
        var title = value["title"];
        var wage = value["wage"];
        var locationUrl = value["location"].location_url;

        // FORTSÄTT HÄR!! HÄMTA UT RESPEKTIVE LOCATION OCH SKAPA MESSAGES, LAT OCH LNG TILL MARKERS.

        console.log(title);
        console.log(wage);
        console.log(locationUrl);
      }
    })
    .catch(function(error){
      console.log(error);
    });




  var markers = {};

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
