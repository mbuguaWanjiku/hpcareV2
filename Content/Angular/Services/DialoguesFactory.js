

app.factory('alert', function ($uibModal, $http) {

    var fac = {};
    fac.show = function (action, event) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalContent.html',
            controller: function () {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    fac.warning = function (message) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalWarning.html',
            controller: function () {
                var vm = this;
                vm.message = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.success = function (message) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalSuccess.html',
            controller: function () {
                var vm = this;
                vm.success = message;
            },
            controllerAs: 'vm'
        });
    }


    fac.showObservation = function (obs) {

        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalObservation.html',
            controller: function () {
                var vm = this;
                vm.observation = obs

            },
            controllerAs: 'vm'
        });
    }



    fac.med = function (message) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalMed.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }


    fac.graphs = function (message) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalControlGraph.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

    fac.specificGraphs = function (message) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalSpecificControlGraph.html',
            controller: function () {
                var vm = this;
                vm.observations = message;
            },
            controllerAs: 'vm'
        });
    }

//    fac.updateAllergy = function (allergy) {
//        return $uibModal.open({
//            templateUrl: '../Content/Angular/ModalViewsContent/modalUpdateAllergy.html',
//            controller: function () {
//                var vm = this;
//                vm.message = "debuggggg";
//                vm.allergyUpdate = allergy;

//                vm.updateAllergyDB = function (update) {
//                    alert("loadededdddddddddd");
//                    alert(JSON.stringify(update));
//                  //  post(update);
//                    var postData = post(update);
//                    postData.then(function (dt) {
//                        alert("passed")
//                    }, function () {
//                        alert('Error in getting records');
//                    });
//                }
//            },
//            controllerAs: 'vm'
//        });
//        function post(allergy) {         
//            var response = $http({
//                method: "post",
//                url: "../../../Patient/UpdateAllergies",
//                data: allergy,
//                dataType: "json",
//            });
//            alert("wwwwwwwwwwwwwwwwwww");
//        }
 

   return fac;
});
