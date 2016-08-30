'use strict';

angular.module('clientApp')
  .controller('EditCtrl', ['SalaryService', 'LocationService', '$scope', '$routeParams', '$http', 'API', function(SalaryService, LocationService, $scope, $routeParams, $http, API) {

    var vm = this;

    // PUT. Not using factories since that will mess up the factories due to tags handling.
    $scope.submit = function(){
      $scope.error = false;
      $scope.success = false;

      if($scope.edit.title != null && $scope.edit.wage != null && $scope.edit.latitude != null && $scope.edit.longitude != null){
        var url = API.Url + 'salaries/' + $scope.edit.id + '?title=' + $scope.edit.title + '&wage=' + $scope.edit.wage + '&latitude=' + $scope.edit.latitude + '&longitude=' + $scope.edit.longitude;
        var tagsStr = $scope.edit.tags;

        if(tagsStr != null && tagsStr != undefined && tagsStr != ""){
          var tagsArray = tagsStr.split(', ');
          for(var i = 0; i < tagsArray.length; i++)
          {
            var str = '&tags[]=' + tagsArray[i].toLowerCase();
            url += str;
          }
        }

        var params = {
          title: $scope.edit.title,
          wage: $scope.edit.wage,
          latitude: $scope.edit.latitude,
          longitude: $scope.edit.longitude
        };

        var config = {
          headers: {
            'X-ApiKey': API.ApiKey,
            'Authorization': sessionStorage['jwt'],
            'Accept': 'application/json'
          }
        };

        var promise = $http.put(url, params, config);

        promise.success(function(data, status, headers, config){
          $scope.success = true;
          $scope.message = "Posten sparades.";
        });

        promise.error(function(data, status, headers, config){
          $scope.error = true;
          $scope.message = "Något gick fel när posten skulle sparas.";
        });
      }
      else {
        $scope.error = true;
        $scope.message = "Du har inte angett samtliga obligatoriska fält.";
      }
    };

    // Gets the salary that should be updated.
    var salaryPromise = SalaryService.getSalary($routeParams.id);
    salaryPromise
      .then(function(salaryData){
        var tags = [];
        angular.forEach(salaryData['salary'].tags, function(value, key){
          tags.push(value.tag);
        });
        var salary = {
          title : salaryData['salary'].title,
          wage : salaryData['salary'].wage,
          address: null,
          id: salaryData['salary'].id,
          tags: tags.join()
        };

        // get salary location
        var locationPromise = LocationService.getLocation(salaryData['salary'].location.id);
        locationPromise
        .then(function(locationData){
          salary.address = locationData['location'].address;
          salary.latitude = locationData['location'].latitude;
          salary.longitude = locationData['location'].longitude;
        });
        $scope.edit = salary;
      })
      .catch(function(error){
        $scope.error = true;
        $scope.message = "Något gick fel när posten skulle hämtas. Prova igen.";
      });

  }]);
