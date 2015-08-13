'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function ($scope, customersService) {


  init();

  function init() {
    $scope.customers = customers;
  }

  $scope.insertCustomer = function () {
    var firstName = $scope.newCustomer.firstName;
    var lastName = $scope.newCustomer.lastName;
    var city = $scope.newCustomer.city;
    customersService.insertCustomer(firstName, lastName, city);
    $scope.newCustomer.firstName = '';
    $scope.newCustomer.lastName = '';
    $scope.newCustomer.city = '';
  };

  $scope.deleteCustomer = function (id) {
    customersService.deleteCustomer(id);
  };
})

.service('customersService', function () {
  this.getCustomers = function () {
    return customers;
  };

  this.insertCustomer = function (firstName, lastName, city) {
    var topID = customers.length + 1;
    customers.push({
      id: topID,
      firstName: firstName,
      lastName: lastName,
      city: city
    });
  };

  this.deleteCustomer = function (id) {
    for (var i = customers.length - 1; i >= 0; i--) {
      if (customers[i].id === id) {
        customers.splice(i, 1);
        break;
      }
    }
  };

  this.getCustomer = function (id) {
    for (var i = 0; i < customers.length; i++) {
      if (customers[i].id === id) {
        return customers[i];
      }
    }
    return null;
  };


});

