using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class OrderDTO
    {
        public string carritoId { get; set; }
        public int deliveryMethodId { get; set; }
        public AddressDTO shipToAddress { get; set; }
    }
}