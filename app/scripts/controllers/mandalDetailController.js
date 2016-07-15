'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:mandalDetailController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiWebApp')
  .controller('mandalDetailController', function ($scope,apicallserviceOp,IdStorageOp) {



    $scope.getmandaldetails = function (data) {

      data.id = /id=([^&#=]*)/.exec(window.location.hash);
      console.log(data);

      apicallserviceOp.getmandaldetails(IdStorageOp.getmandalid())

        .success(function (response) {

          console.log(response);
          $scope.details_of_mandal = response.Result;

        }).
      error(function (err) {
        console.log(err);

      });
    };
    $scope.getmandaldetails();
  });
