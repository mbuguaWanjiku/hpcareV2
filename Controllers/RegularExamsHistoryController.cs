using BusinessLayer.Implementation;
using DataLayer.Entities.MCDT;
using DataLayer.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PresentationLayer.Controllers
{
    public class RegularExamsHistoryController : Controller
    {
        // GET: RegularExamsHistory
      private HPCareDBContext db = new HPCareDBContext();
      private ImpRegularExamsHistory impRegularExamsHistory;
        

        public RegularExamsHistoryController()
        {
            impRegularExamsHistory = new ImpRegularExamsHistory(db);
        }

        public ActionResult GetRegularExamsHistory()
        {
            return PartialView();
        }
        public JsonResult GetRegularExamsJson(string discriminator)
        {
            return Json(impRegularExamsHistory.GetRegularExamsHistory(discriminator), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMcdt(int id)
        {
            List<MCDT> mcdt = db.MCDTs.Where(x => x.MCDT_ID == id).ToList();
            
            db.Entry(mcdt.FirstOrDefault()).Reference(x => x.MCDT_units).Load();
            //string units = mcdt.MCDT_units.Description;
            return Json(mcdt, JsonRequestBehavior.AllowGet);
        }
    }
}