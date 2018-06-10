app.factory('medicationHistoryFactory', function ($http) {
    var fac = {};

    fac.getMedicationHistory = function () {

        return $http.get("../Medication/GetMedicationHistory");
    };
    return fac;
});