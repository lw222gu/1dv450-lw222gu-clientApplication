angular.module('clientApp').factory('TagService', ['ResourceService', '$q', function(ResourceService, $q){
  var Tag = ResourceService('tags');
  return {
    get: function(){
      var deferred = $q.defer();
      Tag.getCollection().then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    getTag: function(id){
      var deferred = $q.defer();
      Tag.getOne(id).then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}]);
