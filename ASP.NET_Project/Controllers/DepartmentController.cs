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
    public class DepartmentController : ApiController
    {
        DepartmentBL departmentBL = new DepartmentBL();
        // GET: api/Department
        public IEnumerable<Department> Get()
        {
            return departmentBL.GetDepartments();
        }

        // GET: api/Department/5
        public Department Get(int id)
        {
            return departmentBL.GetDepartment(id);
        }

        // POST: api/Department
        public string Post(Department d)
        {
            return departmentBL.AddDepartment(d);
        }

        // PUT: api/Department/5
        public string Put(int id, Department d)
        {
            return departmentBL.UpdateDepartment(id, d);
        }

        // DELETE: api/Department/5
        public string Delete(int id)
        {
            return departmentBL.DeleteDepartment(id);
        }
    }
}
