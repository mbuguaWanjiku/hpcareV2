var staffDetails = [];
app.controller("StaffInformationsController", function ($scope, StaffInformationFactory, alert) {

    $scope.StaffFullInformation = null;
    $scope.StaffViewModel = null;
    $scope.Genders = null;
    $scope.Marital = null;
    $scope.Professional = null;
    $scope.gender;

    $scope.Init = function () {

        var staffInformation = StaffInformationFactory.GetStaffFullInformations();
        staffInformation.then(function (dt) {
            $scope.StaffFullInformation = dt.data;
            //alert.warning(JSON.stringify($scope.StaffFullInformation));
            $scope.InitInformation();
        }, function (error) {
            alert.warning("Error in getting the information !");
        });

        var genders = StaffInformationFactory.GetGender();
        genders.then(function (dt) {
            $scope.Genders = dt.data;
        }, function (error) {
            alert.warning("Error in getting the information !");
        });

        var marital = StaffInformationFactory.GetMaritalStatus();
        marital.then(function (dt) {
            $scope.Marital = dt.data;
        }, function (error) {
            alert.warning("Error in getting the information !");
        });

    };

    $scope.InitInformation = function () {
        $scope.Name = $scope.StaffFullInformation[0].Name;
        $scope.GenderName = $scope.StaffFullInformation[0].GenderName;
        $scope.MaritalStatusName = $scope.StaffFullInformation[0].MaritalStatusName;
        $scope.Address = $scope.StaffFullInformation[0].Address;
        $scope.Email = $scope.StaffFullInformation[0].Email;
        $scope.Telephone = $scope.StaffFullInformation[0].Telephone;
        $scope.Identification = $scope.StaffFullInformation[0].User_identification;
        $scope.ProfessionalName = $scope.StaffFullInformation[0].ProfessionalType;
    };

    $scope.SaveInformation = function (g, m) {
        var Staff = new Object();
        Staff.Name = $scope.Staff.Name;
        Staff.gender = g;
        Staff.MaritalStatus = m;
        Staff.Address = $scope.Staff.Address;
        Staff.Email = $scope.Staff.Email;
        Staff.Telephone = $scope.Staff.Telephone;

        staffDetails.push(Staff);
        if (staffDetails.length > 0) {
            var getData = StaffInformationFactory.saveStaffInformations(staffDetails);
            getData.then(function (message) {
                alert.success("New info added with success !");
                staffDetails = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }

    };

});



app.factory('StaffInformationFactory', function ($http) {
    var fac = {};

    fac.GetStaffFullInformations = function () {
        return $http.get('../Staffs/GetStaffInformation');
    };

    fac.GetGender = function () {
        return $http.get('../Staffs/GetGender');
    };

    fac.GetMaritalStatus = function () {
        return $http.get('../Staffs/GetMaritalStatus');
    };

    fac.saveStaffInformations = function (listInformations) {
        var informations = JSON.stringify({ 'staffInformations': staffDetails });
        var response = $http({
            method: "post",
            url: "../Staffs/SaveStaffInformations",
            data: informations,
            dataType: "json"
        });
        return response;
    };

    return fac;
});

