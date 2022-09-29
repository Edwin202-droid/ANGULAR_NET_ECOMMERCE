using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOS;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDTO>().ReverseMap();
            CreateMap<CarritoDTO, CustomerCarrito>().ReverseMap();
            CreateMap<CarritoItemDTO, CarritoItem>().ReverseMap();
            CreateMap<AddressDTO, Core.OrderAggregate.Address>();

            CreateMap<Order, OrderToReturnDTO>()
                    .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                    .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDTO>()
                    .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductoItemId))
                    .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                    .ForMember(d => d.PictureUrl , o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                    .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
        }
    }
}