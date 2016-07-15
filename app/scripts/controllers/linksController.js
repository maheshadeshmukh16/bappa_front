'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:linksController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('linksController',['$scope','apicallserviceOp','StorageServiceOp','$state','ngDialog','$filter', function ($scope,apicallserviceOp,StorageServiceOp,$state,ngDialog,$filter) {


    $scope.auth_token = StorageServiceOp.getAuthToken();
    $scope.submitted = false;

    console.log(StorageServiceOp.getAuthToken());

    if( $scope.auth_token == null  )
      $state.go("user.login");


    $scope.getAllLinks = function () {

      apicallserviceOp.getAllLinks($scope.auth_token)
        .success(function (response) {
          $scope.all_links = response.Result;
          if(!response.Result.length){
            swal("error!", "Sorry, You have not added any links yet!", "error");
          }
        })
        .error(function (error) {
          swal("error!", error.message, "error");
        })
    };

    $scope.getAllLinks();

    /**
     * open add link popup
     * used ngDialog
     */

    $scope.linkPopup = function (state,id) {
      $scope.submitted = false;
      $scope.headerMessage = "";
      $scope.isUpdate = false;

      if(state){
        $scope.isUpdate = true;
        $scope.headerMessage = "Update Link";
        $scope.link = ($filter('filter')($scope.all_links, {id: id }))[0];

      }
      else{
        $scope.headerMessage = "Add Link";
      }

      ngDialog.open({
        template: 'views/popup/addLinks.html',
        className: 'ngdialog-theme-default loginContainer',
        scope: $scope
      });
    };


    /**
     * addNewLink for mandal
     * @param linkData
     * @param isValid
     * @returns {boolean}
     */
    $scope.addNewLink = function(linkData,isValid){
      $scope.submitted = true;
      if(!isValid){
        return false
      }

      linkData.auth_token = $scope.auth_token;
      ngDialog.close();
      apicallserviceOp.createLink(linkData).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.all_links = response.Result;

      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");

      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * updateLink for mandal
     * @param linkData
     * @param isValid
     * @returns {boolean}
     */
    $scope.updateLink = function(linkData,isValid){
      $scope.submitted = true;
      console.log(linkData);
      if(!isValid){
        return false
      }
      linkData.auth_token = $scope.auth_token;
      ngDialog.close();
      apicallserviceOp.updateLink(linkData).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.all_links = response.Result;


      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");

      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * delete link
     * @param id
     */
    $scope.linkDelete = function(id){

      swal({
        title: "Are you sure?",
        text: "This link will be deleted",
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
        apicallserviceOp.deleteLink(data).success(function (response) {
          //  success code
          swal("Success!", response.message, "success");
          $scope.all_links = response.Result;


        }).error(function (error) {
          //  error code
          swal("error!", error.message, "error");

        }).then(function () {
          //  hide loader and other code

        })
      })
    }
  }]);
