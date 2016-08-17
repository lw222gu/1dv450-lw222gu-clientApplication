angular.module('clientApp').factory('SalaryService', ['ResourceService', '$q', function(ResourceService, $q){
  var Salary = ResourceService('salaries');
  return {
    get: function(){
      var deferred = $q.defer();
      Salary.getCollection().then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    getSalary: function(id){
      var deferred = $q.defer();
      Salary.getOne(id).then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}]);
