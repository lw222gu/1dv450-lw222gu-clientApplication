'use strict';

angular.module('clientApp')
  .controller('CreateCtrl', function ($http, $scope, $rootScope, API, $location) {
    var vm = this;
    console.log('I createcontrollern');

    if(sessionStorage['authenticated'] == 'true')
    {
      $scope.loggedIn = true;
    }
    else
    {
      $scope.loggedIn = false;
    }

    vm.submit = function(){
      var url = API.Url + 'salaries?title=' + $scope.create.title + '&wage=' + $scope.create.wage + '&address=' + $scope.create.address;
      var tagsStr = $scope.create.tags;
      var tagsArray = tagsStr.split(', ');

      for(var i = 0; i < tagsArray.length; i++)
      {
        var str = '&tags[]=' + tagsArray[i];
        url += str;
      }


      var params = {
        title: $scope.create.title,
        wage: $scope.create.wage,
        address: $scope.create.address
      };

      var config = {
        headers: {
          'X-ApiKey': API.ApiKey,
          'Authorization': sessionStorage['jwt'],
          'Accept': 'application/json'
        }
      };

      var promise = $http.post(url, params, config);

      promise.success(function(data, status, headers, config){
        console.log('sparades')
        $location.path('/');
      });

      promise.error(function(data, status, headers, config){
        console.log(error);
      });
    };
  });
