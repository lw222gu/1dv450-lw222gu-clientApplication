angular.module('clientApp').factory('LocationService', ['ResourceService', '$q', function(ResourceService, $q){
  var Location = ResourceService('locations');
  //console.log(Location);
  return {
    get: function(){
      var deferred = $q.defer();
      Location.getCollection().then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}]);
