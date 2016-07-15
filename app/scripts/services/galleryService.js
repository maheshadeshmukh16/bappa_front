'use strict';

var galleryService = angular.module('galleryService',[]);

galleryService.factory('galleryServiceOp', ['$http', function ($http) {

  var galleryServiceOp = {};

galleryServiceOp.getAllGalleryImage = function (auth_token) {

    return $http({

      method: 'GET',
      url: urlBase + "/getallgalleryimages/" + auth_token,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      }
    });

  };


  galleryServiceOp.addImage = function (data) {

    return $http({

      method: 'POST',
      url: urlBase + "/addgalleryimage" ,
      headers:{
        'Content-Type' : undefined
      },
      data: data
    });
  };

  galleryServiceOp.deleteGalleryImage = function (data) {
    alert("Please Update delete Image API URL");
    return false;

    return $http({

      method: 'POST',
      url: urlBase + "/deletegalleryimage" ,
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      },
      data: $.param(data)
    });
  };

  return galleryServiceOp;

}]);


