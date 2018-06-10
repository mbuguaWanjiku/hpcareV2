app.factory('observationService', function ($http) {
    var fac = {};
    fac.saveObservation = function (dataArray) {
        var response = $http({
            method: "post",
            url: "../Observation/SaveObservation",
            data: JSON.stringify(dataArray),
            dataType: "json",
        });
        return response;
    };
    fac.GetObservationsHistory = function () {

        return $http.get("../Observation/GetObservationsHistory");
    };
    fac.GetObservation = function (id) {
        return $http.get("../Observation/GetObservation?id=" + id);
    }

    return fac;
});
