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
      template: '<label type="button" class="btn {{tipo}} btn-xs">{{card}}</label>',
      restrict: 'E',
      replace: true,
      scope: {
      	card: '=',
      	aceptados: '='
      },
      link: function postLink(scope, element) {
        if(scope.card.length === 2){
        	scope.tipo = 'btn-success';
        }else{
	        if(scope.card.indexOf('s') > 0){
  	      	scope.tipo = 'btn-default';
	        }else{
	        	scope.tipo = 'btn-default';
  	      }
      	}
				function functionToBeCalled () {
					if(element.attr('class').indexOf('danger') > 0){
						var index = scope.aceptados.indexOf(scope.card);
						if (index > -1) {
						    scope.aceptados.splice(index, 1);
						}
						console.log('borra!', scope.card, scope.aceptados);
						element.attr('class', 'btn ' + scope.tipo + ' btn-xs');
					}else{
						scope.aceptados.push(scope.card);
						console.log('agrega!', scope.card, scope.aceptados);
						element.attr('class', 'btn btn-danger btn-xs');
					}
				}

				element.on('click', functionToBeCalled);
      }
    };
  });
