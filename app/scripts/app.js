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
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/postflop-statistics', {
        templateUrl: 'views/postflopstatistics.html',
        controller: 'PostflopstatisticsCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/postflopStatistics'
      });
  });
