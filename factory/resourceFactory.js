angular.module('clientApp').factory('ResourceService', function($http, API){
  return function(collectionName) {

    var Resource = function(data){
      angular.extend(this, data);
    }

    // Gets all resources
    Resource.getCollection = function(){
      var req = {
        method: 'GET',
        url: API.Url + collectionName,
        headers: {
          'X-ApiKey': API.ApiKey,
          'Accept': 'application/json'
        }
      };
      console.log('hejsan');
      return $http(req).then(function(response){
        console.log(response);
        var result = [];
        angular.forEach(response.data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });
    };
    return Resource;
  }
})
