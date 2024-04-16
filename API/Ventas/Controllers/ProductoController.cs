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
    [Route("producto")]
    public class ProductoController : Controller
    {
        private readonly ILogger<ProductoController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public ProductoController(ILogger<ProductoController> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        [HttpGet(Name = "VerProductos")]
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> VerProductos(int id, int pageNumber = 1, int pageSize = 6)
        {
            var datos = await _context.productos.FindAsync(id);
            var Productos = await _context.productos.ToListAsync();
            var totalCount = Productos.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            // var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var PaginacionProductos = Productos.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var DepartamentosDTO = _mapper.Map<List<ProductosDTO>>(PaginacionProductos);

            var paginatedList = new PaginatedList<ProductosDTO>
            {
                Items = DepartamentosDTO,
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
    }
}