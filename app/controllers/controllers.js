/**
 * Created by NADUN on 8/13/2015.
 */



app.controller('GroupCtrl', function($scope,$http,$rootScope){

    $rootScope.area = null;
    $rootScope.PID = null;
    $scope.listofGroups= null;

    $scope.mypromise2 = $http.get('http://104.236.206.83:3000/group.summary')
        .success(function(data) {
            console.log(data);
            $scope.listofGroups = data;}
    );




    $scope.insertGroup = function(){

        var Balance = $scope.Balance;
        var ID = $scope.id;
        var product = $scope.PID;
        var Number = $scope.memNO;

        var NextBal = Balance/Number;
        var Area = $scope.area.charAt(0).toUpperCase() + $scope.area.substr(1).toLowerCase();
        var pre = Area.substring(0, 3);
        var pre2 = pre.toUpperCase();
        ID = pre2+ ID;
        $rootScope.area = Area;
        $rootScope.PID = product;
        $rootScope.balTOmem = NextBal;

        console.log(Number,Area,Balance,product,NextBal);


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



        $scope.MembersList=null;
        var list = null;
        var fil = null;
        var Area = null;
        var balance= null;

        //console.log($routeParams);
        $scope.GroupID = $routeParams.groupId;
        $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            $scope.MembersList = data;
            list = data;
            console.log(data);
            init2();
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



        function init2(){


            if (list.length != 0){
                console.log("nad");
                 fil = list[0].ProductID;
                 $scope.area = list[0].Area;
                Area = $scope.area;
                balance = list[0].Balance;
                $scope.Balance = balance;
            }
            else{
                console.log("in else");
                 fil = $rootScope.PID;
                $scope.area = $rootScope.area;
                Area = $scope.area;
                balance = $rootScope.balTOmem;
                $scope.Balance = balance;

            }
            console.log(balance);



        }

        //input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();

        $scope.addMember = function(){
            var FName  = $scope.firstName.charAt(0).toUpperCase() + $scope.firstName.substr(1).toLowerCase() ;
            var LName  = $scope.lastName.charAt(0).toUpperCase() + $scope.lastName.substr(1).toLowerCase();
            var ddate  = $scope.DDate;
            var  Nic   = $scope.nic ;

            //var Area   = $scope.area.charAt(0).toUpperCase() + $scope.area.substr(1).toLowerCase();
            var gid =    $scope.GroupID;
            var Addr =   $scope.address.charAt(0).toUpperCase() + $scope.address.substr(1).toLowerCase();
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
                product : fil
            });

            $scope.MembersList.push({NIC : Nic ,
                FirstName : FName ,
                LastName : LName,
                Area: Area,
                Balance : balance,
                DueDate : ddate


        });

            //$scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            //    $scope.MembersList = data;
            //    list = data;
            //    console.log(data);
            //    init2();
            //});



        };

        $scope.deleteMember=function(Id){

            //for (var i = $scope.MembersList.length - 1; i >= 0; i--) {
            //    console.log($scope.MembersList[i].NIC);
            //    if ($scope.MembersList[i].NIC === Id) {
            //        $scope.MembersList.splice(i, 1);
            //        console.log("success in local");
            //        break;
            //    }
            //}

            $scope.mypromiseDmember = $http.get('http://104.236.206.83:3000/delete/' + Id ).success(function(data) {
                $scope.MembersList = data;
                console.log(data);
                console.log("success");


            });

            $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
                $scope.MembersList = data;
                list = data;
                console.log(data);
                init2();
            });


        };


        var amountz = null;
        var dueDatez = null;
        var TDate = null;
        var CSE  = null;
        var idz = null;
        console.log(idz);

        $scope.trans = function (idz,amountz,dueDatez,TDate,CSE) {
            $http.post('http://104.236.206.83:3000/transaction',{
                id :idz,
                amount : amountz,
                due: dueDatez,
                date: TDate,
                code:CSE

            });
            console.log("pre");
            console.log(idz,amountz,dueDatez,TDate,CSE);

            $scope.MembersList=null;

            $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
                $scope.MembersList = data;
                //list = data;
                //console.log(data);
                //init2();
            });



        };

    }]


);


app.controller('MemberCtrl2', ['$scope', '$http',
        function($scope, $http) {



            $scope.MembersList2=null;
            //console.log($routeParams);

            $scope.mypromise12 = $http.get('http://104.236.206.83:3000/users').success(function(data) {
                $scope.MembersList2 = data;
            });


        }]


);

app.controller('TransCtrl', ['$scope', '$http',
        function($scope, $http) {

            //var x = document.getElementById("nat").defaultValue;

            //var idz = $scope.NatIdentity;
            var amountz = null;
            var dueDatez = null;
            var TDate = null;
            var CSE  = null;
            var idz = null;
            console.log(idz);

            //$scope.trans = function (idz,amountz,dueDatez,TDate,CSE) {
            //    $http.post('http://104.236.206.83:3000/transaction',{
            //        id :idz,
            //        amount : amountz,
            //        due: dueDatez,
            //        date: TDate,
            //        code:CSE
            //
            //    });
            //    console.log(idz,amountz,dueDatez,TDate,CSE);
            //
            //    $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            //        $scope.MembersList = data;
            //        list = data;
            //        console.log(data);
            //        init2();
            //    });
            //
            //
            //
            //};

            $scope.setNIC =function(val){

                $scope.NatIdentity= val;

            };




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

app.controller('DueCtrl', ['$scope', '$http',
        function($scope, $http) {



            $scope.DueList=null;
            //console.log($routeParams);

            $scope.mypromisedue = $http.get('http://104.236.206.83:3000/recent').success(function(data) {
                $scope.DueList = data;
            });


        }]


);
