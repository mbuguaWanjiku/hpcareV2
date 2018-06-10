app.controller("PatientInformationsController", function ($scope, PatientInformationFactory,$rootScope,validation, alert,allergyDialogue) {

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
        var familyHistories = PatientInformationFactory.GetPatientFamilyHistories();
        familyHistories.then(function (dt) {
            $scope.PatientFamilyHistoryCategories = dt.data;
        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });

        var riskFactors = PatientInformationFactory.GetPatientRiskFactors();
        riskFactors.then(function (dt) {
            $scope.PatientRiskFactorsCategories = dt.data;
        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });

        var allergies = PatientInformationFactory.GetPatientAllergies();
        allergies.then(function (dt) {
            $scope.PatientAllergyCategories = dt.data;
        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });

        var patientInformation = PatientInformationFactory.GetPatientFullInformations();
        patientInformation.then(function (dt) {
            $scope.PatientFullInformation = dt.data;
            $scope.InitInformation();
        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
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
        $scope.BirthDate = $scope.PatientFullInformation[0].Patient_DOB;
        $scope.Status = $scope.PatientFullInformation[0].IsAlive;
        $scope.AgeGroup = $scope.PatientFullInformation[0].Description;

        //differentiate first and subsequente visit
        $rootScope.subsequentVisit = 'true'
        validation.message;
    }
        $scope.updateAllergy = function (allergyCategory) {   
            allergyDialogue.updateAllergy(allergyCategory);
        }

    });

    app.factory('PatientInformationFactory', function ($http) {
        var fac = {};

        fac.GetPatientAllergies = function () {
            return $http.get('../Patient/GetPatientAllergies');
        }

        fac.GetPatientRiskFactors = function () {
            return $http.get('../Patient/GetPatientRiskFactors');
        }

        fac.GetPatientFamilyHistories = function () {
            return $http.get('../Patient/GetPatientFamilyHistory');
        }

        fac.GetPatientFullInformations = function () {
            return $http.get('../Patient/GetPatientInformations');
        }

        return fac;
    });

