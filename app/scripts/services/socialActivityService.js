'use strict';

var SAService = angular.module('SAService',['ngResource']);

SAService.factory('SAServiceOp', ['$http','$resource', function ($http,$resource) {

  var SAServiceOp = {};


  SAServiceOp.getAllSA = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getallsocialwork/" + auth_token,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      }
      //data: $.param()
    });

  };


  SAServiceOp.createSA = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/addsocialwork" ,
      headers:{
        'Content-Type' : undefined
      },
      data: data
    });
  };
  SAServiceOp.updateSA =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/updatesocialwork" ,
      headers:{
        'Content-Type' : undefined
      },
      data: data
    });
  };
  SAServiceOp.deleteSA =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/deletesocialwork" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };



  return SAServiceOp;
}]);


