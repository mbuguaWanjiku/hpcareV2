app.controller('logOutController', function ($scope, logOutService, $interval, $rootScope, $state,validation) {
    $scope.controllerName = "logOutController";
    var isFirst = $rootScope.subsequentVisit;
     if (isFirst === 'false') {
         $state.go('addPatientInfo')
         validation.message = 'please fill empty fields';

         return;
     } else {
         logOutService.logOut().then(function () {
             $interval(function () {
                 window.location = 'http://hpcare2016.com';
             }, 600);
         });
     }
});

app.service('logOutService', function ($http) {
    var service = {};

    service.logOut = function () {
        return $http.get("../Account/logOff");
    }
    return service;
});