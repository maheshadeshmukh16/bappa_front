'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:mandalListController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiWebApp')
  .controller('mandalListController', function ($scope,apicallserviceOp) {

    $scope.vl = "anway";

    $scope.mandallist = function ( ) {

      apicallserviceOp.mandallist()
        .success(function (response) {

          console.log(response);
          $scope.list_of_mandal = response.Result;

        }).
      error(function (err) {
        console.log(err);
        //$modalInstance.close(true);

        //swal("Cancelled",err['result'] , "error");
      });
    };
    $scope.mandallist();
  });

