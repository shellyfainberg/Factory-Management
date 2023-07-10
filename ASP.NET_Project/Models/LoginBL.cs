using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASP.NET_Project.Models
{
    public class LoginBL
    {
        ASP_NET_FinalProjectEntities db = new ASP_NET_FinalProjectEntities();

        public List<User> GetUsers()
        {
            return db.Users.ToList();
        }
        public User GetUser(int id)
        {
            return db.Users.Where(x => x.ID == id).First();
        }

        public string AddUser(User u)
        {
            db.Users.Add(u);
            db.SaveChanges();
            return "Created!";
        }

        public string UpdateUser(int id, User user)
        {
            User u = db.Users.Where(x => x.ID == id).First();
            u.Full_Name = user.Full_Name;
            u.Username = user.Username;
            u.Password = user.Password;
            u.Num_Of_Actions = user.Num_Of_Actions;

            db.SaveChanges();
            return "Updated!";
        }

        public string DeleteUser(int id)
        {
            User u = db.Users.Where(x => x.ID == id).First();
            db.Users.Remove(u);
            db.SaveChanges();
            return "Deleted";
        }
    }
}