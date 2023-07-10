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
    public class EmployeeWithShiftsController : ApiController
    {
        EmployeeWithShiftsBL empBl = new EmployeeWithShiftsBL();

        // GET: api/EmployeeWithShifts
        public IEnumerable<EmployeeWithShifts> Get()
        {
            return empBl.GetShifts();
        }

        // GET: api/EmployeeWithShifts/5
        public EmployeeWithShifts Get(int id)
        {
            return empBl.GetShift(id);
        }

        // POST: api/EmployeeWithShifts
        public string Post(EmployeeShift empShift)
        {
            return empBl.AddShift(empShift);
        }

        // PUT: api/EmployeeWithShifts/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EmployeeWithShifts/5
        public void Delete(int id)
        {
        }
    }
}
