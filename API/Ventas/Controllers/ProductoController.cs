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
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = _context.productos.AsQueryable();

            if (!string.IsNullOrEmpty(buscar))
            {
                consulta = consulta.Where(d => d.Producto != null && d.Producto.Contains(buscar) ||
                d.Descripcion != null && d.Descripcion.Contains(buscar) ||
                d.Precio.ToString() != null && d.Precio.ToString().Contains(buscar) ||
                d.Disponible.ToString() != null && d.Disponible.ToString().Contains(buscar));
            }

            var totalCount = await consulta.CountAsync();

            // Obtener los dispositivos paginados
            var paginacionProductos = await consulta
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var productosDto = _mapper.Map<List<ProductosDTO>>(paginacionProductos);

            var paginatedList = new PaginatedList<ProductosDTO>
            {
                Items = productosDto,
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };

            // Agregar el encabezado 'X-Total-Count' a la respuesta
            Response.Headers["X-Total-Count"] = paginatedList.TotalCount.ToString();
            // Exponer el encabezado 'X-Total-Count'
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            // Devolver la lista paginada de dispositivos
            return paginatedList;
        }
        [HttpPost]
        public async Task<IActionResult> saveInformation([FromBody] ProductosDTO productos)
        {
            if (ModelState.IsValid)
            {
                Productos AddProductos = _mapper.Map<Productos>(productos);
                _context.productos.AddAsync(AddProductos);
                await _context.SaveChangesAsync();

                // Devolver una respuesta CreatedAtRoute con el dispositivo creado
                return CreatedAtRoute("ObtenerEmpleados", new { id = AddProductos.Id }, AddProductos);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProductosDTO productos)
        {
            if (id != productos?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                Productos newProduct = _mapper.Map<Productos>(productos);
                _context.Update(newProduct);
                await _context.SaveChangesAsync();
                return Ok("Se actualizó correctamente");
        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Productos>> Delete(int id)
        {
            try{
                var producto = await _context.productos.FindAsync(id);
                if (producto == null)
                {
                    return NotFound();
                }

                _context.productos.Remove(producto);
                await _context.SaveChangesAsync();

                return producto;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}