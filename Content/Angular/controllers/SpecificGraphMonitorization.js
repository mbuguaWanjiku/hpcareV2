var category = null;
var subCategory = null;

//****** Grafico *******//
var selectedDescription = 'LFT';
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

//****** Grafico *******//

app.controller("SpecificController", function ($scope, $interval, GraphsSpecificFactory, alert) {
    $scope.MCDTS = [];
    $scope.McdtListLevel1 = [];

    $scope.Mcdt = function (desc, cat) {
        this.desc = desc;
        this.cat = cat;
    }

    function createMCDTS() {
        $scope.MCDTS.push(new $scope.Mcdt("BUN", "KFT"));
        $scope.MCDTS.push(new $scope.Mcdt("Creatinine", "KFT"));
        $scope.MCDTS.push(new $scope.Mcdt("uricAcid", "KFT"));

        $scope.MCDTS.push(new $scope.Mcdt("SGT", "LFT"));
        $scope.MCDTS.push(new $scope.Mcdt("AST", "LFT"));
        $scope.MCDTS.push(new $scope.Mcdt("LDH", "LFT"));
        $scope.MCDTS.push(new $scope.Mcdt("Alkaline", "LFT"));
        $scope.MCDTS.push(new $scope.Mcdt("Bilirubin", "LFT"));

        $scope.MCDTS.push(new $scope.Mcdt("Lymphocytes_units", "LymphocytesSubsets"));
        $scope.MCDTS.push(new $scope.Mcdt("CD3", "LymphocytesSubsets"));
        $scope.MCDTS.push(new $scope.Mcdt("CD4", "LymphocytesSubsets"));
        $scope.MCDTS.push(new $scope.Mcdt("CD8", "LymphocytesSubsets"));
        $scope.MCDTS.push(new $scope.Mcdt("T_lymphocytes", "LymphocytesSubsets"));

        $scope.MCDTS.push(new $scope.Mcdt("HB", "RBCS"));
        $scope.MCDTS.push(new $scope.Mcdt("HCT", "RBCS"));

        $scope.MCDTS.push(new $scope.Mcdt("Count", "PlateletsCount"));

        $scope.MCDTS.push(new $scope.Mcdt("MCH", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("MCHC", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("MCV", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("Amylase", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("Cholesterol", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("CPK", "RBCIndices"));
        $scope.MCDTS.push(new $scope.Mcdt("Globulin", "RBCIndices"));

        $scope.MCDTS.push(new $scope.Mcdt("Basophil", "WBCS"));
        $scope.MCDTS.push(new $scope.Mcdt("Eosinophil", "WBCS"));
        $scope.MCDTS.push(new $scope.Mcdt("Monocytes", "WBCS"));
        $scope.MCDTS.push(new $scope.Mcdt("Neutrophil", "WBCS"));

        $scope.MCDTS.push(new $scope.Mcdt("value", "ViralLoad"));
    }

    createMCDTS();

    $scope.processLevel1 = function () {
        if ($scope.Mcdt.desc === "KFT") {
            $scope.McdtListLevel2 = getList("KFT");
        } else if ($scope.Mcdt.desc === "LFT") {
            $scope.McdtListLevel2 = getList("LFT");
        } else if ($scope.Mcdt.desc === "LymphocytesSubsets") {
            $scope.McdtListLevel2 = getList("LymphocytesSubsets");
        } else if ($scope.Mcdt.desc === "RBCS") {
            $scope.McdtListLevel2 = getList("RBCS");
        } else if ($scope.Mcdt.desc === "PlateletsCount") {
            $scope.McdtListLevel2 = getList("PlateletsCount");
        } else if ($scope.Mcdt.desc === "RBCIndices") {
            $scope.McdtListLevel2 = getList("RBCIndices");
        } else if ($scope.Mcdt.desc === "WBCS") {
            $scope.McdtListLevel2 = getList("WBCS");
        } else if ($scope.Mcdt.desc === "ViralLoad") {
            $scope.McdtListLevel2 = getList("ViralLoad");
        } else {
            $scope.McdtListLevel2 = [];
        }
    }
    
    $scope.processLevel2 = function () {
        category = $scope.Mcdt.cat;
        subCategory = $scope.Mcdt.desc;
    }

    function getList(selected) {
        var lista = [];
        $scope.MCDTS.forEach(function (arrayElem) {
            if (arrayElem.cat === selected) {
                lista.push(arrayElem);
            }

        });
        return lista;
    }

    $scope.McdtListLevel1.push(new $scope.Mcdt("LFT", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("KFT", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("LymphocytesSubsets", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("RBCS", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("PlateletsCount", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("RBCIndices", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("WBCS", "main"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("ViralLoad", "main"));



    //**************** Parte do Grafico ***************************//



    function drawGraphsSpecific() {

        var getPZero = GraphsSpecificFactory.GetPatientZero();
        getPZero.then(function (d) {
            
            var tempArray = [];

            //dados do parametro do mcdt escolhido
            var getData = GraphsSpecificFactory.GetValues(selectedDescription);
            getData.then(function (dt) {
                //Criar os labels 
                var numberRows = dt.data.length;
                for (var i = 0; i < numberRows; i++) {
                    lineChartData.labels.push(" ");
                    tempArray.push(d.data);
                }
                var color = getRandomColor();
                //criacao das linhas dos graficos 
                var insert = new StatisticsObject(category, "rgba(51, 51, 51, 0)", color, color, "#fff", dt.data);
                lineChartData.datasets.push(insert);
                new Chart(document.getElementById("line").getContext("2d")).Line(lineChartData);

            }, function (error) {
                alert.warning("Something went wrong ! Please try again.");
            });

            var patientZero = new StatisticsObject("Control Line", "rgba(0, 255, 0, 0.1)", "rgb(255, 0, 0)", "rgb(255, 0, 0)", "#fff", tempArray);
            lineChartData.datasets.push(patientZero);

        }, function (error) {
            alert.warning("Something went wrong ! Please try again.");
        });

    }

    $scope.clickedElement = function () {
        alert.specificGraphs();
        lineChartData.labels = [];
        lineChartData.datasets = [];
        drawGraphsSpecific();
    }

    $scope.clickedElement2 = function () {
        //alert.specificGraphs();
        lineChartData.labels = [];
        lineChartData.datasets = [];
        drawGraphsSpecific();
    }

});

app.factory('GraphsSpecificFactory', function ($http) {
    var fac = {};
    fac.GetValues = function () {
        return $http.get('../LabExams/SpecificMonitorizationJson?mcdtType=' + category + "&specificParameter=" + subCategory);
    }

    fac.GetPatientZero = function () {
        return $http.get('../LabExams/PatientZero');
    }
    return fac;
});

