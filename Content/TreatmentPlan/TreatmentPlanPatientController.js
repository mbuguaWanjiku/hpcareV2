
app.controller('TreatmentPlanPatientCtrl', function ($scope, moment, alert, calendarConfig, TreatmentServiceMed) {
    var vm = this;
    vm.events = [];//create and configuration module
    vm.type = null;
    vm.cat = null;
    $scope.treatmentCategory = [];
    $scope.treatmentTypeList = [];
    $scope.Category = null;
    $scope.TreatmentType = null;
    vm.InterventionsList = [];
    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    /****************************************************/
    var actions = [];

    //var editMed = {
    //    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    //    onClick: function (args) {
    //        alert.med("Observations");
    //    }
    //};
    //actions.push(editMed)
    //var editPat = {
    //    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    //    onClick: function (args) {
    //        alert.show('Edited', args.calendarEvent);
    //    }
    //};






    //An object to hold intervention considering the intervention class have different properties
    var InterventionVW = function (id, title, Intervention_id, color, startsAt, endsAt, draggable, resizable, actions) {
        this.Intervention_id = Intervention_id;
        this.title = title;
        this.id = id;
        this.color = color;
        this.startsAt = endsAt
        this.endsAt = startsAt;
        this.draggable = draggable;
        this.resizable = resizable;
        this.actions = actions;
    }

    vm.isCellOpen = true;
    vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };




    function addInterventionsToEvents() {
        var arrayEvents = [];
        vm.events = [];
        var getData = TreatmentServiceMed.GetInterventionsDB();
        getData.then(function (dt) {
            for (var j = 0; j < dt.data.length; j++) {
                arrayEvents.push(dt.data[j]);
            }
            var startAt, endAt, Intervention_id, id, type, primary, secondary;
            for (var i = 0; i < arrayEvents.length; i++) {
                startAt = moment(arrayEvents[i].startsAt).toDate();
                endAt = moment(arrayEvents[i].endsAt).toDate();
                id = arrayEvents[i].Intervention_type_id;
                title = arrayEvents[i].Intervention_type_description;
                Intervention_id = arrayEvents[i].Intervention_id;
                primary = getRandomColor();
                secondary = getRandomColor;

                type = new InterventionVW(id, title, Intervention_id, { primary, secondary }, startAt, endAt, true, true, actions);
                //calendarConfig.colorTypes.warning
                vm.events.push(type);


            }

            function getRandomColor() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

        }, function (error) {
            //alert.show('Error!');
        });

    }

    addInterventionsToEvents();

});


app.factory('TreatmentServiceMed', function ($http) {
    var fac = {};

    fac.GetInterventionsDB = function () {

        return $http.get("../TreatmentPlans/GetInterventions");

    }

    return fac;
});




