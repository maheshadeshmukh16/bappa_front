'use strict';

/**
 * @ngdoc overview
 * @name ganpatiWebApp
 * @description
 * # ganpatiWebApp
 *
 * Main module of the application.
 */
angular
  .module('ganpatiWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ApiCallService',
    'StorageService',
    'LocalStorageModule'
   // 'ngDialog',
   // 'SAService'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    // Now set up the states
    $stateProvider
      .state('homepage', {
        url: "/",

        views: {
          '': {
            templateUrl: "views/web_homepage.html"
          }
        }
      })

      .state('home', {
        url: "/home",
        views : {
          '': {
            templateUrl: "views/web_homepage.html"


          },

          'nav@home': {
            templateUrl: "views/web_nav.html"
            // controller : "AdminCtrl"
          },
          'content_body@home': {
            templateUrl: "views/wel_come.html"
            // controller : "AdminCtrl"
          }
        }
      })

    .state('home.mandals', {
      url: "/List_Of_Mandals",
      views : {
        '': {
          templateUrl: "views/web_homepage.html"


        },

        'nav@home': {
          templateUrl: "views/web_nav.html"
          // controller : "AdminCtrl"
        },
        'content_body@home': {
          templateUrl: "views/list_of_mandals.html",
           controller : "mandalListController"
        }
      }
    })


    .state('home.details', {
      url: "/Details_Of_Mandals",
      views : {
        '': {
          templateUrl: "views/web_homepage.html"


        },

        'nav@home': {
          templateUrl: "views/web_nav.html"
          // controller : "AdminCtrl"
        },
        'content_body@home': {
          templateUrl: "views/mandal_details.html",
          controller : "mandalDetailController"
        }
      }
    });

    console.log("in app");


  });
