app.controller("DiagnosisHistoryController", function ( DiagnosisService) {
    var vm = this;
    vm.rowLimit = 20;
    vm.sortColumn = "StartDate";
    vm.diagnosesHistory = null;
    
    vm.DeactivateDisease = function (disease) {
   
        var getData = DiagnosisService.DeactivateDisease(disease);
        getData.then(function (msg) {
            vm.loadUpdate();
            alert('Disease updated');
        }, function () {
            alert('Error in Deleting Record');
        });
    }

   
 
  
    vm.loadHistory = function () {
        var getData = DiagnosisService.getPatientHistory(false);
        getData.then(function (diagnosis) {
            vm.diagnosesHistory = diagnosis.data;
            
        }, function () {
            alert('Error in getting records');
        });
    }
    vm.loadUpdate = function(){
        var getData = DiagnosisService.getPatientHistory(true);
        getData.then(function (diagnosis) {
            vm.diagnosesCurrent = diagnosis.data;
           
        }, function () {
            alert('Error in getting records');
        });
    }


});

app.factory('DiagnosisService', function ($http) {

   

    var fac = {};

    //Deactivating patient disease
    fac.DeactivateDisease = function (disease_id) {
       
        var response = $http({
            method: "post",
            url: "../Diagnosis/DeactivateDisease?disease_id="+disease_id,
        //    data: JSON.stringify(disease_id),
            dataType: "json",
        });

        return response;
    }


    /****************************Diagnosis history*****************************/

    fac.getPatientHistory = function (state) {
      
        return $http.get("../Diagnosis/GetPatientDiagnosisHistoryData?state=" + state);
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
       
        return response;
    };

    return fac;

});