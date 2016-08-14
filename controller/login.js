'use strict';

angular.module('clientApp')
  .controller('LoginCtrl', function ($http, $scope, $rootScope, API, $location, Authenticated) {
    var vm = this;
    console.log('I logincontrollern');

    vm.submit = function(){

      // TODO: if username and password is provided

      var url = API.Url + 'auth';

      var params = {
        username: $scope.login.user.username,
        password: $scope.login.user.password
      };

      var config = {
        headers: {
          'X-ApiKey': API.ApiKey,
          'Accept': 'application/json'
        }
      };

      var promise = $http.post(url, params, config);

      promise.success(function(data, status, headers, config){
        sessionStorage['authenticated'] = true;
        sessionStorage['jwt'] = data.token;
        sessionStorage['userId'] = data.user_id;
        $location.path('/');
      });

      promise.error(function(data, status, headers, config){
        console.log("fel inloggningsuppgifter");
        sessionStorage.setItem('userId', null);
        sessionStorage.setItem('jwt', null);
      });
    };
  });
