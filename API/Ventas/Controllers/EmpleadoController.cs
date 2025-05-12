using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Ventas.Models;
using Ventas.Data;
using Ventas.DTOs;
using Ventas.Interfaces;
using Ventas.Repositories;
using AutoMapper;
using QuestPDF.Fluent;
using OfficeOpenXml;
using ClosedXML.Excel;

namespace Ventas.Controllers
{
    [Route("empleado")]
    public class EmpleadoController : Controller
    {
        public readonly IEmpleadoRepository _empleadoRepository;

        public EmpleadoController(IEmpleadoRepository empleadoRepository)
        {
            _empleadoRepository = empleadoRepository;
        }
        [HttpGet(Name = "ObtenerEmpleados")]
        public async Task<ActionResult<PaginatedList<EmpleadosDTO>>> ObtenerEmpleados(int id, int pageNumber = 1, int pageSize = 6)
        {
            var result = await _empleadoRepository.ObtenerEmpleados(id, pageNumber, pageSize);

            // Verifica que result tenga datos y establece el encabezado X-Total-Count
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
        [HttpGet("{id}", Name = "GetEmpleado")]
        public async Task<ActionResult<EmpleadosDTO>> GetEmpleado(int id)
        {
            var empleado = await _empleadoRepository.GetEmpleado(id);

            if (empleado == null)
            {
                return NotFound();
            }
            return empleado;
        }
        [HttpGet("all", Name = "Empleados")]
        public async Task<ActionResult<IEnumerable<EmpleadosDTO>>> Empleados()
        {
            var empleados = await _empleadoRepository.Empleados();

            if (empleados.Value == null || !empleados.Value.Any())
            {
                return NotFound();
            }

            var totalCount = empleados.Value.Count();

            Response.Headers["X-Total-Count"] = totalCount.ToString();
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return empleados;
        }
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<EmpleadosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = await _empleadoRepository.Buscar(id, pageNumber, pageSize, buscar);

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
        //     IQueryable<Empleados> consulta = _context.empleados;
        //     if (!string.IsNullOrEmpty(filtro))
        //     {
        //         consulta = consulta.Where(d => d.Nombre != null && d.Nombre.Contains(filtro) ||
        //         d.Apellido != null && d.Apellido.Contains(filtro) ||
        //         d.Telefono != null && d.Telefono.Contains(filtro) ||
        //         d.Email != null && d.Email.Contains(filtro) ||
        //         d.Cargo != null && d.Cargo.Contains(filtro) ||
        //         d.Sueldo.ToString() != null && d.Sueldo.ToString().Contains(filtro) ||
        //         d.FechaContratacion.ToString() != null && d.FechaContratacion.ToString().Contains(filtro) ||
        //         d.DNI != null && d.DNI.Contains(filtro)
        //         );
        //     }
        //     var empleados = 
        //     await consulta
        //         .Select(empleado => new
        //         {
        //             empleado.Id,
        //             empleado.Nombre,
        //             empleado.Apellido,
        //             empleado.Sexo,
        //             empleado.Edad,
        //             empleado.Telefono,
        //             empleado.Email,
        //             empleado.DNI,
        //             empleado.Sueldo,
        //             empleado.Cargo,
        //             empleado.FechaNacimiento,
        //             empleado.FechaContratacion
        //         })
        //         .ToListAsync();
                
        //     // Crear un archivo de Excel
        //     using (var excel = new ExcelPackage())
        //     {
        //         var workSheet = excel.Workbook.Worksheets.Add("Empleados");
                
        //         // Cargar los datos en la hoja de Excel
        //         workSheet.Cells.LoadFromCollection(empleados, true);

        //         // Convertir el archivo de Excel en bytes
        //         var excelBytes = excel.GetAsByteArray();

        //         // Devolver el archivo de Excel como un FileContentResult
        //         return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Empleados.xlsx");
        //     }
        // }
        [HttpPost]
        public async Task<IActionResult> saveInformation([FromBody] EmpleadosDTO empleado)
        {
            if (ModelState.IsValid)
            {
                await _empleadoRepository.saveInformation(empleado);

                // Devolver una respuesta CreatedAtRoute con el empleado creado
                return CreatedAtRoute("ObtenerEmpleados", new { id = empleado.Empleado.Id }, empleado);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarEmpleado(int id, [FromBody] EmpleadosDTO empleado)
        {
            _empleadoRepository.Put(id, empleado);

            if (id != empleado.Empleado.Id)
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
        public async Task<ActionResult<Empleados>> Delete(int id)
        {
            try{
                var empleado = await _empleadoRepository.Delete(id);

                if (empleado == null)
                {
                    return NotFound();
                }
                return empleado;

            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}