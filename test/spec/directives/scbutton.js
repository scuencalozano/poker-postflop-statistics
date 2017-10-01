'use strict';

describe('Directive: scButton', function () {

  // load the directive's module
  beforeEach(module('postflopStatisticsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.card1 = 'AA';
    scope.card2 = 'A3s';
    scope.card3 = 'T2o';
  }));

  it('should create a button base on card name', inject(function ($compile) {
    element = angular.element('<sc-button card = card1></sc-button>');
    element = $compile(element)(scope);
    scope.$digest();
    expect(element.text()).toBe(scope.card1);
  }));
});
