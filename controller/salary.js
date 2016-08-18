'use strict'

angular.module('clientApp')
.controller('SalaryCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', function(TagService, SalaryService, LocationService, $scope, $routeParams){
  console.log('salary controller');

  var salaryPromise = SalaryService.getSalary($routeParams.id);
  //var salaries = [];

  salaryPromise
    .then(function(data){
      console.log(data['salary']);
      $scope.salary = data['salary'];

      //foreach tagged salary... get salary.
      angular.forEach(data['salary'].tags, function(value, key){

      });
    })
    .catch(function(error){
      console.log(error);
    });

}]);
