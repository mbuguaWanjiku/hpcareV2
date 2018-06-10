using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;
using DataLayer.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace PresentationLayer.Models {
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser {

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager) {

            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AspNetUsersId {
            get; set;
        }

        public string UserType {
            get; set;
        }

    }

    public class HPCareDBContext : IdentityDbContext<ApplicationUser> {
        public HPCareDBContext()
            : base("HPCareDBContext", throwIfV1Schema: false) {
        }

        public static HPCareDBContext Create() {
            return new HPCareDBContext();
        }
    }
}