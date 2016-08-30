'use strict'

angular.module('clientApp')
.controller('TagsCtrl', ['TagService', '$scope', function(TagService, $scope){
  var vm = this;

  var tagPromise = TagService.get();
  tagPromise
    .then(function(data){
      var tags = {};
      angular.forEach(data['tags'], function(value, key){
        if(value.salaries.length > 0) // If tag doesn't contain any salaries, then don't add it to tags object.
        {
          tags[key] = value;
        }
      });
      $scope.tagslist = tags;
    })
    .catch(function(error){
      console.log(error);
    });
}])
.directive('tags', function(){ //custom directive for a list of tags
  console.log("direktiv!")
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'directive/templates/tag-list-template.html'
  }
});
