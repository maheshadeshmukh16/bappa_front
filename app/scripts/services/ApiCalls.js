'use strict';

var ApiCallService = angular.module('ApiCallService',['ngResource']);

ApiCallService.factory('apicallserviceOp', ['$http','$resource', function ($http,$resource) {

  var apicallserviceOp = {};


  apicallserviceOp.login = function (admin_credentials) {

    return $http({

      method: 'POST',
      url: urlBase + "/adminsignin",
      headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
      data: $.param(admin_credentials)
    });
  };

  apicallserviceOp.getAllMandals = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getallmandals/" + auth_token,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
      // data: $.param(admin_credentials)
    });
  };

  apicallserviceOp.mandallist = function ( ) {

    return $http({

      method: 'GET',
      url: urlBase + "/user/getmandallist" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
      // data: $.param(admin_credentials)
    });
  };


  apicallserviceOp.getmandaldetails = function ( ) {

    return $http({

      method: 'GET',
      url: urlBase + "/user/getmandaldetails/" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
      // data: $.param(admin_credentials)
    });
  };

  apicallserviceOp.createMandal = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/createmandal",
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };


  apicallserviceOp.updatePassword = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/updatepassword",
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };


  apicallserviceOp.userSignIn = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/mandalsignin",
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };

  apicallserviceOp.getAllLinks = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getalllinks/" + auth_token,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      }
      //data: $.param()
    });

  };


  apicallserviceOp.createLink = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/createlink" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };
  apicallserviceOp.updateLink =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/updatelink" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };
  apicallserviceOp.deleteLink =  function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/deletelink" ,
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };



  return apicallserviceOp;
}]);


