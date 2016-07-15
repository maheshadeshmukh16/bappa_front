'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:commonController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('commonController', function ($scope,apicallserviceOp,StorageServiceOp,$state) {

    console.log("in controller");

    $scope.adminSignIn = function (data) {

      apicallserviceOp.login(data)
        .success(function (response) {

          console.log(response);
          StorageServiceOp.setAuthToken(response.Result.auth_token);
          console.log(StorageServiceOp.getAuthToken());
          $state.go('admin');
        }).
      error(function (err) {
        console.log(err);
        alert(err.Message);
      });
    };


    $scope.userSignIn = function (data) {

      apicallserviceOp.userSignIn(data)
        .success(function (response) {

          console.log(response);
          StorageServiceOp.setAuthToken(response.Result.auth_token);
          console.log(StorageServiceOp.getAuthToken());
          $state.go('user.committee');
        }).
      error(function (err) {
        console.log(err);
        alert(err.Message);
      });
    };

    $scope.userUpdatePassword = function (data) {

      data.auth_token = /auth_token=([^&#=]*)/.exec(window.location.hash)[1];
      console.log(data);

      apicallserviceOp.updatePassword(data)
        .success(function (response) {

          console.log(response);
          alert("Password updated succesfully");
          $state.go('user.login');
        }).
      error(function (err) {
        console.log(err);
        alert(err.Message);
      });

    }



  });
