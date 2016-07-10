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
 		template: '<label type="button"></label>',
 		restrict: 'E',
 		replace: true,
 		link: function postLink(scope, element, attrs) {

 			function getType(card){
 				return (card.length === 2) ?  'btn-success' : (card.indexOf('s') > 0) ? 'btn-default' : 'btn-default';
 			}

 			function eventButton() {
 				if(element.attr('class').indexOf('danger') > 0){
 					element.attr('class', 'btn ' + getType(attrs.card) + ' btn-xs');
 				}else{
 					element.attr('class', 'btn btn-danger btn-xs');
 				}
 				scope.handlerCard(attrs.card);
 			}

 			element.text(attrs.card);
 			element.attr('class', 'btn ' + getType(attrs.card) + ' btn-xs');
 			element.on('click', eventButton);
 		}
 	};
 });
