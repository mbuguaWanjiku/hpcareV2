app.controller("AdminController", function ($scope, AdminFactory, alert) {

    $scope.Users = null;

    $scope.InitValues = function () {

        var numberClinic = AdminFactory.getSpecificUser(1);
        numberClinic.then(function (dt) {
            $scope.clinicCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var numberPatient = AdminFactory.getSpecificUser(4);
        numberPatient.then(function (dt) {
            $scope.patientCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var numberLabTec = AdminFactory.getSpecificUser(2);
        numberLabTec.then(function (dt) {
            $scope.labTecCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var users = AdminFactory.getNumberUsers();
        users.then(function (dt) {
            $scope.usersCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var mcdts = AdminFactory.getMcdtsCount();
        mcdts.then(function (dt) {
            $scope.mcdtsCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });




        var kft = AdminFactory.getSpecificMcdt('KFT');
        kft.then(function (dt) {
            $scope.kftCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var lft = AdminFactory.getSpecificMcdt('LFT');
        lft.then(function (dt) {
            $scope.lftCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var lymp = AdminFactory.getSpecificMcdt('LymphocytesSubsets');
        lymp.then(function (dt) {
            $scope.lympCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var platelets = AdminFactory.getSpecificMcdt('PlateletsCount');
        platelets.then(function (dt) {
            $scope.plateletsCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var rbcI = AdminFactory.getSpecificMcdt('RBCIndices');
        rbcI.then(function (dt) {
            $scope.rbcICount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var rbcs = AdminFactory.getSpecificMcdt('RBCS');
        rbcs.then(function (dt) {
            $scope.rbcsCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var viral = AdminFactory.getSpecificMcdt('ViralLoad');
        viral.then(function (dt) {
            $scope.viralCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

        var wbcs = AdminFactory.getSpecificMcdt('WBCS');
        wbcs.then(function (dt) {
            $scope.wbcsCount = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

    $scope.InitUsers = function () {
        var users = AdminFactory.getAllUsers();
        users.then(function (dt) {
            $scope.allUsers = dt.data;
            alert.warning(JSON.stringify($scope.allUsers));
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

});


app.factory('AdminFactory', function ($http) {
    var fac = {};

    fac.getAllUsers = function () {
        return $http.get('../Home/AllUsers');
    }

    fac.getSpecificUser = function (id) {
        return $http.get('../Home/NumberSpecificUsers?i=' + id);
    }

    fac.getNumberUsers = function () {
        return $http.get('../Home/NumberUsers');
    }

    fac.getMcdtsCount = function () {
        return $http.get('../Home/NumberMcdts');
    }

    fac.getSpecificMcdt = function (id) {
        return $http.get('../Home/NumberSpecificMcdt?i=' + id);
    }

    return fac;
});

