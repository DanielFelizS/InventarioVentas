using AutoMapper;
using Ventas.Models;
using Ventas.DTOs;

namespace Ventas.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            CreateMap<Venta, VentaDTO>();
            CreateMap<VentaCreateDTO, Venta>();
        }
    }
}
