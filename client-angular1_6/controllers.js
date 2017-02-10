angular.module('myApp').controller('loginController',
  ['$scope', '$location', '$auth',
  function ($scope, $location, $auth) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      $auth.login({email: $scope.loginForm.email, password: $scope.loginForm.password})
        // handle success
        .then(function (response) {
          $location.path('/');
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

}]);

angular.module('myApp').controller('registerController', 
  ['$scope', '$location', '$auth', 
  function ($scope, $location, $auth) {
  $scope.user = {};
  $scope.register = function () {
    $auth.signup({
      displayName: $scope.user.displayName,
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function (response) {
      console.log(response);
      $location.path('/');
    }).catch(function (response) {
      console.log(response);
      window.alert('Error: Register failed');
    });
  };
}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', '$auth',
  function ($scope, $location, $auth) {
   $scope.logout = function() {
      $auth.logout();
      $location.path('/login');
   }

}]);

