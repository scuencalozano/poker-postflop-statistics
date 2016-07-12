'use strict';

/**
 * @ngdoc directive
 * @name postflopStatisticsApp.directive:scButtonBoard
 * @description
 * # scButtonBoard
 */
angular.module('postflopStatisticsApp')
  .directive('scButtonBoard', function () {
    return {
      template: '<label type="button" ng-click="clickb()"></label>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.text(attrs.card);

        switch(attrs.card.substring(1)){
        	case 'd':
    				element.attr('class', 'btn btn-info btn-xs');
    				break;
        	case 's':
    				element.attr('class', 'btn btn-spade btn-xs');
    				break;
  				case 'h':
    				element.attr('class', 'btn btn-danger btn-xs');
    				break;
  				case 'c':
    				element.attr('class', 'btn btn-success btn-xs');
    				break;
  				default:
    				element.attr('class', 'btn btn-default btn-xs');
    		};

        scope.clickb = function(){
        	scope.vm.clickBoard(attrs.card);
        };
      }
    };
  });
