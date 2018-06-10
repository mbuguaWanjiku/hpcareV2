
app.factory('searchDialogue', function ($uibModal, $http, $state, $interval) {
    var fac = {};
    fac.exist= function(valor){
        return 'True';
    }
    fac.searchPatient = function () {

        return $uibModal.open({
            backdrop: 'static',
            templateUrl: '../Content/Angular/ModalViewsContent/ModalSearchPatient.html',
            controller: function () {
                var vm = this;
                vm.patientExist = fac.exist();
          
                fac.getPatient = function () {
                  
                    
                    return $http.get('../Home/Search?search=' + vm.search)
                }

            },
            controllerAs: 'vm',

        }).closed.then(function () {

            var getData = fac.getPatient();
            getData.then(function (response) {
                fac.exist(response.data);
                if (response.data === 'True') {

                    fac.visitManager();
                } else {
                    alert("patient don't exist")
                    fac.searchPatient();
                }

            }, function () {
                alert('Error in getting records');
            });

        }, function () {
           
            alert("dismiss")
        });;
    }

    fac.visitManager = function () {

      
                var visitType = function(){
                    return $http.get('../Home/IsFirstVisit')
                }

                var getData = visitType();
                getData.then(function (response) {                 
                    if (response.data === 'True') {
                        $state.go('addPatientInfo');
                    } else {
                        $state.go('consultPatientInfo')
                    }
           
            });
    
              

    }


    return fac;
});