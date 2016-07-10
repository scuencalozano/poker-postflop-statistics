'use strict';

describe('Controller: PostflopstatisticsCtrl', function () {

  // load the controller's module
  beforeEach(module('postflopStatisticsApp'));

  var PostflopstatisticsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostflopstatisticsCtrl = $controller('PostflopstatisticsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.matrix.length).toBe(13);
  });
});
