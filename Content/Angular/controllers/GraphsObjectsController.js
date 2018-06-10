/// <reference path="C:\Users\Márcia\Dropbox\HPCare\11032016 1234 treatmentplan quase feito\HPCareNovaVersao\Scripts/angular.js" />
/// <reference path="../Angular/Clinic/MainModule.js" />
/// <reference path="../Angular/Clinic/MainModule.js" />
var selectedDescription = 'LFT';
var columnsNames = null;

var startDate = null;
var endDate = null;
var todayDate = new Date();

function StatisticsObject(label, fillColor, strokeColor, pointColor, pointStrokeColor, data) {
    this.label = label;
    this.fillColor = fillColor || "rgba(51, 51, 51, 0)";
    this.strokeColor = strokeColor;
    this.pointColor = pointColor;
    this.pointStrokeColor = pointStrokeColor || "#fff";;
    this.data = data;
}
StatisticsObject.prototype.constructor = Object.create(StatisticsObject.prototype);

function Labels(dates) {
    this.dates = [];
}
Labels.prototype.constructor = Object.create(Labels.prototype);

var lineChartData = {
    labels: [],
    datasets: []
};

//var app = angular.module("myApp", [])
//  .filter('jsonDate', ['$filter', function ($filter) {
//      return function (input, format) {
//          return (input)
//                 ? $filter('date')(parseInt(input.substr(6)), format)
//                 : '';
//      };
//  }]);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//*********************************************************//

app.controller("GraphsController", function ($scope, GraphsFactory, $interval, alert) {

    document.getElementById("date-start").value = '2016/01/01';
    document.getElementById("date-end").value = todayDate.getFullYear() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getDay();

    function drawGraphs() {
        startDate = document.getElementById("date-start").value;
        endDate = document.getElementById("date-end").value;
       
        var getLabels = GraphsFactory.GetDates(selectedDescription);
        getLabels.then(function (dt) {
            $scope.dates = dt.data;
            var temp = [];
            for (var i = 0; i < dt.data.length; i++) {
                var value = new Date(parseInt(dt.data[i].substr(6)));
                var ret = value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
                temp.push(ret);
            }
            for (var i = 0; i < temp.length; i++) {
                lineChartData.labels.push(temp[i]);
            }

        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });

        var getColumnsNames = GraphsFactory.GetColumns(selectedDescription);
        getColumnsNames.then(function (data) {

            var getData = GraphsFactory.GetValues(selectedDescription);
            getData.then(function (dt) {

                var columnsNumber = (dt.data.length - 1) / (dt.data[dt.data.length - 1]); //numero de colunas 
                var rowsNumber = dt.data[dt.data.length - 1]; //numero de rows
                var rest = 0;
                var temp = [];
                while (rest < columnsNumber) {
                    for (var i = 0; i < dt.data.length - 1; i++) {
                        if ((i % columnsNumber == rest)) {
                            temp.push(dt.data[i]);
                        }
                    }

                    var color = getRandomColor();
                    var insert = new StatisticsObject(data.data[rest], "rgba(51, 51, 51, 0)", color, color, "#fff", temp);
                    lineChartData.datasets.push(insert);
                    rest++;
                    i = 0;
                    temp = [];
                }
                new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

            }, function (error) {
                alert.warning("Something went wrong ! Please try again.");
            });

        });

    }

    function Tipo(description) {
        this.description = description;
    }
    Tipo.prototype.constructor = Object.create(Tipo.prototype);

    $scope.mcdtList = [];

    $scope.mcdtList.push(new Tipo('KFT'));
    $scope.mcdtList.push(new Tipo('LFT'));
    $scope.mcdtList.push(new Tipo('LymphocytesSubsets'));
    $scope.mcdtList.push(new Tipo('PlateletsCount'));
    $scope.mcdtList.push(new Tipo('RBCIndices'));
    $scope.mcdtList.push(new Tipo('RBCs'));
    $scope.mcdtList.push(new Tipo('ViralLoad'));
    $scope.mcdtList.push(new Tipo('WBCS'));

    $scope.LabExams = null;

    $scope.clickedElement = function () {
        selectedDescription = $scope.LabExams.description;

        lineChartData.labels = [];
        lineChartData.datasets = [];
        drawGraphs();
    }

});

//*********************************************************//

app.factory('GraphsFactory', function ($http) {
    var fac = {};
    fac.GetValues = function () {
        return $http.get('../LabExams/MonitorizationGraphsValuesJson?mcdtType=' + selectedDescription + "&startDate=" + startDate + "&endDate=" + endDate);
    }

    fac.GetDates = function () {
        return $http.get('../LabExams/MonitorizationGraphsDatesJson?mcdtType=' + selectedDescription + "&startDate=" + startDate + "&endDate=" + endDate);
    }

    fac.GetColumns = function () {
        return $http.get('../LabExams/MonitorizationGraphsColumnsNamesJson?mcdtType=' + selectedDescription + "&startDate=" + startDate + "&endDate=" + endDate);
    }
    return fac;

});

