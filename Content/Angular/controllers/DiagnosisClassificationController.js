var CIDclassificationVW = [];
var CIDclassificationDB = [];
app.controller("DiagnosisController", function ($scope, $interval,alert, CIDService) {
    $scope.CidCode = null;
    $scope.category = null;
    $scope.CIDclassificationBuffer = [];
    $interval(function () {
        $scope.CIDclassificationBuffer = CIDclassificationVW;
    }, 500);


    // Populate Category
    var getData = CIDService.GetCategory();
    getData.then(function (dt) {
        $scope.CategoryList = dt.data;
    }, function (error) {
        alert.warning("error in obtaining CIDCODE category");

    });



    // Function For Populate CIDCODE  // This function we will call after select change country
    $scope.GetCode = function () {
        //Load cidCode

        CIDService.GetCode($scope.category.CID_CategorID).then(function (d) {
            $scope.CodeList = d.data;
            $scope.StateTextToShow = "Select State";
        }, function (error) {
            alert.warning('Error in getting data!');
        });
    }
    $scope.saveToBasket = function () {
        var DiseaseCID = new Object();
        DiseaseCID.DiseaseCode = $scope.CidCode.DiseaseCode;
        DiseaseCID.CIDCategory = $scope.category;

        for (var i = 0; i < CIDclassificationVW.length; i++) {      
            if (DiseaseCID.DiseaseCode === CIDclassificationVW[i].DiseaseCode) {
                alert.warning(DiseaseCID.DiseaseCode+" already exists");
                return;
            }
        }

        CIDclassificationVW.push(DiseaseCID);

    }
    $scope.saveCIDCODE = function () {
        if ($scope.CIDclassificationBuffer.length > 0) {
            var getData = CIDService.SaveCIDclassificationDB($scope.CIDclassificationBuffer);

            getData.then(function (msg) {
                alert.success('diagnosis posted');
            }, function () {
                alert.warning('diagnosis posting problem');
            });
        }
    }
    $scope.deleteCIDCODE = function (element) {
        var deleteIndex = CIDclassificationVW.indexOf(element);
        CIDclassificationVW.splice(deleteIndex, 1);
        //  CIDclassificationDB.splice(deleteIndex, 1);
    }



})
app.factory('CIDService', function ($http) {
    var fac = {};
    fac.GetCategory = function () {
        return $http.get("../Diagnosis/GetCidCodeCategories");
    }
    fac.GetCode = function (CID_CategorID) {

        return $http.get('../Diagnosis/GetCIDByCategory?category_id=' + CID_CategorID)
    }


    fac.SaveCIDclassificationDB = function (CIDclassification) {
        var CIDclassificationData = JSON.stringify({ 'CIDclassification': CIDclassificationVW });
        var response = $http({
            method: "post",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },

            url: "../Diagnosis/ClassifyDisease_CID",
            data: CIDclassificationData,
            dataType: "json",
        });
        //Refreshing the buffers
        CIDclassificationVW = [];
        CIDclassificationDB = [];
        return response;
    }
    return fac;
});
