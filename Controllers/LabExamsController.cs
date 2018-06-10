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
using DataLayer.Entities;
using DataLayer.Entities.MCDTEntities;
using System.Data.SqlClient;
using System.Data.Common;
using BusinessLayer.Implementation;

namespace PresentationLayer.Controllers {
    public class LabExamsController : Controller {
        private HPCareDBContext db = new HPCareDBContext();
        private impLabExams impLabExams;

        public LabExamsController() {
            impLabExams = new impLabExams(db);
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        // lab exams com angular //

        /// <summary>
        /// Lists the MCDTS.
        /// </summary>
        /// <returns></returns>
        public ActionResult ListMcdts() {
            return PartialView();
        }

        public JsonResult ListPatientLabExamsJson() {
            return Json(impLabExams.ListMcdts(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void saveKftResults(List<KFT> kftList) {
            impLabExams.saveKft(kftList);
        }

        /// <summary>
        /// Saves the LFT results.
        /// </summary>
        /// <param name="lftList">The LFT list.</param>
        [HttpPost]
        public void saveLftResults(List<LFT> lftList) {
            impLabExams.saveLft(lftList);
        }

        [HttpPost]
        public void saveLymphocyteResults(List<LymphocytesSubsets> lymphocytesList) {
            impLabExams.saveLymphocyteSubsets(lymphocytesList);
        }

        [HttpPost]
        public void savePlateletsResults(List<PlateletsCount> plateletsList) {
            impLabExams.savePlateletsCount(plateletsList);
        }

        [HttpPost]
        public void saveRbcIndicesResults(List<RBCIndices> rbcIndicesList) {
            impLabExams.saveRbcIndices(rbcIndicesList);
        }

        [HttpPost]
        public void saveRbcsResults(List<RBCS> rbcsList) {
            impLabExams.saveRbcs(rbcsList);
        }

        [HttpPost]
        public void savViralLoadResults(List<ViralLoad> viralLoadList) {
            impLabExams.saveViralLoad(viralLoadList);
        }

        [HttpPost]
        public void saveWbcsResults(List<WBCS> wbcsList) {
            impLabExams.saveWbcs(wbcsList);
        }

        public ActionResult MonitorizationGraphs() {
            return PartialView();
        }

        public ActionResult SpecificGraphMonitorization() {
            return PartialView();
        }

        public JsonResult SpecificMonitorizationJson(string discriminator, string specificParameter, string listaIds) {
            List<double> valuesList = SpecificValues(discriminator, specificParameter, listaIds);
            return Json(valuesList, JsonRequestBehavior.AllowGet);
        }

        public List<double> SpecificValues(string discriminator, string specificParameter, string listaIds) {
            if (specificParameter.Equals("null")) {
                specificParameter = TesteColumnNames(discriminator).First();
            }

            var split = listaIds.Split(',');
            var result = split;
            List<int> mcdtsIdsList = new List<int>();

            for (int j = 0; j < result.Length - 1; j++) {
                mcdtsIdsList.Add(Convert.ToInt32(result[j]));
            }

            List<double> values = new List<double>();
            foreach (var item in mcdtsIdsList) {

                using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                    SqlCommand command = new SqlCommand("select " + specificParameter + " from " + discriminator + " where " + TesteColumnNames(discriminator).First() + " != '' and mcdt_id = " + item + ";", connection);

                    command.CommandType = CommandType.Text;
                    command.Connection = connection;
                    connection.Open();
                    DbDataReader dbDataReader = command.ExecuteReader();

                    while (dbDataReader.Read()) {
                        for (int i = 0; i < dbDataReader.FieldCount; i++) {
                            values.Add(dbDataReader.GetDouble(i));
                        }
                    }
                    dbDataReader.Close();

                }
            }
            return values;
        }

        public JsonResult PatientZeroMax(string discriminator, string component) {
            if (component.Equals("null")) {
                component = TesteColumnNames(discriminator).First();
            }
            List<double> list = new List<double>();

            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                SqlCommand command = new SqlCommand("select top 1(" + component + ") from " + discriminator + ";", connection);

                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();

                while (dbDataReader.Read()) {
                    list.Add(dbDataReader.GetDouble(0));
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PatientZeroMin(string discriminator, string component) {
            if (component.Equals("null")) {
                component = TesteColumnNames(discriminator).First();
            }
            List<double> list = new List<double>();

            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                SqlCommand command = new SqlCommand("select min(" + component + ") from (select top 2(" + component + ") from " + discriminator + ") a;", connection);

                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();

                while (dbDataReader.Read()) {
                    list.Add(dbDataReader.GetDouble(0));
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        // *************************************************************** //

        /// <summary>
        /// devolve as datas dos mcdt's que sao passadas na lista 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult TesteDateJson(string listIds) {
            var split = listIds.Split(',');
            var result = split;
            List<int> mcdtsIdsList = new List<int>();

            for (int j = 0; j < result.Length - 1; j++) {
                mcdtsIdsList.Add(Convert.ToInt32(result[j]));
            }

            List<DateTime> dates = new List<DateTime>();
            MCDT mcdt;

            foreach (var item in mcdtsIdsList) {
                mcdt = db.MCDTs.Find(item);
                dates.Add((DateTime)mcdt.MCDT_date);
            }
            return Json(dates, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// metodo auxiliar que vai buscar o nome das colunas de cada mcdt. (Exemplo: KFT -> bun, creatinine, uricAcid)
        /// </summary>
        /// <returns></returns>
        private List<string> TesteColumnNames(string discriminator) {
            List<string> columns = new List<string>();

            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                SqlCommand command = new SqlCommand("select " + discriminator + ".* from " + discriminator + ";", connection);

                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();

                for (int i = 1; i < dbDataReader.FieldCount; i++) { //comeca na posicao 1 para que o MCDT_ID nao seja adicionado à lista de column names
                    columns.Add(dbDataReader.GetName(i));
                }
                dbDataReader.Close();
            }

            return columns;
        }

        [HttpGet]
        public JsonResult TesteColumnsNamesJson(string discrimininator) {
            List<string> columnsNames = TesteColumnNames(discrimininator);
            return Json(columnsNames, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// metodo que devolve os valores de cada row dos mcdts que são passados na lista
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult TesteValores(string mcdtsIds, string discriminator) {
            var split = mcdtsIds.Split(',');
            var result = split;
            List<int> mcdtsIdsList = new List<int>();

            for (int j = 0; j < result.Length - 1; j++) {
                mcdtsIdsList.Add(Convert.ToInt32(result[j]));
            }

            List<double> valoresMcdts = new List<double>();
            List<string> nomeColunas = TesteColumnNames(discriminator);
            var counter = 0;// var auxiliar que conta o nome de rows que existem 

            foreach (var item in mcdtsIdsList) {
                using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {

                    SqlCommand command = new SqlCommand("select " + discriminator + ".* from " + discriminator + ", mcdts where mcdts.mcdt_id = " + discriminator + ".mcdt_id and " + nomeColunas.First() + " != '' and mcdts.mcdt_id = " + item + ";", connection);

                    command.CommandType = CommandType.Text;
                    command.Connection = connection;
                    connection.Open();
                    DbDataReader dbDataReader = command.ExecuteReader();

                    while (dbDataReader.Read()) {
                        for (int i = 1; i < dbDataReader.FieldCount; i++) {// comeca no 1 para que o id nao seja introduzido na lista de valores
                            valoresMcdts.Add(dbDataReader.GetDouble(i));
                        }
                        counter++;
                    }
                    dbDataReader.Close();
                }
            }
            valoresMcdts.Add(counter);

            return Json(valoresMcdts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult NumberLabExamsNull() {
            return Json(impLabExams.NumberLabExamsNull(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult NumberLabExams() {
            return Json(impLabExams.NumberLabExams(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientZeroResultsMax(string discriminator) {
            List<double> list = new List<double>();

            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                SqlCommand command = new SqlCommand("select top 1 * from " + discriminator + ";", connection);

                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();

                while (dbDataReader.Read()) {
                    for (int i = 1; i < dbDataReader.FieldCount; i++) {// comeca no 1 para que o id nao seja introduzido na lista de valores
                        list.Add(dbDataReader.GetDouble(i));
                    }
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPatientZeroResultsMin(string discriminator) {
            List<double> list = new List<double>();

            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;")) {
                SqlCommand command = new SqlCommand("select top 1 * from (select top 2 * from " + discriminator + " order by mcdt_id asc) as k order by k.mcdt_id desc;", connection);

                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();

                while (dbDataReader.Read()) {
                    for (int i = 1; i < dbDataReader.FieldCount; i++) {// comeca no 1 para que o id nao seja introduzido na lista de valores
                        list.Add(dbDataReader.GetDouble(i));
                    }
                }
            }

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}

