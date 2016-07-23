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
      replace: true,
      scope: {
      	result: '='
      },
      link: {
        post: function postLink(scope, element, attrs) {
          scope.newEstado = attrs.estado === 'flop' ? 'turn' : 'river';
          scope.typeButton = attrs.estado === 'flop' ? 'btn-info' : attrs.estado === 'turn' ? 'btn-danger' : 'btn-warning';
          scope.muestraChild = false;
          scope.click = function(){
              if((scope.result.cCheck === '')){
                scope.muestraChild = !scope.muestraChild;
              }
              scope.result.cCheck = (scope.result.cCheck === '') ? '' : (scope.result.cCheck.indexOf('-check') > -1) ? 'state-icon glyphicon glyphicon-unchecked' : 'state-icon glyphicon glyphicon-check';
          };
        }
      }
    };
  });
