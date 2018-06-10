
app.controller('KitchenSinkCtrl', function ($scope, moment, alert, calendarConfig, TreatmentService) {

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
    var actions = [];
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



    /***************************************************************************************************************************/

    var getData = TreatmentService.GetCategory();
    getData.then(function (dt) {

        $scope.treatmentCategory = dt.data;
    }, function (error) {
        //alert.show("error in obtaining treatment category");

    });
    // Function For Populate CIDCODE  // This function we will call after select change country
    $scope.getTreatmentType = function (category) {
        vm.cat = category;
        TreatmentService.TreatmentType(category.id).then(function (dt) {
            $scope.treatmentTypeList = dt.data;
        }, function (error) {
            //alert.show('Error!');
        });
    }


    function addInterventionsToEvents() {
        var arrayEvents = [];
        vm.events = [];
        var getData = TreatmentService.GetInterventionsDB();
        getData.then(function (dt) {
            for (var i = 0; i < dt.data.length; i++) {
                arrayEvents.push(dt.data[i]);
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
    $scope.submitType = function (type) {
        vm.type = type;
    }
    $scope.addIntervention = function (index) {
        /**
        * if exists unset/default intervention block the addition of new one
        */
        function existUnSet() {
            var exist = false;
            for (var index = 0; index < vm.events.length; index++) {
                if (vm.events[index].title == "unset") {
                    exist = true;
                    break;
                }

            }
            return exist;
        }
        function add() {
            var title = "unset";
            var startsAt = moment().startOf('day').toDate();
            var endsAt = moment().endOf('day').toDate();
            vm.events.push({
                title: title,
                startsAt: startsAt,
                endsAt: endsAt,
                color: calendarConfig.colorTypes.important,
                draggable: true,
                resizable: true
            });
            TreatmentService.AddIntervention();
            alert.success("added UNSET Intervention  \n please update it  ");
        }

        if (existUnSet()) {
            alert.warning("Already exist an unset intervention at last index  \n please configure using update option ");
        } else {
            add();
        }



    }

    $scope.updateIntervention = function (index) {
        var id, title;

        if (vm.type !== 'undefined' && vm.type !== null) {
            title = vm.type.Description;
            id = vm.type.id;
        } else {

            id = vm.events[index].id;
            title = vm.events[index].title
        }

        vm.events[index].title = title;
        var arrayIntervention = [id, vm.events[index].endsAt, vm.events[index].startsAt, vm.events[index].Intervention_id];

        var response = TreatmentService.UpdateInterventions(arrayIntervention);
        alert.success("updated Intervention  " + (index + 1));
    }

    $scope.deleteIntervention = function (index) {
        var id = vm.events[index].Intervention_id;
        TreatmentService.DeleteIntervention(id);
        vm.events.splice(index, 1);
        alert.success(" deleted Intervention " + (index + 1));

    }
});


app.factory('TreatmentService', function ($http) {
    var fac = {};
    fac.GetCategory = function () {

        return $http.get("../TreatmentPlans/GetTreatmentCategories");
    }
    fac.TreatmentType = function (id) {

        return $http.get('../TreatmentPlans/GetTreatmentType?id=' + id)
    }

    fac.UpdateInterventions = function (intervention) {
        var interventions = JSON.stringify({ 'Intervention': intervention });
        var response = $http({
            method: "post",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            url: "../TreatmentPlans/SaveInterventions",
            data: interventions,
            dataType: "json",
        });

        return response;
    }
    fac.GetInterventionsDB = function () {

        return $http.get("../TreatmentPlans/GetInterventions");

    }
    fac.AddIntervention = function () {
        //var intervention = JSON.stringify({ 'Intervention': array });
        var response = $http({
            method: "post",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            url: "../TreatmentPlans/AddInterventions"

        });

    }

    fac.DeleteIntervention = function (id) {

        $http.post("../TreatmentPlans/DeleteIntervention?id=" + id);
        //var response = $http({
        //    method: "post",
        //    headers: {
        //        'Content-Type': "application/json; charset=utf-8"
        //    },
        //    url: "../TreatmentPlans/DeleteIntervention",
        //    data :id,
        //    dataType: "json",
        //});
    }

    return fac;

});
