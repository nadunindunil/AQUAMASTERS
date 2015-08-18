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


app.controller('GroupCtrl', function($scope,$http,$rootScope){

    $rootScope.area = null;
    $scope.listofGroups= null;

    $scope.mypromise2 = $http.get('http://104.236.206.83:3000/group.summary')
        .success(function(data) {
            console.log(data);
            $scope.listofGroups = data;}
    );




    $scope.insertGroup = function(){

        var Balance = $scope.Balance;
        var ID = $scope.id;

        var Number = 0;
        var Area = $scope.area.charAt(0).toUpperCase() + $scope.area.toLowerCase()
        var pre = Area.substring(0, 3);
        var pre2 = pre.toUpperCase();
        ID = pre2+ ID;
        $rootScope.area = Area;


        //groupService.insertGroup(Balance,Area,ID,number);
        $scope.listofGroups.push({ _id : ID ,
            number : Number ,
            balance: Balance,
            area: Area} );
    };

    /*
    $scope.addGroup = function(balance,NoMembers,Area,ID){

        $http.post();

    };
    */
});

/*
app.controller('GroupCtrl', ['$scope', 'groupsFact', function($scope, groupsFact)
{
    $scope.listofGroups = groupsFact.GetData();


}]);
*/


app.controller('MemberCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
    function($scope, $routeParams, $http , $rootScope ) {

        init();

        $scope.MembersList=null;
        //console.log($routeParams);
        $scope.GroupID = $routeParams.groupId;
        $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            $scope.MembersList = data;
            console.log(data);
        });

        $scope.reset = function(){
            $scope.firstName = null;
            $scope.lastName = null;
            $scope.DDate = null;
            $scope.nic = null;
            $scope.Balance = null;
            $scope.area = null;
            $scope.addr = null;
            $scope.telephone = null;

        };

        function init() {
            $scope.area = $rootScope.area;


        }

        //input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();

        $scope.addMember = function(){
            var FName  = $scope.firstName.charAt(0).toUpperCase() + $scope.firstName.toLowerCase() ;
            var LName  = $scope.lastName.charAt(0).toUpperCase() + $scope.lastName.toLowerCase()
            var ddate  = $scope.DDate  ;
            var  Nic   = $scope.nic ;
            var balance= $scope.Balance  ;
            var Area   = $scope.area.charAt(0).toUpperCase() + $scope.area.toLowerCase()
            var gid =    $scope.GroupID;
            var Addr =   $scope.address.charAt(0).toUpperCase() + $scope.address.toLowerCase()
            var teleph = $scope.telephone;

            console.log(Addr);

            $http.post('http://104.236.206.83:3000/adduser',{ id : Nic ,
                first : FName ,
                last: LName,
                area: Area,
                amount : balance,
                date : ddate,
                gid : gid,
                address :Addr,
                tel : teleph,
                product : "filter"

            });

            $scope.MembersList.push({NIC : Nic ,
                FirstName : FName ,
                LastName : LName,
                Area: Area,
                Balance : balance,
                DueDate : ddate


        });

        };

    }]


);


app.controller('MemberCtrl2', ['$scope', '$http',
        function($scope, $http) {



            $scope.MembersList=null;
            //console.log($routeParams);

            $scope.mypromise = $http.get('http://104.236.206.83:3000/users').success(function(data) {
                $scope.MembersList = data;
            });


        }]


);


/*
app.controller('MemberCtrl', ['$scope', 'membersFact', function($scope, membersFact)
{
    $scope.MembersList = membersFact.GetData();

}]);
*/


app.controller('MemberProfileCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {



            $scope.ProfileContent=null;
            $scope.Transactions = null;
            //console.log($routeParams);
            $scope.NIC = $routeParams.groupId;
            $scope.mypromise3 = $http.get('http://104.236.206.83:3000/find/' + $routeParams.NIC ).success(function(data) {
                $scope.ProfileContent = data;
                $scope.Transactions = data.Trans;
                console.log(data);
            });



        }]


);