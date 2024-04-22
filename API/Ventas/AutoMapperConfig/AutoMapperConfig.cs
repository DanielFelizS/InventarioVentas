using AutoMapper;
using Ventas.Models;
using Ventas.DTOs;

namespace Ventas.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            // Empleados
            CreateMap<EmpleadosDTO, Empleados>();
            CreateMap<Empleados, EmpleadosDTO>();
            // Clientes
            CreateMap<ClientesDTO, Clientes>();
            CreateMap<Clientes, ClientesDTO>();
            // Productos
            CreateMap<ProductosDTO, Productos>();
            CreateMap<Productos, ProductosDTO>();
            // Ventas
            CreateMap<Venta, VentaDTO>();
            CreateMap<VentaDTO, Venta>();
            CreateMap<VentaCreateDTO, Venta>();
            CreateMap<VentaCreateDTO, VentaDTO>();
        }
    }
}
