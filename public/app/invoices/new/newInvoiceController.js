(function () {
    'use strict';

    angular
        .module('invoicesApp')
        .controller('NewInvoiceController', ['$window', '$scope', '$state',
                                       'dataService', NewInvoiceController]);

    function NewInvoiceController($window, $scope, $state, dataService) {
      var vm = this;

      // view data
      vm.customers = [];
      vm.products = [];
      vm.total = 0;

      // form data
      vm.formData = {};
      //array of unique values to enable ng-repeat for selecting products
      vm.productElements = [];

      //public methods
      vm.addProductElement = addProductElement;
      vm.saveInvoice = saveInvoice;

      //init form
      init();

      //fill form with data
      function init() {
        vm.addProductElement();
        dataService.getCustomers()
          .then(function (response) {
            vm.customers = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        dataService.getProducts()
          .then(function (response) {
            vm.products = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      //add next 'select product' control
      function addProductElement() {
        vm.productElements.push(getUniqueId());
        console.log()
      }

      // needed to be able to loop trough 'productElements' in ng-repeat
      function getUniqueId () {
        return Math.random().toString(36).substr(2, 6);
      }

      // recalculate total
      function recalculateTotal() {
        var products = vm.formData.products || [];
        var discount = vm.formData.discount || 0;
        var total = 0;
        Object.keys(products).forEach(function (key) {
          if (products[key].quantity) {
            total = total + products[key].price * products[key].quantity;
          }
        });
        vm.total = (total - (total * discount / 100 )).toFixed(2);
      }

      //save invoice to database
      function saveInvoice() {
        var data = {
          customer_id: vm.formData.customer.id,
          discount: vm.formData.discount || 0,
          total: vm.total,
          products: (function () {
            var products = vm.formData.products || [];
            return Object.keys(products).map(function (key) {
              if (products[key].quantity) {
                return {
                  product_id: products[key].id,
                  quantity: products[key].quantity
                }
              }
            });
          }())
        }
        console.log(data);
        dataService.createInvoice(data)
          .then(function (response) {
            $state.go('invoices.all');
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      // watch to update total - debounce value: 2000
      $scope.$watch('vm.formData', function (newVal) {
        recalculateTotal();
      }, true);
  }
}());