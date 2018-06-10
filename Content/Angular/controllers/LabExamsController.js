var tempArray = [];
var mcdtId = null;
app.controller("LabExamsController", function ($scope, LabExamsFactory, alert, alertMcdt) {
    $scope.mcdtsList = [];
    $scope.LabExams = null;
    $scope.rowLimit = 20;
    $scope.sortColumn = "McdtDate";
    $scope.id = null;//user id

    $scope.InitInformation = function () {
        var mcdts = LabExamsFactory.GetListAllMcdts();
        mcdts.then(function (dt) {
            $scope.mcdtsList = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    };

    $scope.initKFT = function () {
        ResetBuffers();
        ValuesMax('KFT');
        ValuesMin('KFT');
    };

    $scope.initLFT = function () {
        ResetBuffers();
        ValuesMax('LFT');
        ValuesMin('LFT');
    };

    $scope.initLymphocytesSubsets = function () {
        ResetBuffers();
        ValuesMax('LymphocytesSubsets');
        ValuesMin('LymphocytesSubsets');
    };

    $scope.initPlateletsCount = function () {
        ResetBuffers();
        ValuesMax('PlateletsCount');
        ValuesMin('PlateletsCount');
    };

    $scope.initRBCIndices = function () {
       ResetBuffers();
       ValuesMax('RBCIndices');
       ValuesMin('RBCIndices');
    };

    $scope.initRBCS = function () {
        ResetBuffers();
        ValuesMax('RBCS');
        ValuesMin('RBCS');
    };

    $scope.initViralLoad = function () {
        ResetBuffers();
        ValuesMax('ViralLoad');
        ValuesMin('ViralLoad');
    };

    $scope.initWBCS = function () {
        ResetBuffers();
        ValuesMax('WBCS');
        ValuesMin('WBCS');
    };

    function ResetBuffers() {
        $scope.ValuesMax = [];
        $scope.ValuesMin = [];
    }

    function ValuesMax(discriminator) {
        var max = LabExamsFactory.GetPatientZeroMax(discriminator);
        max.then(function (dt) {
            $scope.ValuesMax = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    function ValuesMin(discriminator) {
        var min = LabExamsFactory.GetPatientZeroMin(discriminator);
        min.then(function (dt) {
            $scope.ValuesMin = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    $scope.getPatientMcdts = function (userId) {
        $scope.id = userId;
    };

    $scope.goBack = function () {
        $scope.id = null;
        $scope.InitInformation();
    };

    // *********************************************************** //
    $scope.getMcdtType = function (id, mcdtType) {
        mcdtId = id;
        switch (mcdtType) {
            case 0:
                alertMcdt.kft("");
                break;
            case 1:
                alertMcdt.lft("");
                break;
            case 2:
                alertMcdt.lymphocyte("");
                break;
            case 3:
                alertMcdt.platelets("");
                break;
            case 4:
                alertMcdt.rbcIndices("");
                break;
            case 5:
                alertMcdt.rbcs("");
                break;
            case 6:
                alertMcdt.viral("");
                break;
            default:
                alertMcdt.wbcs("");
        }
    }

    $scope.SaveKft = function () {
        var LabExams = new Object();
        LabExams.BUN = $scope.LabExams.BUN;
        LabExams.Creatinine = $scope.LabExams.Creatinine;
        LabExams.uricAcid = $scope.LabExams.uricAcid;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveKft();
            getData.then(function (message) {
                alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveLft = function () {
        var LabExams = new Object();
        LabExams.SGT = $scope.LabExams.SGT;
        LabExams.AST = $scope.LabExams.AST;
        LabExams.LDH = $scope.LabExams.LDH;
        LabExams.Alkaline = $scope.LabExams.Alkaline;
        LabExams.Bilirubin = $scope.LabExams.Bilirubin;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveLft();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveLymphocytes = function () {
        var LabExams = new Object();
        LabExams.CD3 = $scope.LabExams.CD3; 
        LabExams.CD4 = $scope.LabExams.CD4;
        LabExams.CD8 = $scope.LabExams.CD8;
        LabExams.T_lymphocytes = $scope.LabExams.T_lymphocytes;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveLymphocytes();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SavePlatelets = function () {
        var LabExams = new Object();
        LabExams.Count = $scope.LabExams.Count;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.savePlatelets();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveRbcsIndices = function () {
        var LabExams = new Object();
        LabExams.MCH = $scope.LabExams.MCH;
        LabExams.MCHC = $scope.LabExams.MCHC;
        LabExams.MCV = $scope.LabExams.MCV;
        LabExams.Amylase = $scope.LabExams.Amylase;
        LabExams.Cholesterol = $scope.LabExams.Cholesterol;
        LabExams.CPK = $scope.LabExams.CPK;
        LabExams.Globulin = $scope.LabExams.Globulin;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveRbcIndices();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveRbcs = function () {
        var LabExams = new Object();
        LabExams.HB = $scope.LabExams.HB;
        LabExams.HCT = $scope.LabExams.HCT;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveRbcs();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveViralLoad = function () {
        var LabExams = new Object();
        LabExams.value = $scope.LabExams.value;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveViralLoad();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.SaveWbcs = function () {
        var LabExams = new Object();
        LabExams.Basophil = $scope.LabExams.Basophil;
        LabExams.Eosinophil = $scope.LabExams.Eosinophil;
        LabExams.Monocytes = $scope.LabExams.Monocytes;
        LabExams.Neutrophil = $scope.LabExams.Neutrophil;
        LabExams.MCDT_ID = mcdtId;

        tempArray.push(LabExams);

        if (tempArray.length > 0) {
            var getData = LabExamsFactory.saveWbcs();
            getData.then(function (message) {
                //alert.success("MCDT's results added with success !");
                tempArray = [];
            }, function () {
                //alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

});

app.factory('LabExamsFactory', function ($http) {
    var fac = {};

    fac.GetListAllMcdts = function () {
        return $http.get('../LabExams/ListPatientLabExamsJson');
    }

    fac.GetPatientZeroMax = function (discriminator) {
        return $http.get('../LabExams/GetPatientZeroResultsMax?discriminator=' + discriminator);
    }

    fac.GetPatientZeroMin = function (discriminator) {
        return $http.get('../LabExams/GetPatientZeroResultsMin?discriminator=' + discriminator);
    }

    fac.saveKft = function () {
        var informations = JSON.stringify({ 'kftList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveKftResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveLft = function () {
        var informations = JSON.stringify({ 'lftList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveLftResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveLymphocytes = function () {
        var informations = JSON.stringify({ 'lymphocytesList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveLymphocyteResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.savePlatelets = function () {
        var informations = JSON.stringify({ 'plateletsList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/savePlateletsResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveRbcIndices = function () {
        var informations = JSON.stringify({ 'rbcIndicesList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveRbcIndicesResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveRbcs = function () {
        var informations = JSON.stringify({ 'rbcsList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveRbcsResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveViralLoad = function () {
        var informations = JSON.stringify({ 'viralLoadList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/savViralLoadResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    fac.saveWbcs = function () {
        var informations = JSON.stringify({ 'wbcsList': tempArray });
        var response = $http({
            method: "post",
            url: "../LabExams/saveWbcsResults",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    return fac;
});

