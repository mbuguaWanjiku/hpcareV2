using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DataLayer.Entities;
using DataLayer.EntityFramework;
using BusinessLayer.Implementation;

namespace PresentationLayer.Controllers {
    public class StaffsController : Controller {
        private HPCareDBContext db = new HPCareDBContext();
        private impStaff impStaff;
        private CurrentUserId current;

        public StaffsController() {
            impStaff = new impStaff(db);
            current = new CurrentUserId();
        }


        public ActionResult ListClinicInformation() {
            return PartialView();
        }

        public JsonResult GetStaffInformation() {
            Staff staff = db.Users.Find(current.AccessDatabase(User.Identity.Name)) as Staff; 

            return Json(impStaff.GetStaffInformations(staff.User_id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGender() {
            return Json(db.Genders.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetMaritalStatus() {
            return Json(db.MaritalStatus.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListLabTecInformation() {
            return PartialView();
        }

        [HttpPost]
        public void SaveStaffInformations(List<Staff> staffInformations) {
            impStaff.saveStaffInformations(staffInformations, current.AccessDatabase(User.Identity.Name));
        }

        protected override void Dispose(bool disposing) {
            if(disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
