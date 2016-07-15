'use strict';

var committeeService = angular.module('committeeService',['ngResource']);

committeeService.factory('committeeServiceOp', ['$http','$resource', function ($http,$resource) {

  var committeeServiceOp = {};


  committeeServiceOp.getAllCommitteeMember = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getallcommitteemembers/" + auth_token,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      }
    });

  };


  committeeServiceOp.createCommitteeMember = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/addcommitteemember" ,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };
  committeeServiceOp.updateCommitteeMember =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/updatecommitteemember" ,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };
  committeeServiceOp.deleteCommitteeMember =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/deletecommitteemember" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };



  return committeeServiceOp;
}]);


