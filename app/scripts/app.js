'use strict';

/**
 * @ngdoc overview
 * @name postflopStatisticsApp
 * @description
 * # postflopStatisticsApp
 *
 * Main module of the application.
 */
angular
  .module('postflopStatisticsApp', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/postflopStatistics', {
        templateUrl: 'views/postflopstatistics.html',
        controller: 'PostflopstatisticsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
