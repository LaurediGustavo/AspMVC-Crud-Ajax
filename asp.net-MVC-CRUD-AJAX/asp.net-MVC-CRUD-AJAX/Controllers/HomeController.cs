using asp.net_MVC_CRUD_AJAX.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace asp.net_MVC_CRUD_AJAX.Controllers
{
    public class HomeController : Controller
    {
        Context context = new Context();

        public ActionResult Index()
        {
            return View();
        }

        //GET : Usuarios
        public JsonResult Get(string nome)
        {
            var usuario = context.Usuarios.OrderByDescending(u => u.Id).ToList();

            if (!String.IsNullOrEmpty(nome))
            {
                usuario = usuario.Where(u => u.Nome.Contains(nome)).ToList();
            }

            return Json(usuario, JsonRequestBehavior.AllowGet);
        }

        // GET: Usuario/Details/id
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            
            Usuario usuario = context.Usuarios.Find(id);

            if (usuario == null)
            {
                return HttpNotFound();
            }

            return Json(usuario, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create ([Bind(Include = "Nome, Email")] Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                context.Usuarios.Add(usuario);
                context.SaveChanges();
                return Json(JsonRequestBehavior.AllowGet);
            }

            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        }

        [HttpPost]
        public ActionResult Update ([Bind(Include = "Id, Nome, Email")] Usuario usuario)
        {
            if (ModelState.IsValid)
            {
                context.Entry(usuario).State = EntityState.Modified;
                context.SaveChanges();
                return Json(JsonRequestBehavior.AllowGet);
            }

            return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        }

        [HttpPost]
        public ActionResult Delete (int? id)
        {
            try
            {
                var usuario = context.Usuarios.Find(id);
                context.Usuarios.Remove(usuario);
                context.SaveChanges();

                return Json(JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        }
    }
}