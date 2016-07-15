'use strict';

var StorageService = angular.module('StorageService',[]);

StorageService.factory('StorageServiceOp', ['$http','localStorageService', function ($http,localStorageService) {

  var StorageServiceOp = {};
  var auth_token = '';

//    set and get auth token
  StorageServiceOp.setAuthToken = function(token){


    console.log("service:-" + token);
    localStorageService.set("auth_token",token);
  };

  StorageServiceOp.getAuthToken = function(){
    auth_token =  localStorageService.get("auth_token");
    return auth_token;
  };

  return StorageServiceOp;

}]);


