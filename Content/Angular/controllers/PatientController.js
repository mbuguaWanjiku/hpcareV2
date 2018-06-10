var tempListFamilyHistory = [];
var tempListFamilyHistoryVm = [];

var tempListRiskFactor = [];
var tempListRiskFactorVm = [];

var tempListAllergy = [];
var tempListAllergyVm = [];
app.controller("PatientFamilyHistoryController", function ($scope, $interval, PatientFactory, alert) {

    // ************** FamilyHistory *************** //
    $scope.listFamilyHistory = [];
    $scope.ListFamilyHistoryVm = [];

    $interval(function () {
        $scope.listFamilyHistory = tempListFamilyHistory;
        $scope.ListFamilyHistoryVm = tempListFamilyHistoryVm;
    }, 500);

    $scope.familyHistoryLvl1 = [];
    $scope.familyHistoryLvl2 = [];
    $scope.FamilyHistoryCategories = null;
    $scope.FamilyHistories = null;
    $scope.FamilyHistoryManagers = null;

    var familyHistories = PatientFactory.GetHistoryFactorsCategory();
    familyHistories.then(function (dt) {
        $scope.familyHistoryLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });

    $scope.processLevel2F = function () {
        PatientFactory.GetHistoryFactors($scope.FamilyHistoryCategories.FamilyHistoryCategoryId).then(function (dt) {
            $scope.familyHistoryLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    $scope.processLevel3 = function () {
        var ViewModel = new Object();
        ViewModel.Name = $scope.FamilyHistories.FamilyHistoryName;
        ViewModel.Carrier = $scope.FamilyHistoryManagers;
        tempListFamilyHistoryVm.push(ViewModel);

        var FamilyHistoryManager = new Object();
        FamilyHistoryManager.Carrier = $scope.FamilyHistoryManagers;
        FamilyHistoryManager.FamilyHistoryManagerFamilyHistoryId = $scope.FamilyHistories.FamilyHistory_id;
        tempListFamilyHistory.push(FamilyHistoryManager);
    }

    $scope.saveHistoryFactors = function () {
        if ($scope.listFamilyHistory.length > 0) {
            var getData = PatientFactory.saveFamilyHistory($scope.listFamilyHistory);
            getData.then(function (message) {
                //alert("Success");
                alert.success("Family Histories added with Sucess!");
                tempListFamilyHistory = [];
                tempListFamilyHistoryVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteFamilyHistory = function (element) {
        $scope.ListFamilyHistoryVm.splice($scope.ListFamilyHistoryVm.indexOf(element), 1);
        $scope.listFamilyHistory.splice($scope.listFamilyHistory.indexOf(element), 1);
    }

});



app.controller("PatientRiskFactorsController", function ($scope, $interval, PatientFactory, alert) {

    // ************** RiskFactors *************** //
    $scope.listRiskFactor = [];
    $scope.ListRiskFactorVm = [];

    $interval(function () {
        $scope.listRiskFactor = tempListRiskFactor;
        $scope.listRiskFactorVm = tempListRiskFactorVm;
    }, 500);

    $scope.riskFactorsLvl1 = [];
    $scope.riskFactorsLvl2 = [];
    $scope.RiskFactorsCategories = null;
    $scope.RiskFactors = null;
    $scope.RiskFactorsManagers = null;

    var risks = PatientFactory.GetRiskFactorsCategory();
    risks.then(function (dt) {
        $scope.riskFactorsLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });


    $scope.processLevel2R = function () {
        PatientFactory.GetRiskFactors($scope.RiskFactorsCategories.RiskFactorsCategoryId).then(function (dt) {
            $scope.riskFactorsLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    $scope.processLevel3R = function () {
        var ViewModelRisk = new Object();
        ViewModelRisk.Name = $scope.RiskFactors.RiskFactorName;
        tempListRiskFactorVm.push(ViewModelRisk);

        var RiskFactorsManagers = new Object();
        RiskFactorsManagers.RiskFactorsManagerRiskFactorId = $scope.RiskFactors.RiskFActors_id;
        tempListRiskFactor.push(RiskFactorsManagers);
    }

    $scope.saveRiskFactor = function () {
        if ($scope.listRiskFactor.length > 0) {
            var getData = PatientFactory.saveRiskFactors($scope.listRiskFactor);
            getData.then(function (message) {
                alert.success("Risk Factors added with Sucess!");
                tempListRiskFactor = [];
                tempListRiskFactorVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteRiskFactor = function (element) {
        $scope.listRiskFactor.splice($scope.listRiskFactor.indexOf(element), 1);
        $scope.listRiskFactorVm.splice($scope.listRiskFactorVm.indexOf(element), 1);
    }

});



app.controller("PatientAllergiesController", function ($scope, $interval, PatientFactory, alert) {

    // ************** Allergies *************** //

    $scope.listAllergy = [];
    $scope.listAllergyVm = [];

    $interval(function () {
        $scope.listAllergy = tempListAllergy;
        $scope.listAllergyVm = tempListAllergyVm;
    }, 500);

    $scope.allergiesLvl1 = [];
    $scope.allergiesLvl2 = [];
    $scope.AllergyCategories = null;
    $scope.Allergies = null;
    $scope.AllergiesManager = null;

    var allergies = PatientFactory.GetAllergiesCategory();
    allergies.then(function (dt) {
        $scope.allergiesLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });


    $scope.processLevel2A = function () {
        PatientFactory.GetAllergies($scope.AllergyCategories.AllergyCategoryId).then(function (dt) {
            $scope.allergiesLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

    $scope.processLevel3A = function (date) {
        /// <summary>
        /// s the specified date.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns></returns>
        var dateString = date.toString();

        var ViewModelAllergy = new Object();
        ViewModelAllergy.AllergyName = $scope.Allergies.Allergy_Name;
        ViewModelAllergy.StartDate = dateString.substring(0, 15);
        tempListAllergyVm.push(ViewModelAllergy);

        var AllergiesManager = new Object();
        AllergiesManager.AllergiesManager_AllergiesId = $scope.Allergies.Allergy_id;
        AllergiesManager.Allergy_start_date = date;
        tempListAllergy.push(AllergiesManager);
    }

    $scope.saveAllergy = function () {
        if ($scope.listAllergy.length > 0) {
            var getData = PatientFactory.saveAllergies($scope.listAllergy);
            getData.then(function (message) {
                alert.success("Allergies added with Sucess!");
                tempListAllergy = [];
                tempListAllergyVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteAllergy = function (element) {
        $scope.listAllergy.splice($scope.listAllergy.indexOf(element), 1);
        $scope.listAllergyVm.splice($scope.listAllergyVm.indexOf(element), 1);
    }

});



var patientDetails = [];
app.controller("PatientController", function ($scope,$rootScope,validation, alert, PatientFactory) {

    //$scope.Users = null;
    //$scope.Genders = null;
    //$scope.Marital = null;
    //$scope.gender = null;
    //$scope.MaritalStatus = null;

    $scope.elemReady = function () {
        var getData = PatientFactory.GetPatientInformations();
        getData.then(function (dt) {
            $scope.Users = dt.data;
            $scope.Name = $scope.Users[0].Name;
            $scope.Address = $scope.Users[0].Address;
            $scope.Email = $scope.Users[0].Email;
            $scope.Telephone = $scope.Users[0].Telephone;
            $scope.Status = $scope.Users[0].IsAlive;
            $scope.BirthDate = $scope.Users[0].Patient_DOB;

        }, function (error) {
            alert.warning("Something went wrong ! Please try again. ");
        });

        var genders = PatientFactory.GetGenders();
        genders.then(function (dt) {
            $scope.Genders = dt.data;
        }, function (error) {
            alert.warning("Something went wrong ! Please try again. ");
        });

        var maritalStatus = PatientFactory.GetMaritalStatus();
        maritalStatus.then(function (dt) {
            $scope.Marital = dt.data;
        }, function (error) {
            alert.warning("Something went wrong ! Please try again. ");
        });
    }
    $scope.validation =validation.message;
    $scope.savePatientData = function (g, m, status) {
        var Patient = new Object();
        Patient.Email = $scope.Users.Email;
        Patient.Telephone = $scope.Users.Telephone;
        Patient.Address = $scope.Users.Address;
        Patient.gender = g;
        Patient.MaritalStatus = m;
        Patient.Name = $scope.Users.Name;
        Patient.IsAlive = status;
        Patient.Patient_DOB = $scope.Users.BirthDate;

        patientDetails.push(Patient);

        if (patientDetails.length > 0) {
            var getData = PatientFactory.savePatientInformations(patientDetails);
            getData.then(function (message) {
                alert.success("Patient info added with success !");
                patientDetails = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
        $rootScope.filledFields(Patient)
       
       
}

});



app.factory('PatientFactory', function ($http) {
    var fac = {};
    fac.GetAllergiesCategory = function () {
        return $http.get('../Patient/GetAllergiesCategoryJson');
    }

    fac.GetAllergies = function (allergyCategory) {
        return $http.get('../Patient/GetAllergiesJson?categoryId=' + allergyCategory);
    }

    fac.GetRiskFactorsCategory = function () {
        return $http.get('../Patient/GetRiskFactorsCategoryJson');
    }

    fac.GetRiskFactors = function (riskFactorsCategory) {
        return $http.get('../Patient/GetRiskFactorsJson?categoryId=' + riskFactorsCategory);
    }

    fac.GetHistoryFactorsCategory = function () {
        return $http.get('../Patient/GetFamilyHistoryCategoryJson');
    }

    fac.GetHistoryFactors = function (familyHistoryCategory) {
        return $http.get('../Patient/GetFamilyHistoryJson?categoryId=' + familyHistoryCategory);
    }

    // ****************** Save Data ************************ //

    fac.saveFamilyHistory = function (listFamilyHistories) {
        var historyFamilyList = JSON.stringify({ 'familyHistory': tempListFamilyHistory });
        var response = $http({
            method: "post",
            url: "../Patient/SaveFamilyHistory",
            data: historyFamilyList,
            dataType: "json",
        });
        return response;
    }

    fac.saveRiskFactors = function (listRiskFactors) {
        var riskFactorsList = JSON.stringify({ 'riskFactors': tempListRiskFactor });
        var response = $http({
            method: "post",
            url: "../Patient/SaveRiskFactors",
            data: riskFactorsList,
            dataType: "json",
        });
        return response;
    }


    fac.saveAllergies = function (listAllergies) {
        var allergiesList = JSON.stringify({ 'allergies': tempListAllergy });
        var response = $http({
            method: "post",
            url: "../Patient/SaveAllergies",
            data: allergiesList,
            dataType: "json",
        });
        return response;
    }

    // ************* Get Patient Informations *********************** //

    fac.GetPatientInformations = function () {
        return $http.get('../Patient/GetPatientInformations');
    }

    // ************** Get Genders and MaritalStatus **************** //

    fac.GetGenders = function () {
        return $http.get('../Patient/GetGender');
    }

    fac.GetMaritalStatus = function () {
        return $http.get('../Patient/GetMaritalStatus');
    }

    // ************* Save Patient Informations ********************* //

    fac.savePatientInformations = function (listInformations) {
        var informations = JSON.stringify({ 'usersInformations': patientDetails });
        var response = $http({
            method: "post",
            url: "../Patient/SaveInformations",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    return fac;
});

