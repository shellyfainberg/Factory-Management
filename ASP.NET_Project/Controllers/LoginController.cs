using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ASP.NET_Project.Models;
using System.Web.Http.Cors;

namespace ASP.NET_Project.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        LoginBL loginBl = new LoginBL();
        // GET: api/Login
        public IEnumerable<User> Get()
        {
            return loginBl.GetUsers();
        }

        // GET: api/Login/5
        public User Get(int id)
        {
            return loginBl.GetUser(id);
        }

        // POST: api/Login
        public string Post(User u)
        {
            return loginBl.AddUser(u);
        }

        // PUT: api/Login/5
        public string Put(int id, User u)
        {
            return loginBl.UpdateUser(id, u);
        }

        // DELETE: api/Login/5
        public string Delete(int id)
        {
            return loginBl.DeleteUser(id);
        }
    }
}
