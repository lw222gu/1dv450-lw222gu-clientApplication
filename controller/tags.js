'use strict'

angular.module('clientApp')
.controller('TagsCtrl', ['TagService', '$scope', function(TagService, $scope){

  var vm = this;

  var tagPromise = TagService.get();
  tagPromise
    .then(function(data){
      console.log('hej');
      console.log(data['tags']);
      console.log(data['tags'][0]['tag'])
      $scope.tagslist = data['tags'];
    })
    .catch(function(error){
      console.log(error);
    });
}]);
