angular
.module('clientApp')
.factory('ResourceService', ResourceService);
ResourceService.$inject = ['$http', 'API'];

function ResourceService($http, API){
  return function(collectionName) {

    var Resource = function(data){
      angular.extend(this, data);
    }
    // Gets all resources
    Resource.getCollection = function(){

      /*var url = API.Url + collectionName;
      var config = {
        headers: {
          'X-ApiKey': API.ApiKey,
          'Accept': 'application/json'
        }
      };

      var promise = $http.get(url, config);

      promise.success(function(data, status, headers, config){
        var result = [];
        angular.forEach(data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });

      promise.error(function(data, status, headers, config){
      });*/

        var req = {
        method: 'GET',
        url: API.Url + collectionName,
        headers: {
          'X-ApiKey': API.ApiKey
        }
      };

      return $http(req).then(function(response){
        console.log(req);
        console.log('response: ' + response);
        var result = [];
        angular.forEach(response.data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });
    };
    return Resource;
  }
};
