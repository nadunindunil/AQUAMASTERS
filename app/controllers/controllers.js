/**
 * Created by NADUN on 8/13/2015.
 */

app.controller('UniCtrl', function ($scope, customersService) {

    init();


    function init() {
        $scope.customers = customersService.getCustomers();
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

    $scope.getCus = function(id){

        $scope.fName = customersService.getCus(id).firstName;
        $scope.lName = customersService.getCus(id).lastName;
        $scope.addr = customersService.getCus(id).address;
        $scope.city = customersService.getCus(id).city;

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

        this.getCus = function (id) {
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].id === id) {
                    return customers[i];
                }
            }
            return null;
        };

    });

/*
app.controller('GroupCtrl', function($scope,$http){

    $scope.listofGroups= null;

    $http.get('http://104.236.206.83:3000/group.summary')
        .success(function(data) {
            console.log(data);
            $scope.listofGroups = data;}
    );

});*/

app.controller('GroupCtrl', ['$scope', 'groupsFact', function($scope, groupsFact)
{
    $scope.listofGroups = groupsFact.GetData();

}]);



app.controller('MemberCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $scope.MembersList=null;
        //console.log($routeParams);
        $scope.GroupID = $routeParams.groupId;
        $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            $scope.MembersList = data;
        });
    }]);
/*
app.controller('MemberCtrl', ['$scope', 'membersFact', function($scope, membersFact)
{
    $scope.MembersList = membersFact.GetData();

}]);
*/
