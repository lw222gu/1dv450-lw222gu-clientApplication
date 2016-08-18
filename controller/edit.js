'use strict';

angular.module('clientApp')
  .controller('EditCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', '$http', function(TagService, SalaryService, LocationService, $scope, $routeParams, $http) {

    var vm = this;
    console.log('I editcontrollern');

    $scope.submit = function(){
      console.log('hej');
      var editPromise = SalaryService.editSalary($routeParams.id, $scope.edit.title, $scope.edit.wage, null, $scope.edit.address);
      editPromise
      .then(function(editData){
        console.log(editData);
      })
      .catch(function(error){

      });
    };

    var salaryPromise = SalaryService.getSalary($routeParams.id);
    salaryPromise
      .then(function(salaryData){
        var salary = {
          title : salaryData['salary'].title,
          wage : salaryData['salary'].wage,
          address: null,
          id: salaryData['salary'].id
        };

        // get salary location
        var locationPromise = LocationService.getLocation(salaryData['salary'].location.id);
        locationPromise
        .then(function(locationData){
          salary.address = locationData['location'].address;
        });
        $scope.edit = salary;
      })
      .catch(function(error){
        console.log(error);
      });
  }]);
