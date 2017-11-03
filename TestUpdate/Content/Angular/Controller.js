app.controller("myCntrl", function ($scope, clientService) {
    $scope.divClient = false;
    GetAllClients();
    //To Get All Records  
    function GetAllClients() {
        var getData = clientService.GetAllClients();
        getData.then(function (cln) {
            $scope.clients = cln.data;
        },function () {
            alert('Error in getting records');
        });
    }

    $scope.EditClient = function (client) {
        var getData = clientService.GetClientById(client.Id);
        getData.then(function (cln) {
            $scope.client = cln.data;
            $scope.clientId = client.Id;
            $scope.clientFirstName = client.FirstName;
            $scope.clientLastName = client.LastName;
            $scope.clientIdentityNumber = client.IdentityNumber;
            //$scope.options = [{ name: "SA Identity", id: 1 }, { name: "Passport", id: 2 }];
            $scope.clientIdentityType = client.IdentityType;// $scope.options[1];
           
          
            var date_string = client.DateOfBirth;
            var d = new Date(parseInt(/\/Date\((\d+).*/.exec(date_string)[1]))
            $scope.clientDateOfBirth = d.toLocaleDateString();
            $scope.Action = "Update";
            $scope.divClient = true;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.UpdateClient = function ()
    {
        debugger;
        var client = {
            FirstName: $scope.clientFirstName,
            LastName: $scope.clientLastName,
            IdentityType: $scope.clientIdentityType,
            IdentityNumber: $scope.clientIdentityNumber,
            DateOfBirth: $scope.clientDateOfBirth          
        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            client.Id = $scope.clientId;
            var getData = clientService.UpdateClient(client);
            getData.then(function (msg) {
                GetAllClients();
                alert(msg.data);
                $scope.divClient = false;
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getData = clientService.AddClient(client);
            getData.then(function (msg) {
                GetAllClients();
                alert(msg.data);
                $scope.divClient = false;
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    $scope.AddClientDiv=function()
    {
        ClearFields();
        $scope.Action = "Add";
        $scope.divClient = true;
    }

    $scope.DeleteClient = function (client)
    {
        var getData = clientService.DeleteClient(client.Id);
        getData.then(function (msg) {
            GetAllClients();
            alert('Client Deleted successfully');
        },function(){
            alert('Error in Deleting Record');
        });
    }

    function ClearFields() {
        $scope.clientId = "";
        $scope.clientFirstName = "";
        $scope.clientLastName = "";
        $scope.clientIdentityNumber = "";
        $scope.clientIdentityType = "";
        $scope.clientDateOfBirth = "";
    }
});