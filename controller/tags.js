'use strict'

angular.module('clientApp')
.controller('TagsCtrl', ['TagService', '$scope', function(TagService, $scope){

  var vm = this;

  var tagPromise = TagService.get();
  tagPromise
    .then(function(data){
      var tags = {};

      angular.forEach(data['tags'], function(value, key){
        if(value.salaries.length > 0)
        {
          tags[key] = value;
        }
      });
      $scope.tagslist = tags;
    })
    .catch(function(error){
      console.log(error);
    });
}]);
