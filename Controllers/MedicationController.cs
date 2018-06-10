using BusinessLayer.Implementation;
using DataLayer.Entities.TreatmentEntities;
using DataLayer.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace PresentationLayer.Controllers {
    public class MedicationController : Controller {
        private HPCareDBContext db = new HPCareDBContext();
        private ImpMedication impMedication;
        public MedicationController() {
            impMedication = new ImpMedication(db);
        }
        [HttpGet]
        public ActionResult PrescribeMedication() {
            return PartialView();
        }
        [HttpGet]
        public ActionResult PrescribeMedicationHistory() {
            return PartialView();
        }
        public JsonResult GetDrugsCategories() {
            return Json(db.DrugCategories.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDrugByCategory(int category_id) {
            List<Drug> listDrug = db.Drugs.Where(x => x.Category.category_id == category_id).ToList();
            return Json(listDrug, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDrugFrequencies() {
            List<DrugFrequency> list = db.DrugFrequencies.GroupBy(x => x.Description).Select(y => y.FirstOrDefault()).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDrugAdministrations() {
            return Json(db.DrugAdministrations.GroupBy(x => x.Description).Select(y => y.FirstOrDefault()).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDrugDosages() {
            return Json(db.DrugDosages.GroupBy(x => x.Description).Select(y => y.FirstOrDefault()).ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public string SavePrescribedDrugs(List<DrugIssuance> prescribedDrugs) {

            impMedication.savePrescribedMedication(prescribedDrugs);
            return "hitted prescription";
        }

        public JsonResult GetMedicationHistory() {
            List<MedicationHistoryVm> medVm = new ImpMedicationHistory().GetPatientMedicationHistory();

            return Json(medVm, JsonRequestBehavior.AllowGet);
        }
    }


}
