using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace asp.net_MVC_CRUD_AJAX.Models
{
    public class Context:DbContext
    {
        public Context() : base("BancoUsuario") { }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}