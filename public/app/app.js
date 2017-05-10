(function () {
  'use strict';
  var app = angular.module('invoicesApp', ['ui.router', 'ui.bootstrap','directives']);

  app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/invoices/all');

      $stateProvider
        .state('products', {
          url: '/products',
          templateUrl: 'app/products/productsView.html',
          controller: 'ProductsController',
          controllerAs: 'vm'
        })
        .state('customers', {
          url: '/customers',
          templateUrl: 'app/customers/customersView.html',
          controller: 'CustomersController',
          controllerAs: 'vm'
        })
        .state('invoices', {
          abstract: true,
          url: '/invoices',
          templateUrl: 'app/invoices/invoicesView.html',
          controller: 'InvoicesController',
          controllerAs: 'vm',
          resolve: {}
        })
        .state('invoices.all', {
          url: '/all',
          templateUrl: 'app/invoices/all/allInvoicesView.html',
          controller: 'AllInvoicesController',
          controllerAs: 'vm'
        })
        .state('invoices.new', {
          url: '/new',
          templateUrl: 'app/invoices/new/newInvoiceView.html',
          controller: 'NewInvoiceController',
          controllerAs: 'vm'
        });
    }]);
}());
