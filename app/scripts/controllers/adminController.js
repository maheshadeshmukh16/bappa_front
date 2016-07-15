'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:adminController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('adminController', function ($scope,apicallserviceOp,StorageServiceOp,$state) {

    $scope.vl = "anway";

    $scope.getAllMandals = function (data) {

      apicallserviceOp.getAllMandals(StorageServiceOp.getAuthToken())
        .success(function (response) {

          console.log(response);
          $scope.mandal_list = response.Result;

        }).
      error(function (err) {
        console.log(err);
        //$modalInstance.close(true);

        //swal("Cancelled",err['result'] , "error");
      });
    };

    $scope.createMandal = function (data) {

      console.log(data);

      data['auth_token'] = StorageServiceOp.getAuthToken();
      apicallserviceOp.createMandal(data)
        .success(function (response) {

          alert(response.Message);
          $state.go("admin");
          console.log(response);
        }).
      error(function (err) {
        console.log(err);
        //$modalInstance.close(true);
        //swal("Cancelled",err['result'] , "error");
      });
    };

    $scope.getAllMandals();
  });
