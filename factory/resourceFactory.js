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
      return $http(req).then(function(response){
        var result = [];
        angular.forEach(response.data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });
    };


    // Gets one resource
    Resource.getOne = function(id){
      var req = {
        method: 'GET',
        url: API.Url + collectionName + '/' + id,
        headers: {
          'X-ApiKey': API.ApiKey,
          'Accept': 'application/json'
        }
      };
      return $http(req).then(function(response){
        var result = [];
        angular.forEach(response.data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });
    };

    Resource.edit = function(object, id, collection){
      var req = {
        method: 'PUT',
        url: API.Url + collection + '/' + id + '?',
        headers: {
          'X-ApiKey': API.ApiKey,
          'Authorization': sessionStorage['jwt'],
          'Accept': 'application/json'
        }
      };

      // Känns som en riktig fullösning, men lyckas inte lösa det på annat sätt.
      angular.forEach(object, function(value, key){
        var str = key + '=' + value + '&';
        req.url += str;
      });

      return $http(req).then(function(response){
        var result = [];
        angular.forEach(response.data, function(value, key){
          result[key] = new Resource(value);
        });
        return result;
      });
    };

    Resource.delete = function(id){
      var req = {
        method: 'DELETE',
        url: API.Url + collectionName + '/' + id,
        headers: {
          'X-ApiKey': API.ApiKey,
          'Authorization': sessionStorage['jwt'],
          'Accept': 'application/json'
        }
      };
      return $http(req).then(function(response){
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
