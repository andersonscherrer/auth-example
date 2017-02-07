var myApp = angular.module('myApp', ['ngRoute', 'satellizer']);

/**
     * Helper auth functions
     */
    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

myApp.config(function ($authProvider){
   $authProvider.httpInterceptor = function() { return true; },
   $authProvider.withCredentials = false;
   $authProvider.tokenRoot = null;
   $authProvider.baseUrl = 'http://localhost:3000/';
   $authProvider.loginUrl = 'http://localhost:3000/auth/login';
   $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
   $authProvider.tokenName = 'token';
   $authProvider.tokenPrefix = 'auth-example';
   $authProvider.tokenHeader = 'Authorization';
   $authProvider.tokenType = 'Bearer';
   $authProvider.storageType = 'localStorage';
});


myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      resolve: {
          loginRequired: loginRequired
        }
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
    })
    .when('/me', {
      template: '<h1>This is page me!</h1>',
      resolve: {
          loginRequired: loginRequired
        }
    });
});

