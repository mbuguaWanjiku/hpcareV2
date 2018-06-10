
app.factory('allergyDialogue', function ($uibModal, $http) {
    var fac = {};
    fac.updateAllergy = function (allergy) {
        return $uibModal.open({
            templateUrl: '../Content/Angular/ModalViewsContent/modalUpdateAllergy.html',
            controller: function () {
                var vm = this;
                vm.updateAllergyDB = function (update) {
                  
                    var postData = post(update);
                    postData.then(function (dt) {
                    }, function () {
                        alert('Error in getting records');
                    });
                }
            },
            controllerAs: 'vm'
        });
        function post(allergy) {
            var response = $http({
                method: "post",
                url: "../../../Patient/UpdateAllergies",
                data: allergy,
                dataType: "json",
            });
            
        }
    }

    return fac;
});