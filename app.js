'use strict'

angular.module('clientApp',[
  'ngRoute',
  'leaflet-directive'
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
  .when('/tags/:id', {
    templateUrl: 'view/tag.html',
    controller: 'TagCtrl',
    controllerAs: 'tag'
  })
  .when('/search', {
    templateUrl: 'view/search.html',
    controller: 'SearchCtrl',
    controllerAs: 'search'
  })
  .otherwise({
    redirectTo: '/'
  })
})
.constant('API', {
  ApiKey: '1234567890',
  Url: 'http://localhost:4000/api/v1/',
  BaseUrl: 'http://localhost:4000'
});
