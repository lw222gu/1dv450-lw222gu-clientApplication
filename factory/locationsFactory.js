angular.module('clientApp').factory('LocationService', ['ResourceService', '$q', function(ResourceService, $q){
  var Location = ResourceService('locations');
  return {
    get: function(){
      var deferred = $q.defer();
      Location.getCollection().then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    getLocation: function(id){
      var deferred = $q.defer();
      Location.getOne(id).then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}]);
