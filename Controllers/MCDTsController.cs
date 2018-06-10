using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DataLayer.Entities.MCDT;
using DataLayer.EntityFramework;
using BusinessLayer.Implementation;

namespace HPCareNovaVersao.Controllers {
    public class MCDTsController : Controller {
        private HPCareDBContext db = new HPCareDBContext();
        private ImpMCDTs ImpMcdt;

        // GET: MCDTs
        public ActionResult Index() {
            return PartialView();
        }

        [HttpGet]
        public ActionResult PrescribeMCDT() {
            return PartialView();
        }


        ///[HttpPost]
        public string SavePrescribedMCDT(string[] MCDTS) {
            List<string> listMcdts = MCDTS.ToList();
            new ImpMCDTs(db).SavePrescribedMCDT(listMcdts);
            return "posted ";
        }


    }
}
