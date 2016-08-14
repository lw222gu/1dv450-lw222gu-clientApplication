'use strict';

angular.module('clientApp')
  .controller('LogoutCtrl', function ($location, $rootScope) {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userId');
    $location.path('/');
  });
