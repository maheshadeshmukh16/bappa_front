'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:galleryController
 * @description
 * # socialActivityController
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('galleryController',['$scope','apicallserviceOp','StorageServiceOp','$state','ngDialog','$filter','galleryServiceOp', function ($scope,apicallserviceOp,StorageServiceOp,$state,ngDialog,$filter,galleryServiceOp) {


    $scope.auth_token = StorageServiceOp.getAuthToken();
    $scope.submitted = false;

    if( $scope.auth_token == null  )
      $state.go("login");


    $scope.getGallery = function () {

      galleryServiceOp.getAllGalleryImage($scope.auth_token)
        .success(function (response) {
          $scope.galleryList = response.Result;
          if(!response.Result.length){
            swal("error!", "Sorry, No image available", "error");
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

    $scope.galleryPopup = function (state,id) {
      $scope.submitted = false;
      $scope.headerMessage = "";
      $scope.isUpdate = false;

      if(state){
        //$scope.isUpdate = true;
        //$scope.headerMessage = "Show Image";
        //$scope.gallery = ($filter('filter')($scope.galleryList, {id: id }))[0];

      }
      else{
        //$scope.gallery = {};
        $scope.headerMessage = "Add Image";
      }



      ngDialog.open({
        template: 'views/popup/addGallery.html',
        className: 'ngdialog-theme-default loginContainer',
        scope: $scope
      });
    };


    /**
     * addNewSA for mandal
     * @param galleryImage
     * @param isValid
     * @returns {boolean}
     */
    $scope.addNewGalleryImage = function(galleryImage,isValid){
      $scope.submitted = true;
      if(!galleryImage.image){
        return false;
      }

      if(!isValid){
        return false
      }

      var fd = new FormData();
      fd.append('image',galleryImage.image);
      fd.append('auth_token',$scope.auth_token);
      ngDialog.close();
      galleryServiceOp.addImage(fd).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.galleryList = response.Result;

      }).error(function(response){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;
      })
    };

    $scope.getGallery();


    $scope.imageZoom = function(id){
      $scope.imageData = "";
      $scope.imageData = (($filter('filter')($scope.galleryList, {id: id }))[0]);

      ngDialog.open({
        template: 'views/popup/imageZoom.html',
        className: 'ngdialog-theme-default gallery',
        scope: $scope
      });
    };

    /**
     * delete Image
     * @param id
     */
    $scope.deleteImage = function(id){

      swal({
        title: "Are you sure?",
        text: "This image will be deleted",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No",
        closeOnConfirm: false
      }, function() {
        ngDialog.close();
        var data = {
          auth_token : $scope.auth_token,
          id:id
        };
        galleryServiceOp.deleteGalleryImage(data).success(function(response){
          //  success code
          swal("Success!", response.message, "success");
          $scope.galleryList = response.Result;

        }).error(function(error){
          //  error code
          swal("error!", error.message, "error");
        }).then(function(){
          //  hide loader and other code

        })
      });

    };


  }]);
