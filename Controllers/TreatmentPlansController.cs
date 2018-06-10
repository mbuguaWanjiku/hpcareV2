using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DataLayer.Entities.PatientEntities;
using DataLayer.EntityFramework;
using System.Web.Services.Description;
using System.Globalization;
using BusinessLayer.Implementation;
using DataLayer.Entities;

namespace PresentationLayer.Controllers {
    public class TreatmentPlansController : Controller {
        private HPCareDBContext db = new HPCareDBContext();
        private ImpTreatmentPlan impTreatmentPlan;
        // GET: TreatmentPlans
        public TreatmentPlansController() {
            impTreatmentPlan = new ImpTreatmentPlan(db);
        }
        public ActionResult Index() {
            return Redirect("../Content/TreatmentPlan/index.html");
        }
        [HttpGet]
        public JsonResult GetTreatmentCategories() {
            return Json(impTreatmentPlan.getTreatmentTypeCategories(),
                   JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetTreatmentType(int id) {
            return Json(impTreatmentPlan.getTreatmentType(id),
                          JsonRequestBehavior.AllowGet);
        }
        //[HttpPost]
        public string SaveInterventions(List<String> intervention) {

            impTreatmentPlan.SaveInterventions(intervention);
            return "success";
        }
        [HttpGet]
        public JsonResult GetInterventions() {
            int id = new CurrentUserId().AccessDatabase(User.Identity.Name);
            Users logged = db.Users.Find(id);
            return Json(impTreatmentPlan.GetInterventions(logged), JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        public void AddInterventions() {
            impTreatmentPlan.AddIntervention();
        }

        //[HttpPost]
        public void DeleteIntervention(int id) {
            impTreatmentPlan.DeleteIntervention(id);
        }


    }
}