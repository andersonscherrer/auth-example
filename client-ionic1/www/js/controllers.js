angular.module('starter.controllers', [])

.controller('HomeCtrl', ['$scope', '$state', '$auth',
  function ($scope, $state, $auth) {
    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    };
}])

.controller('RegisterCtrl', function($scope) {})

.controller('LoginCtrl', ['$scope', '$state', '$auth',
  function ($scope, $state, $auth) {

    $scope.formLogin = {};

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      console.log($scope.formLogin);
      // call login from service
      $auth.login({email: $scope.formLogin.email, password: $scope.formLogin.password})
        // handle success
        .then(function (response) {
          $state.go('tab.home');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          console.log('You have successfully signed in with ' + provider + '!');
          $state.go('tab.home');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            console.error(error.message);
          } else if (error.data) {
            // HTTP response error from server
            console.error(error.data.message, error.status);
          } else {
            console.error(error);
          }
        });
    };

    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

}]);
