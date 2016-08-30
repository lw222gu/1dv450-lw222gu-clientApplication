'use strict'

angular.module('clientApp')
.controller('SalaryCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', function(TagService, SalaryService, LocationService, $scope, $routeParams){
  console.log('salary controller');

  var salaryPromise = SalaryService.getSalary($routeParams.id);
  $scope.error = false;

  salaryPromise
    .then(function(data){
      $scope.salary = data['salary'];
    })
    .catch(function(error){
      $scope.error = true;
      $scope.message = "Något gick fel när den registrerade lönen skulle hämtas.";
    });

}]);
