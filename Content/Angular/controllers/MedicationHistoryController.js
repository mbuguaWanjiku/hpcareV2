app.controller("MedicationHistoryController", function ($scope, medicationHistoryFactory) {

    var getData = medicationHistoryFactory.getMedicationHistory();
        getData.then(function (medHistory) {
                $scope.medicationHistory = medHistory.data;
              
        }, function () {
            alert('Error in getting records');
        });
   
$scope.rowLimit = 20;
$scope.sortColumn = "StartDate";
});












