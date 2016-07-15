'use strict';

describe('Directive: scResultados', function () {

  // load the directive's module
  beforeEach(module('postflopStatisticsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sc-resultados></sc-resultados>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scResultados directive');
  }));
});
