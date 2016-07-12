'use strict';

/**
 * @ngdoc directive
 * @name postflopStatisticsApp.directive:scButton
 * @description
 * # scButton
 */
 angular.module('postflopStatisticsApp')
 .directive('scButton', function () {
 	return {
 		template: '<label type="button" ng-click="click()"></label>',
 		restrict: 'E',
 		replace: true,
 		link: function postLink(scope, element, attrs) {

 			var card = attrs.card;
 			element.text(card);
 			element.attr('id', 'card' + card);
 			scope.vm.desactivaButton(element, card);

 			scope.click = function(){
 				scope.vm.shuffleButton(element, card);
 			};
 		}
 	};
 });
