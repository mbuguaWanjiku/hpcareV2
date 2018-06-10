var category = null;
var subCategory = null;
var ids = '';
var buffer = [];
app.controller("RegularExamHistoryController", function ($scope, $filter, $interval, regularExamHistoryFactory, showResultModal, alert) {
    var choosedMcdt = null;
    var stringIds = '';
    var arraySorted = null;

    $interval(function () {
        $scope.McdtComponents = buffer;
    }, 500);

    $scope.showText = function (option) {
        var mcdt = regularExamHistoryFactory.getSpecificMCDT(option.Mcdt_id);
        mcdt.then(function (dt) {
            showResultModal.Text(dt.data[0], option.Discriminator);
        }, function () {
            alert.warning('Error in getting records');
        });

    };
    $scope.rowLimit = 20;
    $scope.sortColumn = "MCDT_date";

    $scope.showGraph = function (size, sortOrder, option) {
        choosedMcdt = option[0].Discriminator;
        category = choosedMcdt;
        arraySorted = null;
        stringIds = '';

        // Mudar isto //
        switch (choosedMcdt) {
            case 'KFT':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryKFT, sortOrder);
                break;
            case 'LFT':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryLFT, sortOrder);
                break;
            case 'RBCS':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryRBCS, sortOrder);
                break;
            case 'RBCIndices':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryRBCIndices, sortOrder);
                break;
            case 'LymphocytesSubsets':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryLymphocytesSubsets, sortOrder);
                break;
            case 'ViralLoad':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryViralLoad, sortOrder);
                break;
            case 'PlateletsCount':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryPlateletsCount, sortOrder);
                break;
            case 'WBCS':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryWBCS, sortOrder);
                break;
        }

        for (var i = 0; i < arraySorted.length; i++) {
            stringIds += arraySorted[i].Mcdt_id;
            stringIds += ',';
        }

        $scope.clickedElementMcdt();
    }

    /****************************************************************************************************************/

    var columnsNames = null;

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

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //*********************************************************//

    function drawGraphs() {
        var getLabels = regularExamHistoryFactory.GetDates(stringIds);

        getLabels.then(function (dt) {
            $scope.dates = dt.data;//data de cada mcdt_date todos KFTS
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
            alert.warning("error");
        });

        var getColumnsNames = regularExamHistoryFactory.GetColumnNames(choosedMcdt);
        getColumnsNames.then(function (data) {

            var getData = regularExamHistoryFactory.GetValores(stringIds, choosedMcdt);
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
                alert.warning("error");
            });

        });

    }

    $scope.LabExams = null;

    $scope.clickedElementMcdt = function () {
        alert.graphs();

        lineChartData.labels = [];
        lineChartData.datasets = [];
        arraySorted = [];

        drawGraphs();
    }


    // ***************** Specific Graphs ********************* //

    $scope.showGraphEspecific = function (size, sortOrder, option) {
        choosedMcdt = option[0].Discriminator;
        category = choosedMcdt;
        //reset das vars 
        arraySorted = null;
        stringIds = '';
        buffer = [];

        // Mudar isto //
        switch (choosedMcdt) {
            case 'KFT':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryKFT, sortOrder);
                break;
            case 'LFT':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryLFT, sortOrder);
                break;
            case 'RBCS':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryRBCS, sortOrder);
                break;
            case 'RBCIndices':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryRBCIndices, sortOrder);
                break;
            case 'LymphocytesSubsets':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryLymphocytesSubsets, sortOrder);
                break;
            case 'ViralLoad':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryViralLoad, sortOrder);
                break;
            case 'PlateletsCount':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryPlateletsCount, sortOrder);
                break;
            case 'WBCS':
                arraySorted = $filter('orderBy')($scope.regularExamHistoryWBCS, sortOrder);
                break;
        }

        for (var i = 0; i < arraySorted.length; i++) {
            stringIds += arraySorted[i].Mcdt_id;
            stringIds += ',';
        }
        ids = stringIds;
        category = choosedMcdt;
        $scope.clickedElement1();



        function getList() {
            $scope.McdtComponents = []//refreshing
            var Element = function (mcdtProp) {
                this.mcdtProp = mcdtProp;
            }

            var getColumnsNames = regularExamHistoryFactory.GetColumnNames(choosedMcdt);
            getColumnsNames.then(function (dt) {
                for (var i = 0; i < dt.data.length; i++) {
                    buffer.push(new Element(dt.data[i]));
                }

            });


        }
        getList();
    }

    function drawGraphsSpecific() {

        var getPZeroMax = regularExamHistoryFactory.GetPatientZeroMax(category, subCategory);
        getPZeroMax.then(function (max) {

            var tempArrayMax = [];
            var tempArrayMin = [];

            //dados do parametro do mcdt escolhido
            var getData = regularExamHistoryFactory.GetValues(category, subCategory, ids);
            getData.then(function (dt) {

                var getPZeroMin = regularExamHistoryFactory.GetPatientZeroMin(category, subCategory);
                getPZeroMin.then(function (min) {
                    //Criar os labels 
                    var numberRowsMax = dt.data.length;
                    for (var i = 0; i < numberRowsMax; i++) {
                        lineChartData.labels.push(" ");
                        tempArrayMax.push(max.data);
                    }
                    lineChartData.labels = [];
                    var numberRowsMin = dt.data.length;
                    for (var i = 0; i < numberRowsMin; i++) {
                        lineChartData.labels.push(" ");
                        tempArrayMin.push(min.data);
                    }

                    var color = getRandomColor();
                    //criacao das linhas dos graficos 
                    var insert = new StatisticsObject(subCategory, "rgba(51, 51, 51, 0)", color, color, "#fff", dt.data);
                    lineChartData.datasets.push(insert);
                    new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

                }, function (error) {
                    alert.warning("Something went wrong ! Please try again.");
                });

                var patientZeroMin = new StatisticsObject("Control Line - Min", "rgba(255, 255, 255, 1)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "#fff", tempArrayMin);
                lineChartData.datasets.push(patientZeroMin);

            }, function (error) {
                alert.warning("Something went wrong ! Please try again.");
            });

            var patientZeroMax = new StatisticsObject("Control Line - Max", "rgba(0, 255, 0, 0.1)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "#fff", tempArrayMax);
            lineChartData.datasets.push(patientZeroMax);

        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });
    }

    $scope.clickedElement1 = function () {
        alert.specificGraphs();

        lineChartData.labels = [];
        lineChartData.datasets = [];
        drawGraphsSpecific();
    }

    $scope.clickedElement2 = function () {
        subCategory = $scope.Element.mcdtProp;

        lineChartData.labels = [];
        lineChartData.datasets = [];
        drawGraphsSpecific();
    }


    //*********************************************************//

    $scope.initKft = function () {
        category = null;
        subCategory = null;
        var getDatakft = regularExamHistoryFactory.regularExamHistory("KFT");
        getDatakft.then(function (mcdtHistory) {
            $scope.regularExamHistoryKFT = mcdtHistory.data;
        }, function () {
            alert.warning('Error in getting records');
        });
    }

    $scope.initLft = function () {
        category = null;
        subCategory = null;
        var getDataLft = regularExamHistoryFactory.regularExamHistory("LFT");
        getDataLft.then(function (mcdtHistory) {
            $scope.regularExamHistoryLFT = mcdtHistory.data;

        }, function () {
            alert.warning('Error in getting records');
        });
    }

    $scope.initRbcs = function () {
        category = null;
        subCategory = null;
        var getDataRbc = regularExamHistoryFactory.regularExamHistory("RBCS");
        getDataRbc.then(function (mcdtHistory) {
            $scope.regularExamHistoryRBCS = mcdtHistory.data;

        }, function () {
            //alert.warning('Error in getting records');
        });
    }

    $scope.initRbcI = function () {
        category = null;
        subCategory = null;
        var getDataRbcs = regularExamHistoryFactory.regularExamHistory("RBCIndices");
        getDataRbcs.then(function (mcdtHistory) {
            $scope.regularExamHistoryRBCIndices = mcdtHistory.data;

        }, function () {
            //alert.warning('Error in getting records');
        });
    }

    $scope.initLymp = function () {
        category = null;
        subCategory = null;
        var getDataLymp = regularExamHistoryFactory.regularExamHistory("LymphocytesSubsets");
        getDataLymp.then(function (mcdtHistory) {
            $scope.regularExamHistoryLymphocytesSubsets = mcdtHistory.data;

        }, function () {
            //alert.warning('Error in getting records');
        });
    }

    $scope.initViral = function () {
        category = null;
        subCategory = null;
        var getDataVL = regularExamHistoryFactory.regularExamHistory("ViralLoad");
        getDataVL.then(function (mcdtHistory) {
            $scope.regularExamHistoryViralLoad = mcdtHistory.data;

        }, function () {
            //alert.warning('Error in getting records');
        });
    }

    $scope.initPlatelets = function () {
        category = null;
        subCategory = null;
        var getDataPC = regularExamHistoryFactory.regularExamHistory("PlateletsCount");
        getDataPC.then(function (mcdtHistory) {
            $scope.regularExamHistoryPlateletsCount = mcdtHistory.data;

        }, function () {
            //    alert.warning('Error in getting records');
        });
    }

    $scope.initWbcs = function () {
        category = null;
        subCategory = null;
        var getDataWBCS = regularExamHistoryFactory.regularExamHistory("WBCS");
        getDataWBCS.then(function (mcdtHistory) {
            $scope.regularExamHistoryWBCS = mcdtHistory.data;

        }, function () {
            //alert.warning('Error in getting records');
        });
    }
});

app.factory('regularExamHistoryFactory', function ($http) {
    var fac = {};

    fac.regularExamHistory = function (type) {
        return $http.get("../RegularExamsHistory/GetRegularExamsJson?discriminator=" + type);
    };

    fac.getSpecificMCDT = function (id) {
        return $http.get("../RegularExamsHistory/GetMcdt?id=" + id);
    }




    // **************** Graficos ********************** //

    fac.GetDates = function (arrayMcdtIds) {
        return $http.get("../LabExams/TesteDateJson?listIds=" + arrayMcdtIds);
    }

    fac.GetColumnNames = function (componente) {
        return $http.get("../LabExams/TesteColumnsNamesJson?discrimininator=" + componente);
    }

    fac.GetValores = function (listaIds, nomeMcdt) {
        return $http.get("../LabExams/TesteValores?mcdtsIds=" + listaIds + "&discriminator=" + nomeMcdt);
    }






    // ******************* Graficos Especificos **************** //

    fac.GetValues = function (discriminator, specificParameter, listaIds) {
        return $http.get('../LabExams/SpecificMonitorizationJson?discriminator=' + discriminator + "&specificParameter=" + specificParameter + "&listaIds=" + listaIds);
    }

    fac.GetPatientZeroMax = function (discriminator, component) {
        return $http.get('../LabExams/PatientZeroMax?discriminator=' + discriminator + "&component=" + component);
    }

    fac.GetPatientZeroMin = function (discriminator, component) {
        return $http.get('../LabExams/PatientZeroMin?discriminator=' + discriminator + "&component=" + component);
    }

    return fac;
});
