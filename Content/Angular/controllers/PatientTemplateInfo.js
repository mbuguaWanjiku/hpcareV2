
app.controller("PatientTemplateInfo", function ($scope, PatientTemplateInformationFactory, alert) {

    //$scope.FamilyHistoryCategories = null;
    //$scope.RiskFactorsCategories = null;
    //$scope.AllergyCategories = null;
    //$scope.PatientFamilyHistoryCategories = null;
    //$scope.PatientRiskFactorsCategories = null;
    //$scope.PatientAllergyCategories = null;
    //$scope.PatientFullInformation = null;
    //$scope.gender = null;
    //$scope.MaritalStatus = null;


    $scope.Init = function () {
        var familyHistories = PatientTemplateInformationFactory.GetPatientFamilyHistories();
        familyHistories.then(function (dt) {
            $scope.PatientFamilyHistoryCategories = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var riskFactors = PatientTemplateInformationFactory.GetPatientRiskFactors();
        riskFactors.then(function (dt) {
            $scope.PatientRiskFactorsCategories = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var allergies = PatientTemplateInformationFactory.GetPatientAllergies();
        allergies.then(function (dt) {
            $scope.PatientAllergyCategories = dt.data;
        }, function (error) {
           alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var patientInformation = PatientTemplateInformationFactory.GetPatientFullInformations();
        patientInformation.then(function (dt) {
            $scope.PatientFullInformation = dt.data;
            $scope.InitInformation();
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

    $scope.InitInformation = function () {
        $scope.Name = $scope.PatientFullInformation[0].Name;
        $scope.Gender = $scope.PatientFullInformation[0].gender;
        $scope.MaritalStatus = $scope.PatientFullInformation[0].MaritalStatus;
        $scope.Address = $scope.PatientFullInformation[0].Address;
        $scope.Email = $scope.PatientFullInformation[0].Email;
        $scope.Telephone = $scope.PatientFullInformation[0].Telephone;
        $scope.Identification = $scope.PatientFullInformation[0].User_identification;

       
    }
   
});



app.controller("PatientTemplateDiseasesHistory", function ($scope, PatientTemplateInformationFactory, alert) {

    $scope.listDisease = null;
    $scope.PatientDiseaseHistoryVM = null;

    $scope.Init = function () {
        var getData = PatientTemplateInformationFactory.GetPatientDiseaseHistory();
        getData.then(function (dt) {
            $scope.listDisease = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

});

app.controller("PatientTemplateMcdtsHistory", function ($scope, PatientTemplateInformationFactory, alert) {

    $scope.McdtViewModel = null;
    $scope.listMcdts = null;

    $scope.Init = function () {
        var getData = PatientTemplateInformationFactory.GetPatientMcdts();
        getData.then(function (dt) {
            $scope.listMcdts = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

});

app.controller("PatientTemplateMedicationHistory", function ($scope, PatientTemplateInformationFactory, alert) {

    $scope.MedicationHistoryVm = null;
    $scope.listMedications = null;
    $scope.rowLimit = 20;
    $scope.sortColumn = "StartDate";
    $scope.Init = function () {
        var getData = PatientTemplateInformationFactory.GetPatientMedication();
        getData.then(function (dt) {
            $scope.listMedications = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

});

app.factory('PatientTemplateInformationFactory', function ($http) {
    var fac = {};

    fac.GetPatientAllergies = function () {
        return $http.get('../Patient/GetPatientTemplateAllergies');
    }

    fac.GetPatientRiskFactors = function () {
        return $http.get('../Patient/GetPatientTemplateRisks');
    }

    fac.GetPatientFamilyHistories = function () {
        return $http.get('../Patient/GetPatientTemplateFamilyHistory');
    }

    fac.GetPatientFullInformations = function () {
        return $http.get('../Patient/GetPatientTemplateInformation');
    }

    fac.GetPatientDiseaseHistory = function () {
        return $http.get('../Patient/GetPatientDiseasesHistoryJson');
    }

    fac.GetPatientMcdts = function () {
        return $http.get('../Patient/GetPatientMcdtsJson');
    }

    fac.GetPatientMedication = function () {
        return $http.get('../Patient/GetPatientMedicationHistoryJson');
    }

    return fac;
});

