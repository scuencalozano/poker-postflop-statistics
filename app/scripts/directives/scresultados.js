'use strict';

/**
 * @ngdoc directive
 * @name postflopStatisticsApp.directive:scResultados
 * @description
 * # scResultados
 */
angular.module('postflopStatisticsApp')
	.directive('scResultados', function () {
		return {
			templateUrl: 'views/sc-resultados.html',
			restrict: 'E',
			replace: true
		};
});
