(function () {
  angular
    .module('invoicesApp')
    .service('dataService', ["$http", dataService]);

  function dataService(http) {
    //invoice public method
    this.getInvoices = getInvoices;
    this.getInvoice = getInvoice;
    this.createInvoice = createInvoice;

    //customer public method
    this.getCustomers = getCustomers;

    //products public method
    this.getProducts = getProducts;

    /* INVOICES */
    function getInvoices() {
      return http.get('/api/invoices');
    }

    function getInvoice(id) {
      return http.get('/api/invoices/' + id);
    }

    function getInvoiceItems(id) {
      return http.get('/api/invoices/' + id + '/items');
    }

    function createInvoice(data) {
        var invoiceData = {
          customer_id: data.customerId,
          discount: data.discount,
          total: data.total
        };
        var invoiceItemsData = data.products;
        return http.post('/api/invoices', data)
          .then(function (response) {
            return response.data && response.data.id;
          })
          .then(function (id) {
            var itemsPromises = [];
            invoiceItemsData.forEach(function (itemData) {
              var promise = http.post('/api/invoices/' + id + '/items', itemData);
              itemsPromises.push(promise);
            });
            return Promise.all(itemsPromises);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    /* CUSTOMERS */
    function getCustomers() {
      return http.get('/api/customers');
    }

    /* PRODUCTS */
    function getProducts() {
      return http.get('/api/products');
    }
  }
}());
