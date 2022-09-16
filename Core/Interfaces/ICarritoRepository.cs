using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ICarritoRepository
    {
        Task<CustomerCarrito> GetCarritoAsync(string carritoId);
        Task<CustomerCarrito> UpdateCarritoAsync(CustomerCarrito carrito);
        Task<bool> DeleteCarritoAsync(string carritoId);
    }
}