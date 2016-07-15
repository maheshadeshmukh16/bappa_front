'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:socialActivityController
 * @description
 * # socialActivityController
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('socialActivityController',['$scope','apicallserviceOp','StorageServiceOp','$state','ngDialog','$filter','SAServiceOp', function ($scope,apicallserviceOp,StorageServiceOp,$state,ngDialog,$filter,SAServiceOp) {


    $scope.auth_token = StorageServiceOp.getAuthToken();
    $scope.submitted = false;


    if( $scope.auth_token == null  )
      $state.go("login");


    $scope.getSA = function () {

      SAServiceOp.getAllSA($scope.auth_token)
        .success(function (response) {

          $scope.SAList = response.Result;
          if(!response.Result.length){
            swal("error!", "Sorry, you have not added any activity yet!", "error");
          }
        })
        .error(function (error) {
          swal("error!", error.message, "error");
        })
    };


    /**
     * open add SA popup
     * used ngDialog
     */

    $scope.SAPopup = function (state,id) {
      $scope.submitted = false;
      $scope.headerMessage = "";
      $scope.isUpdate = false;

      if(state){
        $scope.isUpdate = true;
        $scope.headerMessage = "Update Social Activity";
        $scope.SA = ($filter('filter')($scope.SAList, {id: id }))[0];

      }
      else{
        $scope.SA = {};
        $scope.headerMessage = "Add Social Activity";
      }



      ngDialog.open({
        template: 'views/popup/addSA.html',
        className: 'ngdialog-theme-default loginContainer',
        scope: $scope
      });
    };


    /**
     * addNewSA for mandal
     * @param SAData
     * @param isValid
     * @returns {boolean}
     */
    $scope.addNewSA = function(SAData,isValid){
      $scope.submitted = true;
      if(!isValid){
        return false
      }

      SAData.auth_token = $scope.auth_token;
      var fd = new FormData();
      fd.append('auth_token',$scope.auth_token);
      fd.append('title',SAData.title);
      fd.append('description',SAData.description);
      fd.append('image',SAData.image);
      ngDialog.close();
      SAServiceOp.createSA(fd).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.SAList = response.Result;

      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * updateSA for mandal
     * @param SAData
     * @param isValid
     * @returns {boolean}
     */
    $scope.updateSA = function(SAData,isValid){
      $scope.submitted = true;
      if(!isValid){
        return false
      }
      SAData.auth_token = $scope.auth_token;
      var fd = new FormData();
      fd.append('auth_token',$scope.auth_token);
      fd.append('title',SAData.title);
      fd.append('description',SAData.description);
      fd.append('image',SAData.image);
      fd.append('id',SAData.id);
      ngDialog.close();
      SAServiceOp.updateSA(fd).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.SAList = response.Result;


      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * delete SA
     * @param id
     */
    $scope.SADelete = function(id){

      swal({
        title: "Are you sure?",
        text: "This activity will be deleted",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No",
        closeOnConfirm: false
      }, function() {
        var data = {
          auth_token : $scope.auth_token,
          id:id
        };
        SAServiceOp.deleteSA(data).success(function(response){
          //  success code
          swal("Success!", response.message, "success");
          $scope.SAList = response.Result;


        }).error(function(error){
          //  error code
          swal("error!", error.message, "error");
        }).then(function(){
          //  hide loader and other code

        })
      });

    };

    $scope.getSA();




  }]);
