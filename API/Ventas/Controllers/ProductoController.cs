using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Data;
using Ventas.Interfaces;
using AutoMapper;
using QuestPDF.Fluent;
using OfficeOpenXml;
using ClosedXML.Excel;

namespace Ventas.Controllers
{
    [Route("producto")]
    public class ProductoController : Controller
    {
        public readonly IProductosRepository _productosRepository;

        public ProductoController(IProductosRepository productosRepository)
        {
            _productosRepository = productosRepository;
        }
        [HttpGet(Name = "VerProductos")]
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> VerProductos(int id, int pageNumber = 1, int pageSize = 6)
        {
            var producto = await _productosRepository.VerProductos(id, pageNumber, pageSize);

            // Verifica que cliente tenga datos y establece el encabezado X-Total-Count
            if (producto != null && producto.Value != null)
            {
                var totalCount = producto.Value.TotalCount;

                // Agregamos el encabezado 'X-Total-Count' a la respuesta
                Response.Headers["X-Total-Count"] = totalCount.ToString();
                // Exponer el encabezado 'X-Total-Count'
                Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

                return Ok(producto.Value.Items);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{id}", Name = "GetProducto")]
        public async Task<ActionResult<ProductosDTO>> GetProducto(int id)
        {
            var producto = await _productosRepository.GetProducto(id);

            if (producto == null)
            {
                return NotFound();
            }
            return producto;

        }
        [HttpGet("all", Name = "Productos")]
        public async Task<ActionResult<IEnumerable<ProductosDTO>>> Productos()
        {
            var productos = await _productosRepository.Productos();
            
            if (productos.Value == null || !productos.Value.Any())
            {
                return NotFound();
            }
            var totalCount = productos.Value.Count();
            
            Response.Headers["X-Total-Count"] = totalCount.ToString();
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return productos;
        }
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = await _productosRepository.Buscar(id, pageNumber, pageSize, buscar);

            if (consulta != null && consulta.Value != null) {
                var totalCount = consulta.Value.TotalCount;
                // Agregamos el encabezado 'X-Total-Count' a la respuesta
                Response.Headers["X-Total-Count"] = totalCount.ToString();
                // Exponer el encabezado 'X-Total-Count'
                Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");
                return Ok(consulta.Value.Items);
            }
            else{
                return NotFound();
            }
        }
        // [HttpGet("exportar-excel")]
        // public async Task<IActionResult> ExportarExcel(string filtro = null)
        // {
        //     // Obtener los datos
        //     IQueryable<Productos> consulta = _context.productos;

        //     if (!string.IsNullOrEmpty(filtro))
        //     {
        //         consulta = consulta.Where(d => d.Producto != null && d.Producto.Contains(filtro) ||
        //         d.Precio.ToString() != null && d.Precio.ToString().Contains(filtro) ||
        //         d.Descripcion != null && d.Descripcion.Contains(filtro) ||
        //         d.Disponible.ToString() != null && d.Disponible.ToString().Contains(filtro));
        //     }
        //     var productos = 
        //     await consulta
        //         .Select(producto => new
        //         {
        //             producto.Id,
        //             producto.Producto,
        //             producto.Precio,
        //             producto.Descripcion,
        //             producto.Disponible
        //         })
        //         .ToListAsync();

        //     // Crear un archivo de Excel
        //     using (var excel = new ExcelPackage())
        //     {
        //         var workSheet = excel.Workbook.Worksheets.Add("Productos");
                
        //         // Cargar los datos en la hoja de Excel
        //         workSheet.Cells.LoadFromCollection(productos, true);

        //         // Convertir el archivo de Excel en bytes
        //         var excelBytes = excel.GetAsByteArray();

        //         // Devolver el archivo de Excel como un FileContentResult
        //         return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Productos.xlsx");
        //     }
        // }
        [HttpPost]
        public async Task<IActionResult> AgregarProducto([FromBody] ProductosDTO productos)
        {
            if (ModelState.IsValid)
            {
                await _productosRepository.AgregarProducto(productos);
                // Devolver una respuesta CreatedAtRoute con el producto creado
                return CreatedAtRoute("ObtenerEmpleados", new { id = productos.Id }, productos);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarProducto(int id, [FromBody] ProductosDTO productos)
        {
            _productosRepository.EditarProducto(id, productos);

            if (id != productos?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok("Se actualizó correctamente");
        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Productos>> EliminarProducto(int id)
        {
            try{
                var producto = await _productosRepository.EliminarProducto(id);
                if (producto == null)
                {
                    return NotFound();
                }

                return producto;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}