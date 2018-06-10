app.controller("PatientStatusController", function ($scope, PatientStatusFactory) {

    var patientSatatus = PatientStatusFactory.GetPatientInformations();
    patientSatatus.then(function (dt) {
        $scope.PatientStatus = dt.data[0].IsAlive;
    }, function (error) {
        alert("Something went wrong while getting the records ! Please try again. ");
    });

   
});


app.factory('PatientStatusFactory', function ($http) {
    var fac = {};

    fac.GetPatientInformations = function () {
        return $http.get('../Patient/GetPatientInformations');
    }

    return fac;
});

