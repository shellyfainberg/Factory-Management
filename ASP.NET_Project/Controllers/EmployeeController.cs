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
    public class EmployeeController : ApiController
    {
        EmployeeBL employeeBL = new EmployeeBL();
        // GET: api/Employee
        public IEnumerable<Employee> Get()
        {
            return employeeBL.GetEmployees();
        }

        // GET: api/Employee/5
        public Employee Get(int id)
        {
            return employeeBL.GetEmployee(id);
        }

        // POST: api/Employee
        public string Post(Employee e)
        {
            return employeeBL.AddEmloypee(e);
        }

        // PUT: api/Employee/5
        public string Put(int id, Employee e)
        {
            return employeeBL.UpdateEmployee(id, e);
        }

        // DELETE: api/Employee/5
        public string Delete(int id)
        {
            return employeeBL.DeleteEmployee(id);
        }    // GET: api/Employee
 

    }
}
