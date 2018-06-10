var navApp = angular.module("Navigation", ['ui.router']);

navApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/updateDiagnosis");

    $stateProvider
       .state("updateDiagnosis", {
           url: "/updateDiagnosis",
           templateUrl: "Diagnosis/UpdateDiseaseStatusResult"
       })
       //.state("page2", {
       //    url:"/page2",
       //    templateUrl: "Page_2.html"
       //})
       //.state("page3", {
       //    url:"/page3",
       //    templateUrl: "Page_3.html"
       //});
});