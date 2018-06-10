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

namespace PresentationLayer.Controllers {
    public class InterventionsController : Controller {
        private HPCareDBContext db = new HPCareDBContext();

        // GET: Interventions
        public ActionResult Index() {
            return View(db.Interventions.ToList());
        }

        // GET: Interventions/Details/5
        public ActionResult Details(int? id) {
            if(id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Intervention intervention = db.Interventions.Find(id);
            if(intervention == null) {
                return HttpNotFound();
            }
            return View(intervention);
        }

        // GET: Interventions/Create
        public ActionResult Create() {
            return View();
        }

        // POST: Interventions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Intervention_id,Intervention_start_day,Intervention_end_day,Intervention_type")] Intervention intervention) {
            if(ModelState.IsValid) {
                db.Interventions.Add(intervention);
                db.SaveChanges();
                return RedirectToAction("../TreatmentPlans/PatientTreatmentPlan");
            }

            return View("../TreatmentPlans/PatientTreatmentPlan");
        }

        // GET: Interventions/Edit/5
        public ActionResult Edit(int? id) {
            if(id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Intervention intervention = db.Interventions.Find(id);
            if(intervention == null) {
                return HttpNotFound();
            }
            return View(intervention);
        }

        // POST: Interventions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Intervention_id,Intervention_start_day,Intervention_end_day,Intervention_type")] Intervention intervention) {
            if(ModelState.IsValid) {
                db.Entry(intervention).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(intervention);
        }

        // GET: Interventions/Delete/5
        public ActionResult Delete(int? id) {
            if(id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Intervention intervention = db.Interventions.Find(id);
            if(intervention == null) {
                return HttpNotFound();
            }
            return View(intervention);
        }

        // POST: Interventions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id) {
            Intervention intervention = db.Interventions.Find(id);
            db.Interventions.Remove(intervention);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) {
            if(disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
