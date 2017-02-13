// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'satellizer', 'starter.controllers']);
app.run(function($ionicPlatform, $rootScope, $state, $auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate){
      if (!$auth.isAuthenticated()) {
        $state.go('login');
        event.preventDefault();
      }
    }
  });
})

app.config(function ($authProvider){
   $authProvider.httpInterceptor = function() { return true; },
   $authProvider.withCredentials = false;
   $authProvider.tokenRoot = null;
   $authProvider.baseUrl = 'http://192.168.1.103:3000/';
   $authProvider.loginUrl = 'http://192.168.1.103:3000/auth/login';
   $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
   $authProvider.tokenName = 'token';
   $authProvider.tokenPrefix = 'auth-example';
   $authProvider.tokenHeader = 'Authorization';
   $authProvider.tokenType = 'Bearer';
   $authProvider.storageType = 'localStorage';

   $authProvider.facebook({
      clientId: '1673859926247382',
      url: 'http://192.168.1.103:3000/auth/facebook'
    });
    $authProvider.google({
       clientId: '262858903544-7gj2s4eu3saa6kdt0s2smt4pr0a6863a.apps.googleusercontent.com',
       url: 'http://192.168.1.103:3000/auth/google'
     });
});

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
 .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    authenticate: false
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    },
    authenticate: true
  })

  .state('tab.register', {
    url: '/register',
    views: {
      'tab-register': {
        templateUrl: 'templates/tab-register.html',
        controller: 'RegisterCtrl'
      }
    },
    authenticate: false
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    authenticate: false
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
