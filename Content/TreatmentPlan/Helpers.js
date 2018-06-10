//angular
//  .module('myApp')
app.factory('alert', function ($uibModal) {

    var fac = {};

   fac.show  = function(action, event) {
        return $uibModal.open({
            templateUrl: '../Content/TreatmentPlan/modalContent.html',
            controller: function () {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    
    //return {
    //    show: show
    //};


  fac.warning =   function(message) {
        return $uibModal.open({
            templateUrl: '../Content/TreatmentPlan/modalWarning.html',
            controller: function () {
                var vm = this;
                vm.message = message;              
            },
            controllerAs: 'vm'
        });
    }

  fac.success = function (message) {
      return $uibModal.open({
          templateUrl: '../Content/TreatmentPlan/modalSuccess.html',
          controller: function () {
              var vm = this;
              vm.success = message;
          },
          controllerAs: 'vm'
      });
  }
   fac.med = function (message) {
      return $uibModal.open({
          templateUrl: '../Content/TreatmentPlan/modalMed.html',
          controller: function () {
              var vm = this;
              vm.observations = message;
          },
          controllerAs: 'vm'
      });
  }



  return fac;
});
