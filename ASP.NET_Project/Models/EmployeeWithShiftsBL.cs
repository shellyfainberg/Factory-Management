using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class EmployeeWithShiftsBL
    {
        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();

        public List<EmployeeWithShifts> GetShifts()
        {
            List<EmployeeWithShifts> empWithShifts = new List<EmployeeWithShifts>();

            foreach (var employee in db.Employees)
            {
                EmployeeWithShifts newEmpWithShift = new EmployeeWithShifts();

                newEmpWithShift.ID = employee.ID;
                newEmpWithShift.First_Name = employee.First_Name;
                newEmpWithShift.Last_Name = employee.Last_Name;
                newEmpWithShift.Start_Work_Year = employee.Start_Work_Year;
                newEmpWithShift.DepartmentID = employee.DepartmentID;

                var department = db.Departments.FirstOrDefault(x => x.ID == employee.DepartmentID);

                if (department != null)
                {
                    newEmpWithShift.DepartmentName = $"{department.Name}";
                }
                newEmpWithShift.shifts = new List<Shift>();

                var empID = db.EmployeeShifts.Where(x => x.EmployeeID == employee.ID);
                foreach (var id in empID)
                {
                    var ShiftObj = db.Shifts.Where(x => x.ID == id.ShiftID);
                    
                    foreach(var shift in ShiftObj)
                    {
                        newEmpWithShift.shifts.Add(shift);
                        
                    }
                }
                empWithShifts.Add(newEmpWithShift);
            }
            return empWithShifts;

        }


        public EmployeeWithShifts GetShift(int id)
        {
            var employee = db.Employees.Where(x => x.ID == id).First();

            EmployeeWithShifts newEmpWithShift = new EmployeeWithShifts();

            newEmpWithShift.ID = employee.ID;
            newEmpWithShift.First_Name = employee.First_Name;
            newEmpWithShift.Last_Name = employee.Last_Name;
            newEmpWithShift.Start_Work_Year = employee.Start_Work_Year;
            newEmpWithShift.DepartmentID = employee.DepartmentID;

            var department = db.Departments.FirstOrDefault(x => x.ID == employee.DepartmentID);

            if (department != null)
            {
                newEmpWithShift.DepartmentName = $"{department.Name}";
            }
            newEmpWithShift.shifts = new List<Shift>();

            var empID = db.EmployeeShifts.Where(x => x.EmployeeID == employee.ID);
            foreach (var ide in empID)
            {
                var ShiftObj = db.Shifts.Where(x => x.ID == ide.ShiftID);
                foreach (var shift in ShiftObj)
                {
                    newEmpWithShift.shifts.Add(shift);
                }
            }
            return newEmpWithShift;

        }

        public string AddShift(EmployeeShift s)
        {
            db.EmployeeShifts.Add(s);
            db.SaveChanges();
            return "Created!";
        }

    }
}