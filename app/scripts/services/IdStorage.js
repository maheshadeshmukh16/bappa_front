'use strict';

var IdStorage = angular.module('IdStorage',[]);

IdStorage.factory('IdStorageOp', ['$http','localStorageService', function ($http,localStorageService) {

  var IdStorageOp = {};
  var mandalid = ' ';

//    set and get auth token
  IdStorageOp.setmandalid = function( data){


    console.log("service:-" + data.id);
    localStorageService.set("mandal_id",data.id);
  };

  IdStorageOp.getmandalid = function(data){
    data.id =  localStorageService.get("mandal_id");
    return data.id;
  };

  return IdStorageOp;

}]);


