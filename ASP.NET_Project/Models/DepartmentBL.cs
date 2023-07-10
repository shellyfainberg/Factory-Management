using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class DepartmentBL
    {
        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();


        // get all departments with manager name
        public List<Department> GetDepartments()
        {
            var departments = db.Departments.ToList();

            foreach (var department in departments)
            {
                var manager = db.Employees.FirstOrDefault(x => x.ID == department.Manager);

                if (manager != null)
                {
                    department.Manager_Name = $"{manager.First_Name} {manager.Last_Name}";
                }
                bool hasNonManagerEmployees;
                bool hasEmployeeAtAll = db.Employees.Any(emp => emp.DepartmentID == department.ID);
                if (!hasEmployeeAtAll)
                {
                    hasNonManagerEmployees = true;
                }
                else
                {
                    hasNonManagerEmployees = db.Employees.Any(emp => emp.DepartmentID == department.ID && emp.ID != department.Manager);
                }
                department.HasNonManagerEmployees = hasNonManagerEmployees;
            }
            return departments;
        }



        public Department GetDepartment(int id)
        {
            return db.Departments.Where(x => x.ID == id).First();
        }

        public string AddDepartment(Department d)
        {
            db.Departments.Add(d);
            db.SaveChanges();
            return "Created!";
        }

        public string UpdateDepartment(int id, Department department)
        {
            Department d = db.Departments.Where(x => x.ID == id).First();
            d.Name = department.Name;
            d.Manager = department.Manager;

            db.SaveChanges();
            return "Updated!";
        }

        public string DeleteDepartment(int id)
        {
            Department d = db.Departments.Where(x => x.ID == id).First();

            if (d != null)
            {
                foreach (var emp in db.Employees)
                {
                    if (emp.DepartmentID == id)
                    {
                        emp.DepartmentID = 0;
                    }
                }
                db.Departments.Remove(d);
                db.SaveChanges();
                return " Deleted!";
            }
            return "No Department Found!";
        }

    }
}