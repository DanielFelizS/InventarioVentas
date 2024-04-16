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
                    Total = ventas.Total,
                    ITBIS = ventas.ITBIS,
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
    }
}