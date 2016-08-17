'use strict'

angular.module('clientApp')
.controller('TagCtrl', ['TagService', 'SalaryService', 'LocationService', '$scope', '$routeParams', function(TagService, SalaryService, LocationService, $scope, $routeParams){

  var tagPromise = TagService.getTag($routeParams.id);
  var salaries = [];

  tagPromise
    .then(function(data){
      $scope.tag = data['tag'];

      //foreach tagged salary... get salary.
      angular.forEach(data['tag'].salaries, function(value, key){

        var salaryPromise = SalaryService.getSalary(value.id);
        salaryPromise
        .then(function(salaryData){
          var salary = {
            title : salaryData['salary'].title,
            wage : salaryData['salary'].wage,
            address: null
          };

          // get salary location
          var locationPromise = LocationService.getLocation(salaryData['salary'].location.id);
          locationPromise
          .then(function(locationData){
            salary.address = locationData['location'].address;
          });
          salaries.push(salary);
        });
        $scope.salaries = salaries;
      });
    })
    .catch(function(error){
      console.log(error);
    });


}]);
