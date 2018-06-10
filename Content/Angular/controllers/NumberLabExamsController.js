app.controller("NumberLabExamsController", function ($scope, NumberLabExamsFactory, alert) {

    $scope.InitValues = function () {

        $scope.pendingTasks = 0;
        $scope.totalDone = 0;
        $scope.percentage = 0;

        var valueNull = NumberLabExamsFactory.getLabExamsNumberNull();
        valueNull.then(function (dt) {
            $scope.pendingTasks = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var value = NumberLabExamsFactory.getLabExamsNumber();
        value.then(function (dt) {
            $scope.totalDone = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

});


app.factory('NumberLabExamsFactory', function ($http) {
    var fac = {};

    fac.getLabExamsNumberNull = function () {
        return $http.get('../LabExams/NumberLabExamsNull');
    }

    fac.getLabExamsNumber = function () {
        return $http.get('../LabExams/NumberLabExams');
    }

      return fac;
});

