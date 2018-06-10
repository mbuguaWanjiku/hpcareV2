var PrescribedDrugsVW = [];
var PrescribedDrugsDB = [];
app.controller("MedicationController", function ($scope, $interval, alert, MedicationService) {

    /*********Calendar*************************/
    var vm = this;
    vm.Drugs = [];
    vm.event = new Object();
    vm.event.startsAt = moment().startOf('day').toDate();
    vm.event.endsAt = moment().endOf('day').toDate();
    vm.mindate = new Date();
    vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.event[field] = !vm.event[field];
    };
    /*****************************/


    $scope.selectedDrugsBuffer = [];//temporary drugs storage

    $interval(function () {
        $scope.selectedDrugsBuffer = PrescribedDrugsVW;

    }, 500);
    $scope.CategoryList = null;
    $scope.DrugList = null;
    $scope.drugFrequenciesList = null;
    $scope.drugAdminList = null;
    $scope.drugDosageList = null;
    $scope.result = "";
    var getData = MedicationService.GetCategory();
    getData.then(function (dt) {

        $scope.CategoryList = dt.data;
    }, function (error) {
        alert("error in obtaining drug category");

    });
    //populate frequencies
    var getDrugFrequencies = MedicationService.GetDrugFrequencies();
    getDrugFrequencies.then(function (dt) {

        $scope.drugFrequenciesList = dt.data;
    }, function (error) {
        alert("error in obtaining drug frequencies");

    });

    //populate administrations
    var getDrugAdministrations = MedicationService.GetDrugAdministrations();
    getDrugAdministrations.then(function (dt) {

        $scope.drugAdminList = dt.data;
    }, function (error) {
        alert("error in obtaining drug administrations");

    });
    //populate Dosage
    var getDrugDosages = MedicationService.GetDrugDosages();
    getDrugDosages.then(function (dt) {

        $scope.drugDosageList = dt.data;
    }, function (error) {
        alert("error in obtaining drug administrations");

    });

    // Function For Populate drug  // This function we will call after select change country
    $scope.GetDrug = function () {
        $scope.DrugTextToShow = "Please Wait..."; // this will show until load states from database
        //Load drug
        MedicationService.GetDrug($scope.category.category_id).then(function (d) {
            $scope.DrugList = d.data;
            $scope.StateTextToShow = "Select State";
        }, function (error) {
            alert('Error!');
        });
    }

    $scope.saveToBasket = function (drug, category, admin, dosage, freq) {

       
        var dateValid = moment(vm.event.endsAt).isAfter(vm.event.startsAt);
        if (!dateValid) {
            alert.warning("Invalid dates-startDate is after endDate")
            return;
        }


        var DrugVW = new Object();
        DrugVW.category = category.description;
        DrugVW.DrugName = drug.Drug_name;
        DrugVW.admin = admin.Description;
        DrugVW.freq = freq.Description;
        DrugVW.Dos = dosage.Description;
        DrugVW.startDate = vm.event.startsAt;
        DrugVW.endDate = vm.event.endsAt;
       
        PrescribedDrugsVW.push(DrugVW);
        var DrugDB = new Object();
        DrugDB.IssuedDrug = drug;
        DrugDB.Medication_dosage = dosage;
        DrugDB.Medication_administration = admin;
        DrugDB.Medication_frequency = freq;
        DrugDB.Medication_start_date = vm.event.startsAt;
        DrugDB.Medication_end_date = vm.event.endsAt;

        PrescribedDrugsDB.push(DrugDB);

    }
    $scope.saveDrugs = function () {
        var getData;
        if (PrescribedDrugsDB.length > 0) {
            getData = MedicationService.SavePrescribedDrugsDB(PrescribedDrugsDB);

            getData.then(function (msg) {
                alert.success("saved drugs ")
            }, function () {
                alert.warning("posting problem");
            });
        }
    }
    $scope.deleteDrug = function (element) {
        var deleteIndex = PrescribedDrugsVW.indexOf(element);
        PrescribedDrugsVW.splice(deleteIndex, 1);
        PrescribedDrugsDB.splice(deleteIndex, 1);
    }
})
app.factory('MedicationService', function ($http) {
    var fac = {};
    fac.GetCategory = function () {
        return $http.get("../Medication/GetDrugsCategories");
    }
    fac.GetDrug = function (category_id) {
        return $http.get('../Medication/GetDrugByCategory?category_id=' + category_id)
    }
    fac.GetDrugFrequencies = function () {
        return $http.get('../Medication/GetDrugFrequencies')
    }
    fac.GetDrugAdministrations = function () {
        return $http.get('../Medication/GetDrugAdministrations')
    }
    fac.GetDrugDosages = function () {
        return $http.get('../Medication/GetDrugDosages')
    }

    fac.SavePrescribedDrugsDB = function (PrescribedDrugs) {
        var PrescribedDrugsData = JSON.stringify({ 'prescribedDrugs': PrescribedDrugsDB });
        var response = $http({
            method: "post",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },

            url: "../Medication/SavePrescribedDrugs",
            data: PrescribedDrugsData,
            dataType: "json",
        });
        //Refreshing the buffers
        PrescribedDrugsVW = [];
        PrescribedDrugsDB = [];
        return response;
    }
    return fac;
});
