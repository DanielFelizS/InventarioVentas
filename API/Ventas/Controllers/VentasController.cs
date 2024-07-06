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
// using Ventas.Repositories;
using AutoMapper;
using QuestPDF.Fluent;
using OfficeOpenXml;
using ClosedXML.Excel;

namespace Ventas.Controllers
{
    [Route("ventas")]
    public class VentasController : Controller
    {
        public readonly IVentasRepository _ventasRepository;

        public VentasController(IVentasRepository ventasRepository)
        {
            _ventasRepository = ventasRepository;
        }
        [HttpGet(Name = "ConsultarVentas")]
        public async Task<ActionResult<PaginatedList<VentaDTO>>> ConsultarVentas(int id, int pageNumber = 1, int pageSize = 6)
        {
            var result = await _ventasRepository.ConsultarVentas(id, pageNumber, pageSize);

            if (result != null && result.Value != null)
            {
                var totalCount = result.Value.TotalCount;

                // Agregamos el encabezado 'X-Total-Count' a la respuesta
                Response.Headers["X-Total-Count"] = totalCount.ToString();
                // Exponer el encabezado 'X-Total-Count'
                Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

                return Ok(result.Value.Items);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{id}", Name = "VentaPorId")]
        public async Task<ActionResult<VentaDTO>> VentaPorId(int id)
        {
            var venta = await _ventasRepository.VentaPorId(id);

            if (venta == null)
            {
                return NotFound();
            }

            return venta;
        }
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<VentaDTO>>> BuscarVenta(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = await _ventasRepository.BuscarVenta(id, pageNumber, pageSize, buscar);              

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
        //     IQueryable<Venta> consulta = _context.ventas
        //     .Include(d => d.empleados)
        //     .Include(d => d.clientes)
        //     .Include(d => d.productos);

        //     if (!string.IsNullOrEmpty(filtro))
        //     {
        //         consulta = consulta.Where(d => d.productos.Producto != null && d.productos.Producto.Contains(filtro) ||
        //         d.productos.Precio.ToString() != null && d.productos.Precio.ToString().Contains(filtro) ||
        //         d.empleados.Nombre != null && d.empleados.Nombre.Contains(filtro) ||
        //         d.clientes.Nombre != null && d.clientes.Nombre.Contains(filtro) ||
        //         d.Fecha_venta.ToString() != null && d.Fecha_venta.ToString().Contains(filtro));
        //     }
        //     var ventas = 
        //     await consulta
        //         .Select(venta => new
        //         {
        //             venta.Id,
        //             Nombre_producto = venta.productos.Producto,
        //             Precio_producto = venta.productos.Precio,
        //             Nombre_empleado = venta.empleados.Nombre,
        //             Nombre_cliente = venta.clientes.Nombre,
        //             venta.Cantidad,
        //             venta.Fecha_venta,
        //             venta.Total,
        //             venta.ITBIS
        //         })
        //         .ToListAsync();

        //     // Crear un archivo de Excel
        //     using (var excel = new ExcelPackage())
        //     {
        //         var workSheet = excel.Workbook.Worksheets.Add("Ventas");
                
        //         // Cargar los datos en la hoja de Excel
        //         workSheet.Cells.LoadFromCollection(ventas, true);

        //         // Convertir el archivo de Excel en bytes
        //         var excelBytes = excel.GetAsByteArray();

        //         // Devolver el archivo de Excel como un FileContentResult
        //         return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Ventas.xlsx");
        //     }
        // }
        [HttpPost]
        public async Task<IActionResult> AgregarVenta([FromBody] VentaCreateDTO venta)
        {
            if (ModelState.IsValid)
            {
                var result = await _ventasRepository.AgregarVenta(venta);
                // return CreatedAtRoute("ConsultarVentas", new { id = venta.Id }, venta);
                return result;
                
            }
            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarVenta(int id, [FromBody] VentaDTO venta)
        {
            await _ventasRepository.EditarVenta(id, venta);

            if (id != venta?.Id)
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
        public async Task<ActionResult<Venta>> EliminarVenta(int id)
        {
            try{
                var venta = await _ventasRepository.EliminarVenta(id);
                if (venta == null)
                {
                    return NotFound();
                }

                return venta;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}