using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOS;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Interfaces;
using Core.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrderController : BaseApiController
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            this.mapper = mapper;
            this.orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            //Extensions para abreviar
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var address = mapper.Map<AddressDTO, Address>(orderDTO.shipToAddress);
            var order = await orderService.CreateOrderAsync(email, orderDTO.deliveryMethodId, orderDTO.carritoId, address);

            if(order == null) return BadRequest(new ApiResponse(400, "Problema para crear la orden"));
            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDTO>>> GetOrderForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var orders = await orderService.GetOrdersForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDTO>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDTO>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var order = await orderService.GetOrderByIdAsync(id, email);

            if(order == null) return NotFound(new ApiResponse(404));

            return mapper.Map<Order, OrderToReturnDTO>(order);
        }

        [HttpGet("deliveryMetodos")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryethods()
        {
            return Ok(await orderService.GetDeliveryMethodsAsync());
        }
    }
}