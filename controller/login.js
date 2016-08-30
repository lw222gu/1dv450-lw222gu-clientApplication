'use strict';

angular.module('clientApp')
  .controller('LoginCtrl', function ($http, $scope, API, $location, Authenticated) {
    var vm = this;

    vm.submit = function(){
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
        $scope.error = false;
        sessionStorage['authenticated'] = true;
        sessionStorage['jwt'] = data.token;
        sessionStorage['userId'] = data.user_id;
        $location.path('/');
      });

      promise.error(function(data, status, headers, config){
        $scope.error = true;
        $scope.errorMessage = "Du har angivit felaktiga inloggningsuppgifter. Prova igen."
        sessionStorage.setItem('userId', null);
        sessionStorage.setItem('jwt', null);
      });
    };
  });
