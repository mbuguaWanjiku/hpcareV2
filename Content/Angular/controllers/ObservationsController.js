
app.controller("observationController", function (alert, observationService) {
    var vm = this;
    vm.subject;
    vm.observationBody;
    vm.classified;

    vm.archive = [];
    vm.rowLimit = 20;
    vm.sortColumn = "Date";
    vm.setForm = function (form) {
        vm.obsForm = form;
    }
    vm.saveToBD = function () {
        var check = document.getElementById('classified').checked;

        var arrayObsev = [];
        arrayObsev.push(vm.subject);
        arrayObsev.push(vm.observationBody);
        arrayObsev.push(check);
        alert.warning(JSON.stringify(arrayObsev))
        var posting = observationService.saveObservation(arrayObsev);
        posting.then(function (dt) {
            //alert.success("posted observation")
        },
           function (error) {
               alert.warning("error posting data")
           });
    }


    var getData = observationService.GetObservationsHistory();
    getData.then(function (dt) {
        for (var i = 0; i < dt.data.length; i++) {
            if (dt.data[i]) {
                vm.archive.push(dt.data[i]);
            }
        }
        ////alert(JSON.stringify(vm.archive[0].Date))
    }, function (error) {
        alert.warning("error in obtaining ");

    });

    vm.GetObservation = function (observation) {

        var getData = observationService.GetObservation(observation.observationID);
        getData.then(function (obs) {

           

        }, function () {
            alert.warning('Error in getting records');
        });
    }
});


