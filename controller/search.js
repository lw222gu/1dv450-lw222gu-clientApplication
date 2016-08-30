'use strict';

angular.module('clientApp')
  .controller('SearchCtrl', function ($http, $scope, $rootScope, API, $location, Authenticated) {
    var vm = this;
    console.log('I searchcontrollern');

    vm.submit = function(){

      var url = API.Url + 'salaries?search=' + $scope.search.search;

      var config = {
        headers: {
          'X-ApiKey': API.ApiKey,
          'Accept': 'application/json'
        },
        params: {
         search: $scope.search.search
       }
      };

      var promise = $http.get(url, config);

      promise.success(function(data, status, headers, config){
        console.log(data['salaries']);
        if(data['salaries'].length !== 0)
        {
          $scope.result = data['salaries'];
          $scope.error = false;
        }
        else {
          $scope.error = true;
          $scope.errorMessage = "Inga löner som matchade din sökning hittades.";
        }
      });

      promise.error(function(data, status, headers, config){
        console.log(data);
      });
    };
  });
