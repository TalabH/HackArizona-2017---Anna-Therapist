// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function(){
  var config = {
    apiKey: "AIzaSyA99Sc1vBFfq0mrlRDQ5kJSe36CZw6hHO8",
    authDomain: "anna-fbf67.firebaseapp.com",
    databaseURL: "https://anna-fbf67.firebaseio.com",
    storageBucket: "anna-fbf67.appspot.com",
    messagingSenderId: "452766798154"
  };
  firebase.initializeApp(config);
});

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.controller("AuthCtrl", ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;

    $scope.login = function(){
      console.log('sign in button click');
      $scope.auth.$signInWithEmailAndPassword($scope.email, $scope.password);
    }

    $scope.logout = function(){
      console.log('sign out button click');
      $scope.auth.$signOut()
    }

    $scope.signup = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          console.log('Created User');
        }).catch(function(error) {
          $scope.error = error;
          console.log('Error Creating User');
        });
    };

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log((firebaseUser) ? firebaseUser : "User is not signed in.");
    });
  }
]);
