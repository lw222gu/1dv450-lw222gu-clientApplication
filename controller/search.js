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
        console.log(data['salaries'])
        $scope.result = data['salaries'];
      });

      promise.error(function(data, status, headers, config){
        console.log(data);
      });
    };
  });
