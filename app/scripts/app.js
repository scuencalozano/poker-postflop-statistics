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
    'ngTouch',
    'rzModule',
    'ngjsColorPicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/postflopstatistics.html',
        controller: 'PostflopstatisticsCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/postflopStatistics', {
        templateUrl: 'views/postflopstatistics.html',
        controller: 'PostflopstatisticsCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/postflopStatistics'
      });
  });
