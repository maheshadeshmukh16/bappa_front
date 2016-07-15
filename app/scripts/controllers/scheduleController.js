'use strict';

/**
 * @ngdoc function
 * @name ganpatiApp.controller:scheduleController
 * @description
 * # AboutCtrl
 * Controller of the ganpatiApp
 */


angular.module('ganpatiApp')
  .controller('scheduleController',['$scope','apicallserviceOp','StorageServiceOp','$state','ngDialog','$filter','scheduleServiceOp', function ($scope,apicallserviceOp,StorageServiceOp,$state,ngDialog,$filter,scheduleServiceOp) {


    $scope.auth_token = StorageServiceOp.getAuthToken();
    $scope.submitted = false;


    if( $scope.auth_token == null  )
      $state.go("login");


    $scope.getSchedule = function () {

      scheduleServiceOp.getAllSchedule($scope.auth_token)
        .success(function (response) {

          $scope.scheduleList = response.Result;
          if(!response.Result.length){
            swal("error!", "Sorry, you have not added any schedule yet!", "error");
          }
        })
        .error(function (error) {
          swal("error!", error.message, "error");
        })
    };


    /**
     * open add Schedule popup
     * used ngDialog
     */

    $scope.schedulePopup = function (state,id) {
      $scope.submitted = false;
      $scope.headerMessage = "";
      $scope.isUpdate = false;

      if(state){
        $scope.isUpdate = true;
        $scope.headerMessage = "Update Schedule";
        $scope.schedule = ($filter('filter')($scope.scheduleList, {id: id }))[0];

      }
      else{
        $scope.schedule = {};
        $scope.headerMessage = "Add Schedule";
      }



      ngDialog.open({
        template: 'views/popup/addSchedule.html',
        className: 'ngdialog-theme-default schedule',
        scope: $scope
      });
    };


    /**
     * addNewSchedule for mandal
     * @param scheduleData
     * @param isValid
     * @returns {boolean}
     */
    $scope.addNewSchedule = function(scheduleData,isValid){
      $scope.submitted = true;
      $scope.noFromDate = false;
      $scope.noToDate = false;

      if(!angular.element("#datetimepicker1 input").val()){
        $scope.noFromDate = true;
      }
      if(!angular.element("#datetimepicker2 input").val()){
        $scope.noToDate = true;
      }

      if(!isValid){
        return false
      }



      scheduleData.auth_token = $scope.auth_token;
      var fd = new FormData();
      fd.append('auth_token',$scope.auth_token);
      fd.append('title',scheduleData.title);
      fd.append('from_datetime',new Date(angular.element("#datetimepicker1 input").val()).getTime());
      fd.append('to_datetime',new Date(angular.element("#datetimepicker2 input").val()).getTime());
      fd.append('description',scheduleData.description);
      fd.append('image',scheduleData.image);
      ngDialog.close();

      scheduleServiceOp.createSchedule(fd).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.scheduleList = response.Result;

      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");
      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * updateSchedule for mandal
     * @param scheduleData
     * @param isValid
     * @returns {boolean}
     */
    $scope.updateSchedule = function(scheduleData,isValid){
      $scope.submitted = true;
      if(!isValid){
        return false
      }
      scheduleData.auth_token = $scope.auth_token;
      var fd = new FormData();
      fd.append('auth_token',$scope.auth_token);
      fd.append('title',scheduleData.title);
      fd.append('from_datetime',new Date(angular.element("#datetimepicker1 input").val()).getTime());
      fd.append('to_datetime',new Date(angular.element("#datetimepicker2 input").val()).getTime());
      fd.append('description',scheduleData.description);
      fd.append('image',scheduleData.image);
      fd.append('id',scheduleData.id);
      ngDialog.close();
      scheduleServiceOp.updateSchedule(fd).success(function(response){
        //  success code
        swal("Success!", response.message, "success");
        $scope.scheduleList = response.Result;


      }).error(function(error){
        //  error code
        swal("error!", error.message, "error");

      }).then(function(){
        //  hide loader and other code
        $scope.submitted = false;

      })
    };

    /**
     * delete Schedule
     * @param id
       */
    $scope.scheduleDelete = function(id){

      swal({
        title: "Are you sure?",
        text: "This schedule will be deleted",
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
        scheduleServiceOp.deleteSchedule(data).success(function(response){
          //  success code
          swal("Success!", response.message, "success");
          $scope.scheduleList = response.Result;


        }).error(function(error){
          //  error code
          swal("error!", error.message, "error");

        }).then(function(){
          //  hide loader and other code

        })
      })

    };

    $scope.getSchedule();

  }]);
