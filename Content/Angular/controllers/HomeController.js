app.controller("homeController", function ($state, alert,validation, searchDialogue,$rootScope, searchService) {
    var vm = this;
    vm.search;
    vm.visitManagerModal = function () {
        searchDialogue.searchPatient();
    }
    
    vm.getDetails = function () {

        var isFirst = $rootScope.subsequentVisit;
        if (isFirst === 'false') {
            $state.go('addPatientInfo')
            validation.message = 'please fill empty fields before searching another patient';
        } else {

            var getData = searchService.SearchPatient(vm.search);
            getData.then(function (response) {
                if (response.data !== 'False') {
                    $state.go('consultPatientInfo')

                } else {

                    alert.warning('patient dont exist');
                }

            }, function () {
                alert.warning('Error in getting records');
            });
        }
    }
    vm.searchUsers = function () {
    vm.getData = searchService.SearchUsers();
    getData.then(function (dt) {
        vm.users = dt.data;
        alert.success(JSON.stringify(dt.data));
    }, function () {
        alert.warning('Error in getting records');
    });
   
}

});


app.factory('searchService', function ($http) {
    var fac = {};

    fac.SearchPatient = function (id) {

        return $http.get('../Home/Search?search=' + id)
    }

    fac.SearchUsers = function () {

        return $http.get('../Home/SearchAllUsers')
    }

    return fac;
});