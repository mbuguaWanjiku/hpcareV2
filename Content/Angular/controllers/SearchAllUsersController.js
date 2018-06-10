app.controller("searchController", function ($state, alert,searchService) {
    var vm = this;
    vm.sortColumn = "Name";
    vm.rowLimit = 20;
    //vm.searchUsers = function () {
    var getData = searchService.SearchUsers();
    getData.then(function (dt) {
        vm.users = dt.data;
    }, function () {
        alert.warning('Error in getting records');
    });
   
//}

});


app.factory('searchService', function ($http) {
    var fac = {};
    fac.SearchUsers = function () {
      
        return $http.get('../Home/SearchAllUsers')
    }

    return fac;
});