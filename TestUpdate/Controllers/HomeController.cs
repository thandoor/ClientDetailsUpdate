using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestUpdate.Models;

namespace TestUpdate.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetAllClients()
        {
            using (ClientDataEntities dbContext = new ClientDataEntities())
            {
                var clientList = dbContext.Customers.ToList();
                return Json(clientList, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetClientById(string clientId)
        {
            using (ClientDataEntities dbContext = new ClientDataEntities())
            {
                int id = Convert.ToInt32(clientId);
                var clientList = dbContext.Customers.Find(id);
                return Json(clientList, JsonRequestBehavior.AllowGet);
            }
        }
        public string UpdateClient(Customer client)
        {
            if (client != null)
            {
                using (ClientDataEntities dbContext = new ClientDataEntities())
                {
                    int no = Convert.ToInt32(client.Id);
                    var clientList = dbContext.Customers.Where(x => x.Id == no).FirstOrDefault();
                    clientList.FirstName =client.FirstName;
                    clientList.LastName = client.LastName;
                    clientList.DateOfBirth = client.DateOfBirth;
                    clientList.IdentityType = client.IdentityType;
                    clientList.IdentityNumber = client.IdentityNumber;
                    dbContext.SaveChanges();
                    return "Client Info Updated";
                }
            }
            else
            {
                return "Client not found";
            }
        }
        public string AddClient(Customer client)
        {
            if (client != null)
            {
                using (ClientDataEntities dbContext = new ClientDataEntities())
                {
                    dbContext.Customers.Add(client);
                    dbContext.SaveChanges();
                    return "Client Details Added";
                }
            }
            else
            {
                return "Client not found";
            }
        }


        public string DeleteClient(Customer client)
        {
            if (client!= null)
            {
                using (ClientDataEntities dbContext = new ClientDataEntities())
                {
                    int no = Convert.ToInt32(client.Id);
                    var clientList = dbContext.Customers.Where(x => x.Id == no).FirstOrDefault();
                    dbContext.Customers.Remove(clientList);
                    dbContext.SaveChanges();
                    return "Client deleted successfully";
                }
            }
            else
            {
                return "Client not found";
            }
        }
    }
}
