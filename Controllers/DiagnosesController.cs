using BusinessLayer.Implementation;
using DataLayer.Entities;
using DataLayer.Entities.DiagnosisEntities;
using DataLayer.Entities.Visitas;
using DataLayer.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace PresentationLayer.Controllers {
    public class DiagnosisController : Controller {

        private HPCareDBContext db = new HPCareDBContext();

        private impDiagnosis impDiagnosis;

        /// <summary>
        /// Initializes a new instance of the <see cref="DiagnosisController"/> class.
        /// </summary>
        public DiagnosisController() {
            impDiagnosis = new impDiagnosis(db);
            db.Configuration.ProxyCreationEnabled = false;
        }

        public ActionResult ClassifyDisease() {
            return PartialView();
        }

        /// <summary>
        /// Classifies the disease cid.
        /// </summary>
        /// <returns></returns>
        public ActionResult ClassifyDisease_CID() {
            return PartialView();
        }

        /// <summary>
        /// Classifies the disease cid.
        /// </summary>
        /// <param name="CIDclassification">The ci dclassification.</param>
        /// <returns></returns>
        [HttpPost]
        public string ClassifyDisease_CID(List<CID_DiseaseCode> CIDclassification) {

            impDiagnosis.SaveDiagnosis(CIDclassification);
            return "classified";
        }

        [HttpGet]
        public ActionResult DeactivateDisease() {
            return View();
        }

        [HttpPost]
        public string DeactivateDisease(int disease_id) {
            return impDiagnosis.DeactivateDisease(disease_id);
        }

        public ActionResult UpdateDiseaseStatus() {
            return PartialView();
        }

        public PartialViewResult UpdateDiseaseStatusResult() {
            return PartialView("~/Views/Diagnosis/UpdateDiseaseStatus.cshtml");
        }


        public ActionResult GetPatientDiagnosisHistory() {
            return PartialView();
        }
        [HttpGet]
        public JsonResult GetPatientDiagnosisHistoryData(bool state) {
            ImpPatientDiagnosisHistory history = new ImpPatientDiagnosisHistory(db,state);
            Patient patient = db.Users.Find((int)Session["patientId"]) as Patient;

            List<PatientDiseaseHistoryVM> HistoryList = history.GetDiagnosisHistory(patient);
            return Json(HistoryList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCidCodeCategories() {
            List<CID_Category> list = db.CID_Categories.ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCIDByCategory(int category_id) {
            var disease = from dis in db.CID_DiseaseCodes
                          where dis.CIDCategory.CID_CategorID == category_id
                          select dis;
            List<CID_DiseaseCode> listDrug = db.CID_DiseaseCodes.Where(x => x.CIDCategory.CID_CategorID == category_id).ToList();
            return Json(listDrug, JsonRequestBehavior.AllowGet);
        }

    }
}