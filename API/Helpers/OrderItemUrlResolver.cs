using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using AutoMapper;
using Core.OrderAggregate;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDTO, string>
    {
        private readonly IConfiguration configuration;

        public OrderItemUrlResolver(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
        {
            //Imagen con url completa de la orden item
            if(!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return configuration["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }
            return null;
        }
    }
}