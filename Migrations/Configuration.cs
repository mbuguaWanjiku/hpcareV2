namespace HPCareNovaVersao.Migrations {
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using PresentationLayer.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PresentationLayer.Models.HPCareDBContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(PresentationLayer.Models.HPCareDBContext context) {
            //Role para o Admin
            if(!context.Roles.Any(r => r.Name == "Admin")) {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            //User Admin
            if(!context.Users.Any(u => u.UserName == "Admin")) {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "Admin", Email="admin@hotmail.com" };

                manager.Create(user, "Qwerty123!");
                manager.AddToRole(user.Id, "Admin");
            }

            //Role para o Clinic
            if(!context.Roles.Any(r => r.Name == "Clinic")) {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Clinic" };

                manager.Create(role);
            }

            //User para o Clinic
            if(!context.Users.Any(u => u.UserName == "Clinic")) {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "Clinic", Email="clinic@hotmail.com" };

                manager.Create(user, "Qwerty123!");
                manager.AddToRole(user.Id, "Clinic");
            }

            //Role para o LabTec
            if(!context.Roles.Any(r => r.Name == "LabTec")) {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "LabTec" };

                manager.Create(role);
            }

            //User para o LabTec
            if(!context.Users.Any(u => u.UserName == "LabTec")) {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "LabTec", Email = "labtec@hotmail.com" };

                manager.Create(user, "Qwerty123!");
                manager.AddToRole(user.Id, "LabTec");
            }

            //Role para o Patient
            if(!context.Roles.Any(r => r.Name == "Patient")) {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Patient" };

                manager.Create(role);
            }

            //User para o Patient
            if(!context.Users.Any(u => u.UserName == "Patient")) {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "Patient", Email = "patient@hotmail.com" };

                manager.Create(user, "Qwerty123!");
                manager.AddToRole(user.Id, "Patient");
            }

            //Role para o Nurse
            if(!context.Roles.Any(r => r.Name == "Nurse")) {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Nurse" };

                manager.Create(role);
            }

            //User para o Nurse
            if(!context.Users.Any(u => u.UserName == "Nurse")) {
                var store = new UserStore<ApplicationUser>(context);
                var manager = new UserManager<ApplicationUser>(store);
                var user = new ApplicationUser { UserName = "Nurse", Email = "nurse@hotmail.com"};

                manager.Create(user, "Qwerty123!");
                manager.AddToRole(user.Id, "Nurse");
            }
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
