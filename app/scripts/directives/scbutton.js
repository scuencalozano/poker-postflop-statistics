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

 			var card = attrs.card;
 			element.text(card);
 			element.attr('id', 'card' + card);
 			var typeButton = (card.length === 2) ?  'btn-success' : (card.indexOf('s') > 0) ? 'btn-default' : 'btn-default';
			element.attr('class', 'btn ' + typeButton + ' btn-xs');

 			element.on('click', function(){
 				scope.vm.shuffleButton(element, card);
 			});
 		}
 	};
 });
