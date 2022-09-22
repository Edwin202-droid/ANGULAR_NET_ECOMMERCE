using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CarritoController : BaseApiController
    {
        private readonly ICarritoRepository carritoRepository;
        private readonly IMapper mapper;

        public CarritoController(ICarritoRepository carritoRepository, IMapper mapper)
        {
            this.carritoRepository = carritoRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerCarrito>> GetCarritoById(string id)
        {
            var carrito = await carritoRepository.GetCarritoAsync(id);
            return Ok(carrito ?? new CustomerCarrito(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerCarrito>> UpdateCarrito(CarritoDTO carrito)
        {
            var carritoUpdate = mapper.Map<CarritoDTO, CustomerCarrito>(carrito);
            var updateCarrito = await carritoRepository.UpdateCarritoAsync(carritoUpdate);
            return Ok(updateCarrito);
        }

        [HttpDelete]
        public async Task DeleteCarritoAsync(string id)
        {
            await carritoRepository.DeleteCarritoAsync(id);
        }
    }
}