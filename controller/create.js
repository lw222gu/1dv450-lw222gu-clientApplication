'use strict';

angular.module('clientApp')
  .controller('CreateCtrl', function ($http, $scope, $rootScope, API, $location) {
    var vm = this;

    if(sessionStorage['authenticated'] == 'true')
    {
      $scope.loggedIn = true;
    }
    else
    {
      $scope.loggedIn = false;
    }

      // POST. Not using factories since that will mess up the factories due to tags handling.
    vm.submit = function(){

      $scope.error = false;

      if($scope.create.title != null && $scope.create.wage != null && $scope.create.latitude != null && $scope.create.longitude != null){
        var url = API.Url + 'salaries?title=' + $scope.create.title + '&wage=' + $scope.create.wage + '&latitude=' + $scope.create.latitude + '&longitude=' + $scope.create.longitude;
        var tagsStr = $scope.create.tags;

        if(tagsStr != null && tagsStr != undefined && tagsStr != ""){
          var tagsArray = tagsStr.split(', ');
          for(var i = 0; i < tagsArray.length; i++)
          {
            var str = '&tags[]=' + tagsArray[i].toLowerCase();
            url += str;
          }
        }

        var params = {
          title: $scope.create.title,
          wage: $scope.create.wage,
          latitude: $scope.create.latitude,
          longitude: $scope.create.longitude
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
          $scope.error = false;
          $location.path('/');
        });

        promise.error(function(data, status, headers, config){
          $scope.error = true;
          $scope.message = "Något gick fel när posten skulle sparas.";
        });
      }
      else {
        $scope.error = true;
        $scope.message = "Du har inte angett samtliga obligatoriska fält.";
      }
    };
  });
