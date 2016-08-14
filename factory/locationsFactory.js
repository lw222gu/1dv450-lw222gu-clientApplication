angular
  .module('clientApp')
  .factory('LocationService', LocationService);

LocationService.$inject = ['ResourceService', '$q'];

function LocationService(ResourceService, $q){
  var Location = ResourceService('locations');
  return {
    get: function(){
      var deferred = $q.defer();
      Location.getCollection().then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
};
