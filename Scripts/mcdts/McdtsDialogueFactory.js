/// <reference path="modalKft.html" />
app.factory('alertMcdt', function ($uibModal) {

    var fac = {};

    fac.kft = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalKft.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.lft = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalLft.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.lymphocyte = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalLymphocyte.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.platelets = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalPlatelets.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.rbcIndices = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalRbcIndices.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.rbcs = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalRbcs.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.viral = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalViralLoad.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.wbcs = function (message) {
        return $uibModal.open({
            templateUrl: '../Scripts/mcdts/modalWbcs.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    return fac;
});