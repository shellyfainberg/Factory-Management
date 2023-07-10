using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class EmployeeBL
    {
        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();

        public List<Employee> GetEmployees()
        {
            var employees = db.Employees.ToList();

            foreach (var employee in employees)
            {
                var department = db.Departments.FirstOrDefault(x => x.ID == employee.DepartmentID);

                if (department != null)
                {
                    employee.DepartmentName = $"{department.Name}";
                }

            }
            return employees;
        }
        public Employee GetEmployee(int id)
        {
            return db.Employees.Where(x => x.ID == id).First();
        }

        public string AddEmloypee(Employee employee)
        {
            db.Employees.Add(employee);
            db.SaveChanges();
            return "Created!";
        }

        public string UpdateEmployee(int id, Employee employee)
        {
            Employee e = db.Employees.Where(x => x.ID == id).First();
            e.First_Name = employee.First_Name;
            e.Last_Name = employee.Last_Name;
            e.Start_Work_Year = employee.Start_Work_Year;
            e.DepartmentID = employee.DepartmentID;

            db.SaveChanges();
            return "Updated!";
        }

        public string DeleteEmployee(int id)
        {
            Employee e = db.Employees.Where(x => x.ID == id).First();
            db.Employees.Remove(e);
            db.SaveChanges();
            return "Deleted";
        }
    }
}