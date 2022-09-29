using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string nombres, string apellidos, string direccion, string ciudad, string estado, string codigoPostal)
        {
            Nombres = nombres;
            Apellidos = apellidos;
            Direccion = direccion;
            Ciudad = ciudad;
            Estado = estado;
            CodigoPostal = codigoPostal;
        }

        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Ciudad { get; set; }
        public string Estado { get; set; }
        public string CodigoPostal { get; set; }
    }
}