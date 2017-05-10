(function () {
    'use strict';

    angular
        .module('invoicesApp')
        .controller('InvoicesController', ['$window', '$scope', '$state','dataService', 
        									InvoicesController]);

    function InvoicesController($window, $scope, $state, dataService) {
        var vm = this;
    }
}());