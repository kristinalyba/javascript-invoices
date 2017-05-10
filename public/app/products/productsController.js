(function () {
  'use strict';

  angular
    .module('invoicesApp')
    .controller('ProductsController', ['$window', '$scope', '$state',
                                     'dataService', ProductsController]);

  function ProductsController($window, $scope, $state, dataService) {
    var vm = this;
  }
}());