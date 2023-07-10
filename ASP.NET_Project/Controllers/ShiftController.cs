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
    public class ShiftController : ApiController
    {
        ShiftBL shiftBl = new ShiftBL();
        // GET: api/Shift
        public IEnumerable<Shift> Get()
        {
            return shiftBl.GetShifts();
        }

        // GET: api/Shift/5
        public Shift Get(int id)
        {
            return shiftBl.GetShift(id);
        }

        // POST: api/Shift
        public string Post(Shift s)
        {
            return shiftBl.AddShift(s);
        }

        // PUT: api/Shift/5
        public string Put(int id,Shift s)
        {
            return shiftBl.UpdateShift(id, s);
        }

        // DELETE: api/Shift/5
        public string Delete(int id)
        {
            return shiftBl.DeleteShift(id);
        }
    }
}
