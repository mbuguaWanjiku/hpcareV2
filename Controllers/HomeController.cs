using BusinessLayer;
using BusinessLayer.Implementation;
using BusinessLayer.Implementation.ViewModels;
using DataLayer.Entities;
using DataLayer.Entities.MCDTEntities;
using DataLayer.EntityFramework;
using HPCareNovaVersao;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PresentationLayer.Controllers {
    public class HomeController : Controller {

        HPCareDBContext context = new HPCareDBContext();

        public ActionResult Index() {
            if(User.IsInRole("Admin")) {
                return Redirect("Hpcare/HomeAdmin.html");
            } else if(User.IsInRole("Clinic")) {
                return Redirect("Hpcare/Home.html");
            } else if(User.IsInRole("LabTec")) {
                return Redirect("Hpcare/HomeLabTec.html");
            } else if(User.IsInRole("Patient")) {
                return Redirect("Hpcare/HomePatient.html");
            }
            return View();
        }

        public ActionResult About() {
            ViewBag.Message = "Your application description page.";

            return PartialView();
        }

        public ActionResult Contact() {
            ViewBag.Message = "Your contact page.";

            return PartialView();
        }

        public ActionResult Users() {
            List<int> lista = new List<int>();
            return PartialView();
        }

        public JsonResult AllUsers() {
            return Json(context.Users.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult NumberUsers() {
            return Json(context.Users.ToList().Count, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NumberSpecificUsers(int i) {
            return Json(context.Users.Where(a => a.UserType == i).ToList().Count, JsonRequestBehavior.AllowGet);
        }
      
        public JsonResult NumberMcdts() {
            return Json(context.MCDTs.ToList().Count, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NumberSpecificMcdt(MCDTType i) {
            return Json(context.MCDTs.Where(a => a.MCDT_type == i).ToList().Count, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SearchPatient(string search) {
            return PartialView();
        }
        public ActionResult SearchUsers()
        {
            return PartialView();
        }
        public JsonResult SearchAllusers()
        {
            List<UsersSearchVM> listUsers = new ImpHome().SearchUsers(context);
            return Json(listUsers,JsonRequestBehavior.AllowGet);
        }

        public bool Search(string search) {
            ImpHome homeImplementation = new ImpHome();
            //string aux = Request.QueryString["search"];
            string aux = search;
            PatientViewModel patient = homeImplementation.AccessDatabase(aux);
            if (patient !=null)
            {
                Session["patientId"] = patient.User_id;
                return true;
            }
         
            return false;
            //return Json(patient, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// whether is firts visit
        /// </summary>
        /// <returns></returns>
        public bool IsFirstVisit()
        {
            return new ImpHome().IsFirstVist(context);
        }
       

    }
}