using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CarritoController : BaseApiController
    {
        private readonly ICarritoRepository carritoRepository;

        public CarritoController(ICarritoRepository carritoRepository)
        {
            this.carritoRepository = carritoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCarrito>> GetCarritoById(string id)
        {
            var carrito = await carritoRepository.GetCarritoAsync(id);
            return Ok(carrito ?? new CustomerCarrito(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCarrito>> UpdateCarrito(CustomerCarrito carrito)
        {
            var updateCarrito = await carritoRepository.UpdateCarritoAsync(carrito);
            return Ok(updateCarrito);
        }

        [HttpDelete]
        public async Task DeleteCarritoAsync(string id)
        {
            await carritoRepository.DeleteCarritoAsync(id);
        }
    }
}