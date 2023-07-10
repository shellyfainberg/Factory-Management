using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class ShiftWithEmployeesBL
    {

        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();

        public List<ShiftWithEmployees> GetShiftsWithEmp()
        {
            List<ShiftWithEmployees>shiftWithEmpolyees = new List<ShiftWithEmployees>();

            foreach (var shift in db.Shifts)
            {

                ShiftWithEmployees newShiftWithEmp = new ShiftWithEmployees();

                newShiftWithEmp.ID = shift.ID;
                newShiftWithEmp.Date = shift.Date;
                newShiftWithEmp.Start_Time = shift.Start_Time;
                newShiftWithEmp.End_Time = shift.End_Time;
                newShiftWithEmp.Employees = new List<Employee>();

                var shiftID = db.EmployeeShifts.Where(x => x.ShiftID == shift.ID);
                foreach (var id in shiftID)
                {
                    var EmpObj = db.Employees.Where(x => x.ID == id.EmployeeID);

                    foreach (var emp in EmpObj)
                    {
                        newShiftWithEmp.Employees.Add(emp);
                    }

                }
                shiftWithEmpolyees.Add(newShiftWithEmp);

            }
            return shiftWithEmpolyees;
        }

     }   
}