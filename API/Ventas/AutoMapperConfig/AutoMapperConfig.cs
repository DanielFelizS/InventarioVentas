using AutoMapper;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Abstractions;

namespace Ventas.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {

        public AutoMapperConfigProfile()
        {

            // Empleados
            CreateMap<EmpleadosDTO, Empleados>()
            .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Empleado.Nombre))
           .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Empleado.Apellido))
           .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Empleado.Telefono))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Empleado.Email))
           .ForMember(dest => dest.DNI, opt => opt.MapFrom(src => src.Empleado.DNI));

            CreateMap<Empleados, PersonaRecord>()
                .ConstructUsing(src => new PersonaRecord(src.Id, src.Nombre, src.Apellido, src.Telefono, src.Email, src.DNI));

            CreateMap<Empleados, EmpleadosDTO>()
                .ForMember(dest => dest.Empleado, opt => opt.MapFrom(src => src));
            // Clientes
            //CreateMap<ClientesDTO, Clientes>();

            CreateMap<ClientesDTO, Clientes>()
           .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Cliente.Nombre))
           .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Cliente.Apellido))
           .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Cliente.Telefono))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Cliente.Email))
           .ForMember(dest => dest.DNI, opt => opt.MapFrom(src => src.Cliente.DNI));

        CreateMap<Clientes, PersonaRecord>()
                .ConstructUsing(src => new PersonaRecord(src.Id, src.Nombre, src.Apellido, src.Telefono, src.Email, src.DNI));

            CreateMap<Clientes, ClientesDTO>()
                .ForMember(dest => dest.Cliente, opt => opt.MapFrom(src => src));


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
