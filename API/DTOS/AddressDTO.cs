using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class AddressDTO
    {
        [Required]
        public string Nombres { get; set; }
        [Required]
        public string Apellidos { get; set; }
        [Required]
        public string Direccion { get; set; }
        [Required]
        public string Ciudad { get; set; }
        [Required]
        public string Estado { get; set; }
        [Required]
        public string CodigoPostal { get; set; }
    }
}