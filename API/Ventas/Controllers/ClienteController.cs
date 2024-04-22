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
    [Route("cliente")]
    public class ClienteController : Controller
    {
        private readonly ILogger<ClienteController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public ClienteController(ILogger<ClienteController> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        [HttpGet(Name = "VerClientes")]
        public async Task<ActionResult<PaginatedList<ClientesDTO>>> VerClientes(int id, int pageNumber = 1, int pageSize = 6)
        {
            var datos = await _context.clientes.FindAsync(id);
            var Clientes = await _context.clientes.ToListAsync();
            var totalCount = Clientes.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            // var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var PaginacionCliente = Clientes.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var ClientesDto = _mapper.Map<List<ClientesDTO>>(PaginacionCliente);

            var paginatedList = new PaginatedList<ClientesDTO>
            {
                Items = ClientesDto,
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
        public async Task<ActionResult<PaginatedList<ClientesDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = _context.clientes.AsQueryable();

            if (!string.IsNullOrEmpty(buscar))
            {
                consulta = consulta.Where(d => d.Nombre != null && d.Nombre.Contains(buscar) ||
                d.Apellido != null && d.Apellido.Contains(buscar) ||
                d.Telefono != null && d.Telefono.Contains(buscar) ||
                d.Email != null && d.Email.Contains(buscar) ||
                d.DNI != null && d.DNI.Contains(buscar)
                );
            }

            var totalCount = await consulta.CountAsync();

            // Obtener los dispositivos paginados
            var PaginacionCliente = await consulta
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var clientesDto = _mapper.Map<List<ClientesDTO>>(PaginacionCliente);

            var paginatedList = new PaginatedList<ClientesDTO>
            {
                Items = clientesDto,
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
        public async Task<IActionResult> saveInformation([FromBody] ClientesDTO cliente)
        {
            if (ModelState.IsValid)
            {
                Clientes AddCliente = _mapper.Map<Clientes>(cliente);
                _context.clientes.AddAsync(AddCliente);
                await _context.SaveChangesAsync();

                // Devolver una respuesta CreatedAtRoute con el dispositivo creado
                return CreatedAtRoute("VerClientes", new { id = AddCliente.Id }, AddCliente);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ClientesDTO cliente)
        {
            if (id != cliente?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                Clientes newCliente = _mapper.Map<Clientes>(cliente);
                _context.Update(newCliente);
                await _context.SaveChangesAsync();
                return Ok("Se actualizó correctamente");
        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Clientes>> Delete(int id)
        {
            try{
                var cliente = await _context.clientes.FindAsync(id);
                if (cliente == null)
                {
                    return NotFound();
                }

                _context.clientes.Remove(cliente);
                await _context.SaveChangesAsync();

                return cliente;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}