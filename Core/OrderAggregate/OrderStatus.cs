using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Core.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value ="Pendiente")]
        Pendiente,
        [EnumMember(Value ="Pago recibido")]
        PagoRecibido,
        [EnumMember(Value ="Pago Fallo")]
        PagoFallo,
    }
}