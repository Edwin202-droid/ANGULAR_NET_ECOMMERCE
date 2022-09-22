using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class CarritoItemDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage ="El Precio es 0")]
        public decimal Price { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage ="La cantidad debe ser mayor o igual a 1")]
        public int Cantidad { get; set; }
        [Required]

        public string PictureUrl { get; set; }
        [Required]

        public string Marca { get; set; }
        [Required]

        public string Tipo { get; set; }
    }
}