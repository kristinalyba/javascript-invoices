(function () {
    'use strict';

  angular
    .module('invoicesApp')
    .controller('AllInvoicesController', ['$window', '$scope', '$state',
                                     'dataService', AllInvoicesController]);

  function AllInvoicesController($window, $scope, $state, dataService) {
    var vm = this;
    vm.invoices = [];

    dataService.getInvoices()
      .then(function (response) {
        console.log(response.data);
        vm.invoices = response.data;
      }).catch(function (error) {
        console.log(error);
      });

    vm.createInvoice = function () {
      $state.go('invoices.new');
    }
  }
}());
