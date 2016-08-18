'use strict';

angular.module('clientApp')
  .controller('ProfileCtrl', ['SalaryService', 'API', '$http', '$scope', function (Salary, API, $http, $scope, $location) {

    if(sessionStorage['authenticated'] == undefined || sessionStorage['authenticated'] == 'false')
    {
      $location.path('/login');
    }

    var url = API.Url + 'resource_owners/' + sessionStorage['userId'] + '/salaries';

    var config = {
      headers: {
        'X-ApiKey': API.ApiKey,
        'Accept': 'application/json'
      }
    };

    var promise = $http.get(url, config);

    promise.success(function(data, status, headers, config){
      console.log(data.salaries);
      $scope.salaries = data.salaries;
    });

    promise.error(function(data, status, headers, config){
      console.log("error");
    });

  }]);
