app.service("clientService", function ($http) {

    //get All Clients
    this.GetAllClients = function () {
      
        return $http.get("Home/GetAllClients");
    };

    // get client By Id
    this.GetClientById = function (clientID) {
        var response = $http({
            method: "post",
            url: "Home/GetClientById",
            params: {
                id: JSON.stringify(clientID)
            }
        });
        return response;
    }

    // Update existing client
    this.UpdateClient = function (client) {
        var response = $http({
            method: "post",
            url: "Home/UpdateClient",
            data: JSON.stringify(client),
            dataType: "json"
        });
        return response;
    }

    // Add new Client
    this.AddClient = function (client) {
       
        var response = $http({
            method: "post",
            url: "Home/AddClient",
            data: JSON.stringify(client),
            dataType: "json"
        });
      
        return response;
    }

    //Delete existing client
    this.DeleteClient = function (client) {
        var response = $http({
            method: "post",
            url: "Home/DeleteClient",
            data: JSON.stringify(client),
            dataType: "json",
            params: {
            id: JSON.stringify(client)
    }
        });
        return response;
    }
});