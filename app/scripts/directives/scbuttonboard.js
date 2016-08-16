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
            template: '<label type="button" ng-click="click()"></label>',
            restrict: 'E',
            replace: true,
            link: function postLink(scope, element, attrs) {
                element.text(attrs.card);
                element.attr('id', 'card' + attrs.card);
                scope.vm.desactivaButtonBoard(element, attrs.card);
                scope.click = function(){
                    scope.vm.clickBoard(element, attrs.card);
                };
            }
    };
});
