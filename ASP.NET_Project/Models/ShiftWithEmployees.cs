using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class ShiftWithEmployees
    {
        public int ID { get; set; }
        public System.DateTime Date { get; set; }
        public int Start_Time { get; set; }
        public int End_Time { get; set; }
        public List<Employee> Employees { get; set; }
    }
}