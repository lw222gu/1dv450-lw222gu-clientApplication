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
    },

    editSalary: function(id, title, wage, latitude, longitude){
      var deferred = $q.defer();
      var salary = {
        'title': title,
        'wage': wage,
        'latitude': latitude,
        'longitude': longitude
      };
      Salary.edit(salary, id, 'salaries').then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    deleteSalary: function(id){
      var deferred = $q.defer();
      Salary.delete(id).then(function(data){
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
}]);
