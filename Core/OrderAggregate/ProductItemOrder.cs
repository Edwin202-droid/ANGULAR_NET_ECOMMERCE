using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.OrderAggregate
{
    public class ProductItemOrder
    {
        public ProductItemOrder()
        {
            
        }
        public ProductItemOrder(int productoItemId, string productName, string pictureUrl)
        {
            ProductoItemId = productoItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductoItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}