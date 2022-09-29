using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Core.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

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

                    //Solo para sqlLite 
                    var dateTimeProperties = item.ClrType.GetProperties()
                        .Where(p => p.PropertyType == typeof(DateTimeOffset));
                    foreach (var property in properties)
                    {
                        modelBuilder.Entity(item.Name).Property(property.Name).HasConversion<double>();
                    }

                    foreach (var property in dateTimeProperties)
                    {
                        modelBuilder.Entity(item.Name).Property(property.Name)
                            .HasConversion(new DateTimeOffsetToBinaryConverter());
                    }
                }
            }
        }

    }
}