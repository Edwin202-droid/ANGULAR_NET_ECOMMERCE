using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void  OnModelCreating(ModelBuilder modelBuilder)
        {
            //Nuestras configuraciones para los modelos en las migraciones
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            //tratamiento especial a decimales para el orderby en Sqlite -> decimal => double
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var item in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = item.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(item.Name).Property(property.Name).HasConversion<double>();
                    }
                }
            }
        }

    }
}