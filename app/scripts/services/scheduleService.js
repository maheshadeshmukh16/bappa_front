'use strict';

var scheduleService = angular.module('scheduleService',['ngResource']);

scheduleService.factory('scheduleServiceOp', ['$http','$resource', function ($http,$resource) {

  var scheduleServiceOp = {};


  scheduleServiceOp.getAllSchedule = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getallschedule/" + auth_token,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      }
      //data: $.param()
    });

  };


  scheduleServiceOp.createSchedule = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/addschedule" ,
      headers:{
        'Content-Type' : undefined
      },
      data: data
    });
  };
  scheduleServiceOp.updateSchedule =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/updateschedule" ,
      headers:{
        'Content-Type' : undefined
      },
      data: data
    });
  };
  scheduleServiceOp.deleteSchedule =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/deleteschedule" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };



  return scheduleServiceOp;
}]);


