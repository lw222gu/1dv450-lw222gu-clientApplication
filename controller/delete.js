'use strict';

angular.module('clientApp')
  .controller('DeleteCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', '$http', function(TagService, SalaryService, LocationService, $scope, $routeParams, $http) {

    var vm = this;

    $scope.submit = function(){
      var deletePromise = SalaryService.deleteSalary($routeParams.id);
      deletePromise
      .then(function(deleteData){
        $scope.deleted = true;
      })
      .catch(function(error){

      });
    };

    var salaryPromise = SalaryService.getSalary($routeParams.id);
    salaryPromise
      .then(function(salary){
        $scope.delete = salary;
      })
      .catch(function(error){
        console.log(error);
      });

  }]);
