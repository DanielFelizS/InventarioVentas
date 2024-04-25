using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Data;
using AutoMapper;
using QuestPDF.Fluent;
using OfficeOpenXml;
using ClosedXML.Excel;

namespace Ventas.Controllers
{
    [Route("ventas")]
    public class VentasController : Controller
    {
        private readonly ILogger<VentasController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VentasController(ILogger<VentasController> logger, DataContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }
        [HttpGet(Name = "ConsultarVentas")]
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

            // Agrega el encabezado 'X-Total-Count' a la respuesta
            Response.Headers["X-Total-Count"] = totalCount.ToString();
            // Exponer el encabezado 'X-Total-Count'
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return paginatedList;
        }
        [HttpGet("{id}", Name = "VentaPorId")]
        public async Task<ActionResult<VentaDTO>> VentaPorId(int id)
        {
            var venta = await _context.ventas
                .Include(d => d.productos)
                .Include(d => d.empleados)
                .Include(d => d.clientes)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (venta == null)
            {
                return NotFound();
            }

            // Mapear el cliente a un DTO que incluya el nombre del departamento
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
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<VentaDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
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

            // Agrega el encabezado 'X-Total-Count' a la respuesta
            Response.Headers["X-Total-Count"] = totalCount.ToString();
            // Exponer el encabezado 'X-Total-Count'
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return paginatedList;
        }
        [HttpPost]
        public async Task<IActionResult> saveInformation([FromBody] VentaCreateDTO venta)
        {
            if (ModelState.IsValid)
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

                // Devolver una respuesta con el DTO VentaDTO
                return Ok(ventaDTO);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] VentaDTO venta)
        {
            if (id != venta?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                Venta newVenta = _mapper.Map<Venta>(venta);
                _context.Update(newVenta);
                await _context.SaveChangesAsync();
                return Ok("Se actualizó correctamente");
        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Venta>> Delete(int id)
        {
            try{
                var venta = await _context.ventas.FindAsync(id);
                if (venta == null)
                {
                    return NotFound();
                }

                _context.ventas.Remove(venta);
                await _context.SaveChangesAsync();

                return venta;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}