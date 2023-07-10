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
    public class ShiftWithEmployeesController : ApiController
    {
        ShiftWithEmployeesBL shiftBl = new ShiftWithEmployeesBL();
        // GET: api/ShiftWithEmployees
        public IEnumerable<ShiftWithEmployees> Get()
        {
            return shiftBl.GetShiftsWithEmp();
        }

        // GET: api/ShiftWithEmployees/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ShiftWithEmployees
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ShiftWithEmployees/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShiftWithEmployees/5
        public void Delete(int id)
        {
        }
    }
}
