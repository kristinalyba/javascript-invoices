(function () {
  'use strict';

  angular
    .module('invoicesApp')
    .controller('CustomersController', ['$window', '$scope', '$state',
                                   'dataService', CustomersController]);

  function CustomersController($window, $scope, $state, dataService) {
    var vm = this;
  }
}());