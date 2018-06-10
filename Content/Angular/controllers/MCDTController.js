var tempBuffer = [];
app.controller("MCDTController", function ($scope, $interval,alert, MCDTService) {
    $scope.prescribedMCDTS = [];

    $scope.MCDTS = [];
    $scope.McdtListLevel1 = [];

    $scope.Mcdt = function (desc, cat) {
        this.desc = desc;
        this.cat = cat;
    }

    $interval(function () {
        $scope.prescribedMCDTS = tempBuffer;

    }, 500);
    function createMCDTS() {
        $scope.MCDTS.push(new $scope.Mcdt("Regular", "Laboratory"));
        $scope.MCDTS.push(new $scope.Mcdt("Specific", "Laboratory"));
        $scope.MCDTS.push(new $scope.Mcdt("KFT", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("LFT", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("LymphocytesSubsets", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("PlateletsCount", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("RBCS", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("RBCIndices", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("ViralLoad", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("WBCS", "Regular"));
        $scope.MCDTS.push(new $scope.Mcdt("XRAY", "Specific"));
    }
    createMCDTS();
    $scope.processLevel1 = function () {
        if ($scope.Mcdt.desc === "Laboratory") {
            $scope.McdtListLevel2 = getList("Laboratory");

        } else {
            saveToBasket();
            //tempBuffer.push($scope.Mcdt);
            $scope.McdtListLevel2 = [];
            $scope.McdtListLevel3 = [];
        }

    }
    $scope.processLevel2 = function () {
        if ($scope.Mcdt.desc === "Regular") {
            $scope.McdtListLevel3 = getList("Regular");
        } else {
            $scope.McdtListLevel3 = getList("Specific");
        }
    }
    $scope.processLevel3 = function () {
        saveToBasket();
        // tempBuffer.push($scope.Mcdt);
    }

    function saveToBasket() {
        if ($scope.Mcdt.cat && $scope.Mcdt.desc) {
            tempBuffer.push($scope.Mcdt);
        }
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

    $scope.McdtListLevel1.push(new $scope.Mcdt("Physical", "General"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("Pyschiatric", "General"));
    $scope.McdtListLevel1.push(new $scope.Mcdt("Laboratory", "General"));

    $scope.saveMcdts = function () {
        if ($scope.prescribedMCDTS.length > 0) {
            var getData = MCDTService.saveSelectedMCDT($scope.prescribedMCDTS);
            getData.then(function (msg) {

                alert.success('mcdt saved');
                tempBuffer = [];
            }, function () {
                alert.warning('Error in saving Record');

            });
        }
    }
    $scope.deleteMCDT = function (element) {

        $scope.prescribedMCDTS.splice($scope.prescribedMCDTS.indexOf(element), 1);

    }



});
app.factory('MCDTService', function ($http) {
    var fac = {};
    fac.saveSelectedMCDT = function (prescribedMcdt) {
        var lista = [];
        prescribedMcdt.forEach(function (arrayElem) {
            lista.push(arrayElem.desc);
        });
        var response = $http({
            method: "post",
            url: "../MCDTs/SavePrescribedMCDT",
            data: JSON.stringify(lista),
            dataType: "json",
        });
        return response;
    }
    return fac;
});
