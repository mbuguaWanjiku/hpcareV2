using BusinessLayer.Implementation;
using BusinessLayer.Implementation.ViewModels;
using DataLayer.Entities;
using DataLayer.Entities.Visitas;
using DataLayer.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PresentationLayer.Controllers
{
    public class ObservationController : Controller
    {
        // GET: Observation
        private HPCareDBContext db;
        private ImpObservations impObservations;
        public ObservationController()
        {
            db = new HPCareDBContext();
            impObservations = new ImpObservations(db);

        }
        public ActionResult CreateObservation()
        {
            return PartialView();
        }
        public ActionResult ObservationsHistory()
        {
            return PartialView();
        }
        public ActionResult PatientObservations()
        {
            return PartialView();
        }

        public string SaveObservation(List<string> observationList)
        {
            int c = observationList.Count;
            impObservations.SaveObservation(observationList);
            return "posted";
        }
        public JsonResult GetObservationsHistory()
        {
            return Json(impObservations.GetObservations(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetObservation(int id)
        {
            return Json(db.Observations.Where(x=>x.observations_ID==id), JsonRequestBehavior.AllowGet);
        }
    }
}
