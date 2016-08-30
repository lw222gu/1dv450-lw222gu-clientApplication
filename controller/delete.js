'use strict';

angular.module('clientApp')
  .controller('DeleteCtrl', [ 'SalaryService', '$scope', '$routeParams', function(SalaryService, $scope, $routeParams) {

    var vm = this;

    $scope.submit = function(){
      $scope.error = false;
      $scope.success = false;

      var deletePromise = SalaryService.deleteSalary($routeParams.id);
      deletePromise
      .then(function(deleteData){
        $scope.success = true;
        $scope.message = "Posten raderades.";
      })
      .catch(function(error){
        $scope.error = true;
        $scope.message = "Ett fel inträffade när posten skulle raderas.";
      });
    };

    var salaryPromise = SalaryService.getSalary($routeParams.id);
    salaryPromise
      .then(function(salary){
        $scope.delete = salary;
      })
      .catch(function(error){
        $scope.error = true;
        $scope.message = "Något gick fel när posten skulle hämtas. Prova igen.";
      });

  }]);
