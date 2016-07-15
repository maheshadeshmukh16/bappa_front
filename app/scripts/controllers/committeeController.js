'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:committeeController
 * @description
 * # socialActivityController
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('committeeController',['$scope','apicallserviceOp','StorageServiceOp','$state','ngDialog','$filter','committeeServiceOp', function ($scope,apicallserviceOp,StorageServiceOp,$state,ngDialog,$filter,committeeServiceOp) {


    $scope.auth_token = StorageServiceOp.getAuthToken();
    $scope.submitted = false;


    if( $scope.auth_token == null  )
      $state.go("login");


    $scope.getCommitteeMember = function () {

      committeeServiceOp.getAllCommitteeMember($scope.auth_token)
        .success(function (response) {

          $scope.committeeMemberList = response.Result;
          if(!response.Result.length){
            swal("error!", "Sorry, You have not added any member yet!", "error");
          }
        })
        .error(function (error) {
          swal("error!", error.message, "error");
        })
    };


    /**
     * open add committeeMemberPopup
     * used ngDialog
     */

    $scope.committeeMemberPopup = function (state,id) {
      $scope.submitted = false;
      $scope.headerMessage = "";
      $scope.isUpdate = false;

      if(state){
        $scope.isUpdate = true;
        $scope.headerMessage = "Update Committee";
        $scope.committeeMember = ($filter('filter')($scope.committeeMemberList, {id: id }))[0];

      }
      else{
        $scope.committeeMember = {};
        $scope.headerMessage = "Add Committee";
      }



      ngDialog.open({
        template: 'views/popup/addCommitteeMember.html',
        className: 'ngdialog-theme-default loginContainer',
        scope: $scope
      });
    };


    /**
     * addNewCommitteeMember for mandal
     * @param committeeMemberData
     * @param isValid
     * @returns {boolean}
     */
    $scope.addNewCommitteeMember = function(committeeMemberData,isValid){
      $scope.submitted = true;

      if(!isValid){
        return false
      }

      committeeMemberData.auth_token = $scope.auth_token;
      ngDialog.close();
      committeeServiceOp.createCommitteeMember(committeeMemberData).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.committeeMemberList = response.Result;

      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        $scope.submitted = false;
        //  hide loader and other code

      })
    };

    /**
     * updateCommitteeMember for mandal
     * @param committeeMemberData
     * @param isValid
     * @returns {boolean}
     */
    $scope.updateCommitteeMember = function(committeeMemberData,isValid){
      $scope.submitted = true;
      if(!isValid){
        return false
      }
      committeeMemberData.auth_token = $scope.auth_token;
      ngDialog.close();
      committeeServiceOp.updateCommitteeMember(committeeMemberData).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.committeeMemberList = response.Result;


      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * delete CommitteeMember
     * @param id
     */
    $scope.committeeMemberDelete = function(id){

      swal({
        title: "Are you sure?",
        text: "This member will be deleted",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No",
        closeOnConfirm: false
      }, function() {
        var data = {
          auth_token: $scope.auth_token,
          id: id

        };
        committeeServiceOp.deleteCommitteeMember(data).success(function (response) {
          //  success code
          swal("Success!", response.message, "success");
          $scope.committeeMemberList = response.Result;


        }).error(function (error) {
          //  error code
          swal("error!", error.message, "error");
        }).then(function () {
          //  hide loader and other code

        })
      });

    };

    $scope.getCommitteeMember();




  }]);
