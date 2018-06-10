app.factory('DiagnosisService', function ($http) {

    
    var fac = {};

    //Deactivating patient disease
    fac.DeactivateDisease = function (disease_Id) {
        alert(disease_Id);
        var response = $http({
            method: "post",
            url: "../Diagnosis/DeactivateDisease",
            data: JSON.stringify(disease_Id),
            dataType: "json",
        });

        return response;
    }


    /****************************Diagnosis history*****************************/

    fac.getPatientHistory = function (state) {
        alert(state+"debug");
        return $http.get("../Diagnosis/GetPatientDiagnosisHistoryJson?state=" + state);
    };



    /********************prescribe MCDT**********************************************/
    fac.saveSelectedMCDT = function () {

        var response = $http({
            method: "post",
            url: "../../../MCDTs/PrescribeMCDT",
            //   url: "../../MCDTs/PrescribeMCDT",
            data: JSON.stringify(prescribedMCDTS),
            dataType: "json",
        });
        alert(response);
        return response;
    };

    return fac;

});