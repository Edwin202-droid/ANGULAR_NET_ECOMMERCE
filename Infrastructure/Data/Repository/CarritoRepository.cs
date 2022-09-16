using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data.Repository
{
    public class CarritoRepository : ICarritoRepository
    {
        private readonly IDatabaseAsync database;

        public CarritoRepository(IConnectionMultiplexer redis)
        {
            database = redis.GetDatabase();
        }

        public async Task<bool> DeleteCarritoAsync(string carritoId)
        {
            return await database.KeyDeleteAsync(carritoId);
        }

        public async Task<CustomerCarrito> GetCarritoAsync(string carritoId)
        {
            var data = await database.StringGetAsync(carritoId);

            return data.IsNullOrEmpty ?  null : JsonSerializer.Deserialize<CustomerCarrito>(data);
        }

        public async Task<CustomerCarrito> UpdateCarritoAsync(CustomerCarrito carrito)
        {
            var created = await database.StringSetAsync(carrito.Id, 
            JsonSerializer.Serialize(carrito), TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetCarritoAsync(carrito.Id);
        }
    }
}