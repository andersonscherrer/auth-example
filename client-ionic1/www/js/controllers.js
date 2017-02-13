angular.module('starter.controllers', ['ionic'])

.controller('HomeCtrl', ['$scope', '$state', '$auth',
  function ($scope, $state, $auth) {
    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    };
}])

.controller('RegisterCtrl', function($scope) {})

.controller('LoginCtrl', ['$scope', '$state', '$auth', '$ionicLoading',
  function ($scope, $state, $auth, $ionicLoading) {

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
      $ionicLoading.show({
        template: 'Logging in...'
      });
      if(provider === 'google' && window.plugins){
        window.plugins.googleplus.isAvailable(
            function (available) {
              if (available) {
                window.plugins.googleplus.login(
                  {
                    'scopes': 'profile email',
                    'webClientId': '262858903544-7gj2s4eu3saa6kdt0s2smt4pr0a6863a.apps.googleusercontent.com',
                    'offline': true
                  },
                  function (user_data) {
                    // For the purpose of this example I will store user data on local storage
                    //UserService.setUser({
                    //  userID: user_data.userId,
                    //  name: user_data.displayName,
                    //  email: user_data.email,
                    //  picture: user_data.imageUrl,
                    //  accessToken: user_data.accessToken,
                    //  idToken: user_data.idToken
                    //});
                    console.log('User: ' + JSON.stringify(user_data));
                    $ionicLoading.hide();
                    $state.go('tab.home');
                  },
                  function (msg) {
                    $ionicLoading.hide();
                    console.log('Error: ' + JSON.stringify(msg));
                  }
                );
              }
            }
        );
      }else if (provider === 'facebook' && window.plugins){

        window.facebookConnectPlugin.login(["email","public_profile", "user_birthday"],
          function (userData) {
            console.log('User: ' + JSON.stringify(userData));
            window.facebookConnectPlugin.api(userData.authResponse.userID + "/?fields=id,email", ["user_birthday"],
              function (result) {
                  alert("Result: " + JSON.stringify(result));
                  /* alerts:
                      {
                          "id": "000000123456789",
                          "email": "myemail@example.com"
                      }
                  */
              },
              function (error) {
                  alert("Failed: " + JSON.stringify(error));
              });
            $ionicLoading.hide();
            //window.facebookConnectPlugin.getAccessToken(function(token) {
              //console.log("Token: " + token);
              //$ionicLoading.hide();
            //});
          },
          function (error) {
            $ionicLoading.hide();
            console.log('Error: ' + JSON.stringify(error));
          }
        );
      }else{
        $auth.authenticate(provider)
          .then(function() {
            console.log('You have successfully signed in with ' + provider + '!');
            $ionicLoading.hide();
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
            $ionicLoading.hide();
          });
        }
    };

    $scope.logout = function() {
      $auth.logout();
      $state.go('login');
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

}]);
