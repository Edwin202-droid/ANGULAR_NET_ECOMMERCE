using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
            
        }
        public OrderItem(ProductItemOrder itemOrdered, decimal price, int cantidad)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Cantidad = cantidad;
        }

        public ProductItemOrder ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Cantidad { get; set; }
    }
}