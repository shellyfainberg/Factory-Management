using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class ShiftBL
    {
        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();

        public List<Shift> GetShifts()
        {
            return db.Shifts.ToList();

        }
        public Shift GetShift(int id)
        {
            return db.Shifts.Where(x => x.ID == id).First();
        }

        public string AddShift(Shift s)
        {
            db.Shifts.Add(s);

            db.SaveChanges();
            return "Created!";
        }

        public string UpdateShift(int id, Shift shift)
        {
            Shift s = db.Shifts.Where(x => x.ID == id).First();
           
            s.Date = shift.Date;
            s.Start_Time = shift.Start_Time;
            s.End_Time = shift.End_Time;

            db.SaveChanges();
            return "Updated!";
        }

        public string DeleteShift(int id)
        {
            Shift s = db.Shifts.Where(x => x.ID == id).First();
            db.Shifts.Remove(s);

            db.SaveChanges();
            return "Deleted";
        }
    }
}