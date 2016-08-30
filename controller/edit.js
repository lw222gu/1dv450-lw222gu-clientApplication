'use strict';

angular.module('clientApp')
  .controller('EditCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', '$http', function(TagService, SalaryService, LocationService, $scope, $routeParams, $http) {

    var vm = this;

    $scope.submit = function(){
      $scope.error = false;
      $scope.success = false;

      if($scope.edit.title != null && $scope.edit.wage != null && $scope.edit.address != null){
        var editPromise = SalaryService.editSalary($routeParams.id, $scope.edit.title, $scope.edit.wage, $scope.edit.address);
        editPromise
        .then(function(editData){
          $scope.success = true;
          $scope.message = "Posten sparades.";
        })
        .catch(function(error){
          $scope.error = true;
          $scope.message = "Ett fel inträffade när posten skulle sparas.";
        });
      }
      else {
        $scope.error = true;
        $scope.message = "Du måste fylla i samtliga fält.";
      }
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
        $scope.error = true;
        $scope.message = "Något gick fel när posten skulle hämtas. Prova igen.";
      });
  }]);
