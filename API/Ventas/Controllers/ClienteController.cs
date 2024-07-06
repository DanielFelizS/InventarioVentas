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
    [Route("cliente")]
    public class ClienteController : Controller
    {
        public readonly IClienteRepository _clienteRepository;

        public ClienteController(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }
        [HttpGet(Name = "VerClientes")]
        public async Task<ActionResult<PaginatedList<ClientesDTO>>> VerClientes(int id, int pageNumber = 1, int pageSize = 6)
        {
            var cliente = await _clienteRepository.VerClientes(id, pageNumber, pageSize);

            // Verifica que cliente tenga datos y establece el encabezado X-Total-Count
            if (cliente != null && cliente.Value != null)
            {
                var totalCount = cliente.Value.TotalCount;

                // Agregamos el encabezado 'X-Total-Count' a la respuesta
                Response.Headers["X-Total-Count"] = totalCount.ToString();
                // Exponer el encabezado 'X-Total-Count'
                Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

                return Ok(cliente.Value.Items);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("{id}", Name = "ClientePorId")]
        public async Task<ActionResult<ClientesDTO>> ClientePorId(int id)
        {
            var cliente = await _clienteRepository.ClientePorId(id);

            if (cliente == null)
            {
                return NotFound();
            }
            return cliente;
        }
        [HttpGet("all", Name = "Clientes")]
        public async Task<ActionResult<IEnumerable<ClientesDTO>>> Clientes()
        {
            var clientes = await _clienteRepository.Clientes();
            if (clientes.Value == null || !clientes.Value.Any())
            {
                return NotFound();
            }
            var totalCount = clientes.Value.Count();
            Response.Headers["X-Total-Count"] = totalCount.ToString();
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return clientes;
        }
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<ClientesDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = await _clienteRepository.Buscar(id, pageNumber, pageSize, buscar);

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
        //     IQueryable<Clientes> consulta = _context.clientes;

        //     if (!string.IsNullOrEmpty(filtro))
        //     {
        //         consulta = consulta.Where(d => d.Nombre != null && d.Nombre.Contains(filtro) ||
        //         d.Apellido != null && d.Apellido.Contains(filtro) ||
        //         d.Telefono != null && d.Telefono.Contains(filtro) ||
        //         d.Email != null && d.Email.Contains(filtro) ||
        //         d.DNI != null && d.DNI.Contains(filtro)
        //         );
        //     }
        //     var clientes = 
        //     await consulta
        //         .Select(cliente => new
        //         {
        //             cliente.Id,
        //             cliente.Nombre,
        //             cliente.Apellido,
        //             cliente.Telefono,
        //             cliente.Email,
        //             cliente.DNI
        //         })
        //         .ToListAsync();

        //     // Crear un archivo de Excel
        //     using (var excel = new ExcelPackage())
        //     {
        //         var workSheet = excel.Workbook.Worksheets.Add("Clientes");
                
        //         // Cargar los datos en la hoja de Excel
        //         workSheet.Cells.LoadFromCollection(clientes, true);

        //         // Convertir el archivo de Excel en bytes
        //         var excelBytes = excel.GetAsByteArray();

        //         // Devolver el archivo de Excel como un FileContentResult
        //         return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Clientes.xlsx");
        //     }
        // }
        [HttpPost]
        public async Task<IActionResult> AgregarCliente([FromBody] ClientesDTO cliente)
        {
            if (ModelState.IsValid)
            {
                await _clienteRepository.AgregarCliente(cliente);

                return CreatedAtRoute("VerClientes", new { id = cliente.Id }, cliente);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditarCliente(int id, [FromBody] ClientesDTO cliente)
        {
            _clienteRepository.EditarCliente(id, cliente);

            if (id != cliente?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            else if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok("Se actualizó correctamente");

        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Clientes>> BorrarCliente(int id)
        {
            try{
                var cliente = await _clienteRepository.BorrarCliente(id);
                if (cliente == null)
                {
                    return NotFound();
                }

                return cliente;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}