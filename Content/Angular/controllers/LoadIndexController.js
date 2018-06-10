app.controller("loadIndexCTR", function ($state,$rootScope) {
    var vm = this;
    vm.loadProfile= function(){
        $state.go('myInfo')
}
    vm.labIndex = function () {
         $rootScope.subsequentVisit = 'true'//to permit log out else would be interplated as a patient
      $state.go('addLabResults')
}
    vm.adminIndex = function () {
        $rootScope.subsequentVisit = 'true'//to permit log out else would be interplated as a patient
        $state.go('addUser')
}


});