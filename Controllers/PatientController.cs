using BusinessLayer.Implementation;
using BusinessLayer.Implementation.ViewModels;
using DataLayer.Entities;
using DataLayer.Entities.UserEntities;
using DataLayer.EntityFramework;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PresentationLayer.Controllers {
    public class PatientController : Controller {

        HPCareDBContext db = new HPCareDBContext();
        private impPatient impPatient;
        private ImpPatientDiagnosisHistory impHistory;
        private ImpMedicationHistory impMedication;
        CurrentUserId current;

        public PatientController() {
            impPatient = new impPatient(db);
            impHistory = new ImpPatientDiagnosisHistory(db,false);
            impMedication = new ImpMedicationHistory();
            current = new CurrentUserId();
        }

        // ************** Get Patient Informations do Clinic ***************** //

        public ActionResult ListPatientInformation() {
            return PartialView();
        }

        public JsonResult GetPatientAllergies() {
            return Json(impPatient.GetPatientAllergies((int) Session["patientId"]), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientRiskFactors() {
            return Json(impPatient.GetPatientRiskFactors((int)Session["patientId"]), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientFamilyHistory() {
            return Json(impPatient.GetPatientFamilyHistory((int) Session["patientId"]), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientInformations() {
            return Json(impPatient.GetPatientInformation((int) Session["patientId"]), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void UpdateAllergies(AllergiesViewModel allergy) {
            impPatient.updateAllergies(allergy);
        }

        // ****************** "Criacao" do Patient ***************** //

        public ActionResult AddPatientInformation() {
            return PartialView();
        }

        public JsonResult GetAllergiesCategoryJson() {
            List<AllergyCategory> category = db.AllergyCategories.ToList();
            return Json(category, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllergiesJson(int categoryId) {
            List<Allergies> allergies = db.Allergies.Where(a => a.AllergyCategory.AllergyCategoryId == categoryId).ToList();
            return Json(allergies, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRiskFactorsCategoryJson() {
            List<RiskFactorsCategory> category = db.RiskFactorsCategories.ToList();
            return Json(category, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetRiskFactorsJson(int categoryId) {
            List<RiskFactors> riskFactors = db.RiskFactors.Where(r => r.RiskFactorCategory.RiskFactorsCategoryId == categoryId).ToList();
            return Json(riskFactors, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFamilyHistoryCategoryJson() {
            List<FamilyHistoryCategory> category = db.FamilyHistoryCategories.ToList();
            return Json(category, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFamilyHistoryJson(int categoryId) {
            List<FamilyHistory> familyHistory = db.FamilyHistories.Where(f => f.FamilyHistoryCategory.FamilyHistoryCategoryId == categoryId).ToList();
            return Json(familyHistory, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void SaveAllergies(List<AllergiesManager> allergies) {
            impPatient.saveAllergies(allergies, null);
        }

        [HttpPost]
        public void SaveRiskFactors(List<RiskFactorsManager> riskFactors) {
            impPatient.saveRiskFactors(riskFactors, null);
        }

        [HttpPost]
        public void SaveFamilyHistory(List<FamilyHistoryManager> familyHistory) {
            impPatient.saveFamilyHistory(familyHistory, null);
        }

        public JsonResult GetGender() {
            return Json(db.Genders.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaritalStatus() {
            return Json(db.MaritalStatus.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void SaveInformations(List<Patient> usersInformations) {
            impPatient.saveDataFromPatient(usersInformations);
        }

        // ********** Patient Template *******************//

        public ActionResult PatientProfilePage() {
            return PartialView();
        }

        public JsonResult GetPatientTemplateInformation() {
            return Json(impPatient.GetPatientInformation(current.AccessDatabase(User.Identity.Name)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientTemplateAllergies() {
            return Json(impPatient.GetPatientAllergies(current.AccessDatabase(User.Identity.Name)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientTemplateRisks() {
            return Json(impPatient.GetPatientRiskFactors(current.AccessDatabase(User.Identity.Name)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientTemplateFamilyHistory() {
            return Json(impPatient.GetPatientFamilyHistory(current.AccessDatabase(User.Identity.Name)), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PatientTreatmentPlan() {
            return PartialView();
        }

        public ActionResult PatientMcdts() {
            return PartialView();
        }

        public JsonResult GetPatientMcdtsJson() {
            CurrentUserId current = new CurrentUserId();
            Patient patient = db.Users.Find(current.AccessDatabase(User.Identity.GetUserName())) as Patient;

            var list = impPatient.GetPatientMcdtsHistory(patient.User_id);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PatientDiseaseHistory() {
            return PartialView();
        }

        public JsonResult GetPatientDiseasesHistoryJson() {
            Patient patient = db.Users.Find(current.AccessDatabase(User.Identity.GetUserName())) as Patient;
            var list = impHistory.GetDiagnosisHistory(patient);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PatientMedications() {
            return PartialView();
        }

        public JsonResult GetPatientMedicationHistoryJson() {
            Patient patient = db.Users.Find(current.AccessDatabase(User.Identity.GetUserName())) as Patient;
            return Json(impPatient.GetPatientMedicationHistory(patient.User_id), JsonRequestBehavior.AllowGet);
        }

    }
}