using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.OrderAggregate;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly ICarritoRepository carritoRepository;
        private readonly IUnitOfWork unitOfWork;

        public OrderService(ICarritoRepository carritoRepository, IUnitOfWork unitOfWork)
        {
            this.carritoRepository = carritoRepository;
            this.unitOfWork = unitOfWork;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string carritoId, Address shippingAddress)
        {
            //Obtener el carrito
            var carrito = await carritoRepository.GetCarritoAsync(carritoId);
            //obtener el precio real del producto: base de datos
            var items = new List<OrderItem>();
            foreach (var item in carrito.Items)
            {
                var productItem = await unitOfWork.Repository<Product>().GetByAsync(item.Id);
                var itemOrdered = new ProductItemOrder(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Cantidad);
                items.Add(orderItem);
            }
            //obtener el metodo de delivery
            var deliveryMethod = await unitOfWork.Repository<DeliveryMethod>().GetByAsync(deliveryMethodId);
            //calcular subtotal
            var subtotal = items.Sum(item => item.Price * item.Cantidad);
            //crear orden
            var order = new Order(buyerEmail, shippingAddress, deliveryMethod, items, subtotal);
            unitOfWork.Repository<Order>().Add(order);
            //guardar end db
            var result = await unitOfWork.Complete();

            if(result <=0) return null;
            //eliminar carrito
            await carritoRepository.DeleteCarritoAsync(carritoId);
            //retornar orden
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(id, buyerEmail);
            return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);
            return await unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}