app.controller("HelpController", function ($scope) {
    $scope.helpSearchPatient = 'insert userID: UserID is a Unique patient identification number. Press Search to proceed.';

    $scope.helpClassifyDisease = 'Create a new diagnosis for a patient: Choose the category then the sub-category. Press Save To Database to confirm the  diagnosis.'

    $scope.helpGetRegularExamsHistory = 'visualize the MCDTs results prescribed by the clinician. Text: visualize the results by text. Evolution Graph: Visualize the results of evolution of each MCDT component . Control Line Graph:Visualize the results of a specific exam component against control values';

    $scope.helpPrescribeMedicationHistory = 'Query the medication history of a patient.';

    $scope.helpPrescribeMedication = 'Prescribe a new medication . Choose the category, subcategory, dosage, frequency, administration, start date and end date. Press Add To Pool to temporarily hold the prescrition. Press Save To Database to save the new prescrition.';

    $scope.helpListMdts = 'Insert the Lab Results. Press + to  visualize the lab exams  of the selected patient. Press the icon to add the results of that lab exam. To save the results, press Save.';

    $scope.helpUpdateDiseaseStatus = 'To Update a disease status, choose a disease and press Deactivate. The disease will be deadtivated immediately.';

    $scope.helpPatientDiagnosisHistory = 'Shows all the diagnosis history of a patient.';

    $scope.helpPrescribeMcdt = 'Prescribe MCDTs for a patient. Choose the category, then the subcategory and, if choosen LabExams, choose the lab exam to prescribe. Press Add To Pool to temporarily hold the MCDT. Press Save to Database to save the prescribed MCDTs in the database.';

    $scope.helpTreatmentPlan = 'Add a new intervention in the treatment plan for a particular patient. Press Add New to initiate the process. Then in the update panel, choose the category of the treatment plan, subcategory, start date and end date. In the end, press Update to save the newly created intervention to the Treatment Plan.';

});


