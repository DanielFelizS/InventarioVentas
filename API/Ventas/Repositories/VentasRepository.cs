using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Data;
using AutoMapper;
using OfficeOpenXml;
using ClosedXML.Excel;

namespace Ventas.Repositories
{
    public class VentasRepository : IVentasRepository
    {
        private readonly ILogger<IVentasRepository> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public VentasRepository(ILogger<IVentasRepository> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host) {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        // Ver las ventas paginadas
        public async Task<ActionResult<PaginatedList<VentaDTO>>> ConsultarVentas(int id, int pageNumber = 1, int pageSize = 6)
        {
            var paginatedVentas = await (from ventas in _context.ventas
                join productos in _context.productos on ventas.ProductoId equals productos.Id
                join empleados in _context.empleados on ventas.EmpleadoId equals empleados.Id
                join clientes in _context.clientes on ventas.ClienteId equals clientes.Id
                select new VentaDTO
                {
                    Id = ventas.Id,
                    nombre_producto = productos.Producto,
                    precio_producto = productos.Precio,
                    nombre_empleado = empleados.Nombre,
                    nombre_cliente = clientes.Nombre,
                    Cantidad = ventas.Cantidad,
                    Fecha_venta = ventas.Fecha_venta,
                    Total = ventas.Total,
                    ITBIS = ventas.ITBIS
                })
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.ventas.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var paginatedList = new PaginatedList<VentaDTO>
            {
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages,
                Items = paginatedVentas
            };

            return paginatedList;
        }
        // Obtener la venta segun su id
        public async Task<ActionResult<VentaDTO>> VentaPorId(int id)
        {
            var venta = await _context.ventas
                .Include(d => d.productos)
                .Include(d => d.empleados)
                .Include(d => d.clientes)
                .FirstOrDefaultAsync(d => d.Id == id);

            var ventaDTO = new VentaDTO
            {
                Id = venta.Id,
                nombre_producto = venta.productos.Producto,
                precio_producto = venta.productos.Precio,
                nombre_empleado = venta.empleados.Nombre,
                nombre_cliente = venta.clientes.Nombre,
                Cantidad = venta.Cantidad,
                Fecha_venta = venta.Fecha_venta,
                Total = venta.Total,
                ITBIS = venta.ITBIS
            };

            return ventaDTO;
        }
        //  Buscar venta
        public async Task<ActionResult<PaginatedList<VentaDTO>>> BuscarVenta(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = _context.ventas.AsQueryable();

            if (!string.IsNullOrEmpty(buscar))
            {
                consulta = consulta.Where(d => d.productos.Producto != null && d.productos.Producto.Contains(buscar) ||
                d.productos.Precio.ToString() != null && d.productos.Precio.ToString().Contains(buscar) ||
                d.empleados.Nombre != null && d.empleados.Nombre.Contains(buscar) ||
                d.clientes.Nombre != null && d.clientes.Nombre.Contains(buscar) ||
                d.Fecha_venta.ToString() != null && d.Fecha_venta.ToString().Contains(buscar));
            }

            // Obtener las ventas paginadas
            var paginacionVentas = await consulta
                .Select(ventas => new VentaDTO
                {
                    Id = ventas.Id,
                    nombre_producto = ventas.productos.Producto,
                    precio_producto = ventas.productos.Precio,
                    nombre_empleado = ventas.empleados.Nombre,
                    nombre_cliente = ventas.clientes.Nombre,
                    Cantidad = ventas.Cantidad,
                    Fecha_venta = ventas.Fecha_venta,
                    Total = ventas.Total,
                    ITBIS = ventas.ITBIS
                })
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await consulta.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var ventasDto = paginacionVentas.Select(d =>
            {
                var ventaDto = _mapper.Map<VentaDTO>(d);
                ventaDto.nombre_empleado = d.nombre_empleado;
                ventaDto.nombre_cliente = d.nombre_cliente;
                ventaDto.nombre_producto = d.nombre_producto;
                ventaDto.precio_producto = d.precio_producto;

                return ventaDto;
            }).ToList();

            var paginatedList = new PaginatedList<VentaDTO>
            {
                Items = ventasDto,
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages
            };

            return paginatedList;
        }
        // Agregar venta
        public async Task<IActionResult> AgregarVenta([FromBody] VentaCreateDTO venta)
        {
            // Mapear el DTO a una entidad Venta
            Venta AddVenta = _mapper.Map<Venta>(venta);

            // Calcular el total y el ITBIS
            double Precio = await _context.productos
                .Where(p => p.Id == venta.ProductoId)
                .Select(p => p.Precio)
                .FirstOrDefaultAsync();

            double total = venta.Cantidad * Precio;
            double itbis = total * 0.18;

            // Asignar el total e ITBIS a la entidad Venta
            AddVenta.Total = total;
            AddVenta.ITBIS = itbis;

            // Agregar la venta a la base de datos
            _context.ventas.Add(AddVenta);
            await _context.SaveChangesAsync();

            // Crear un DTO VentaDTO para devolver como respuesta
            VentaDTO ventaDTO = new VentaDTO
            {
                Id = AddVenta.Id,
                ProductoId = AddVenta.ProductoId,
                EmpleadoId = AddVenta.EmpleadoId,
                ClienteId = AddVenta.ClienteId,
                Cantidad = AddVenta.Cantidad,
                Fecha_venta = AddVenta.Fecha_venta,
                Total = total,
                ITBIS = itbis
            };
            return new OkObjectResult(ventaDTO);
        }
        // Editar venta
        public async Task<IActionResult> EditarVenta(int id, [FromBody] VentaDTO venta)
        {
            Venta newVenta = _mapper.Map<Venta>(venta);
            _context.Update(newVenta);
            await _context.SaveChangesAsync();
            return new OkResult();
        }
        // Eliminar venta
        public async Task<ActionResult<Venta>> EliminarVenta(int id)
        {
            var venta = await _context.ventas.FindAsync(id);
            _context.ventas.Remove(venta);
            await _context.SaveChangesAsync();
            return venta;
        }
    }
}