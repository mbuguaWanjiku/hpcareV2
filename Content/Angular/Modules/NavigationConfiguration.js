



app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    //$urlRouterProvider.when("", "");
    $urlRouterProvider.otherwise('/');

    $stateProvider.state("searchPatient", {
           url: "/searchPatient",
          templateUrl: "./views/home/searchPatient.html"
       })
         .state("searchUsers", {
             url: "/searchUsers",

             templateUrl: "./views/home/SearchUsers"
         })
         .state("myInfo", {
             url: "/myInfo",
             templateUrl: "/views/home/Patient/PatientProfilePage"
         })
       .state("prescribeMCDT", {
           url: "/prescribeMCDT",
           templateUrl: "./views/MCDTs/PrescribeMCDT.html"
       })

         .state("regularExamsHistory", {
             url: "/RegularExamsHistory",
             templateUrl: "./views/RegularExamsHistory/GetRegularExamsHistory.html"
         })

       .state("classifyDisease", {
           url: "/classifyDisease",
           templateUrl: "./views/Diagnosis/ClassifyDisease_CID.html"
       })

       .state("updateDiseaseStatus", {
           url: "/UpdateDiseaseStatus",
           templateUrl: "./views/Diagnosis/UpdateDiseaseStatus.html"
       })

       .state("diagnosisHistory", {
           url: "/diagnosisHistory",
           templateUrl: "./views/Diagnosis/GetPatientDiagnosisHistory.html"
       })

        .state("prescribeMedication", {
            url: "/prescribeMedication",
            templateUrl: "./views/Medication/PrescribeMedication.html"
        })

         .state("medicationHistory", {
             url: "/medicationHistory",
             templateUrl: "./views/Medication/PrescribeMedicationHistory.html"
         })
         /********************************observations***************/
         .state("observations", {
             url: "/observations",
             templateUrl: "./views/Observation/CreateObservation.html"
         })
          .state("observationsHistory", {
              url: "/PatientObservationsHistory",
              templateUrl: "./views/Observation/ObservationsHistory.html"
          })

         .state("patientObservations", {
             url: "/myObservations",
             templateUrl: "./views/Observation/PatientObservations.html"
         })

    // ****************** Graphs ****************************//
    .state("mcdtResults", {
        url: "/MonitorizationGraphs",
        templateUrl: "./viewsa/LabExams/MonitorizationGraphs.html"
    })

      .state("mcdtSpecificResults", {
          url: "/SpecificGraphMonitorization",
          templateUrl: "./views/LabExams/SpecificGraphMonitorization.html"
      })

    // **************** LabTec Template ********************//
    .state("addLabResults", {
        url: "/addLabResults",
        templateUrl: "./views/LabExams/ListMcdts.html",
    })

    //**************** Patient Info ************************//

    .state("addPatientInfo", {
        url: "/patientInfo",
        templateUrl: "./views/Patient/AddPatientInformation.html"
    })

    .state("consultPatientInfo", {
        url: "/consultPatientInfo",
        templateUrl: "./views/Patient/ListPatientInformation.html"
    })

    .state("clinicProfile", {
        url: "/clinicProfile",
        templateUrl: "./views/Staffs/ListClinicInformation.html"
    })

    .state("labTecProfile", {
        url: "/labTecProfile",
        templateUrl: "./views/Staffs/ListLabTecInformation.html"
    })

    //*********** Treatment Plan **************//
    .state("createTreatmentPlan", {
        url: "/createTreatmentPlan",
        templateUrl: "./views/TreatmentPlans/Index.html"

    })
    .state("consultTreatmentPlan", {
        url: "/TreatmentPlanMed",
        templateUrl: "./Content/TreatmentPlan/TreatmentPlanMed.html"
    })

     // *************** Patient Template ******************//

    .state("patientProfilePage", {
        url: "/patientProfilePage",
        templateUrl: "../Patient/PatientProfilePage"
    })



    .state("patientMcdts", {
        url: "/patientMcdts",
        templateUrl: "../Patient/PatientMcdts"
    })

    .state("patientDiseaseHistory", {
        url: "/patientDiseaseHistory",
        templateUrl: "../Patient/PatientDiseaseHistory"
    })

    .state("patientMedications", {
        url: "/patientMedications",
        templateUrl: "../Patient/PatientMedications"
    })


     .state("patientTreatmentPlan", {
         url: "/TreatmentPlanPatient",
         templateUrl: "../Content/TreatmentPlan/TreatmentPlanPatient.html"
     })
    // ************ Admin template **************** //



    .state("addUser", {
        url: "/addUser",
        templateUrl: "../Account/Register"
    })

    .state("listUsers", {
        url: "/listUsers",
        templateUrl: "../Home/Users"
    })


    .state('logout', {
        url: '/logout',
        templateUrl: 'logOut.html',
        resolve: {
            logOut: function (logOutService) {

                return logOutService.logOut();
            },
        },
        controller: 'logOutController',
    })



});
