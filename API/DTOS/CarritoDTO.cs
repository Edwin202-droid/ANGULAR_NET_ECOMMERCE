using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOS
{
    public class CarritoDTO
    {
        [Required]
        public string Id { get; set; }
        public List<CarritoItemDTO> Items { get; set; }
    }
}