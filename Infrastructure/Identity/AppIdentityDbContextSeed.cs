using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Edwin",
                    Email = "edwin@gmail.com",
                    UserName = "Admin",
                    Address = new Address
                    {
                        Nombres = "Edwin",
                        Apellidos = "Espinoza Loaiza",
                        Direccion = "Villa El salvador",
                        Ciudad = "Lima",
                        Estado = "Lima",
                        CodigoPostal = "Lima 42"
                    }
                };

                await userManager.CreateAsync(user, "Admin123@");
            }
        }
    }
}