'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:mandalDetailController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiWebApp')
  .controller('mandalDetailController', function ($scope,apicallserviceOp,StorageServiceOp) {


    $scope.getmandaldetails = function ( ) {

      

        apicallserviceOp.getmandaldetails(StorageServiceOp.getid())

          .success(function (response) {

            // StorageServiceOp.getid(response.Result.id);
            // console.log(StorageServiceOp.setid());

            $scope.details_of_mandal = response.Result;

          }).
        // console.log(data);
        error(function (err) {
          console.log(err);

        });
      };
      $scope.getmandaldetails();

  });
