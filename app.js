'use strict'

angular.module('clientApp',[
  'ngRoute'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'view/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .when('/login', {
    templateUrl: 'view/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .when('/profile', {
    templateUrl: 'view/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile'
  })
  .when('/logout', {
    templateUrl: 'view/logout.html',
    controller: 'LogoutCtrl',
    controllerAs: 'logout'
  })
  .otherwise({
    redirectTo: '/'
  })
})
.constant('API', {
  ApiKey: '1234567890',
  Url: 'http://localhost:4000/api/v1/'
});
