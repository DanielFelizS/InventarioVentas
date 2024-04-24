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
    [Route("empleado")]
    public class EmpleadoController : Controller
    {
        private readonly ILogger<EmpleadoController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public EmpleadoController(ILogger<EmpleadoController> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        [HttpGet(Name = "ObtenerEmpleados")]
        public async Task<ActionResult<PaginatedList<EmpleadosDTO>>> ObtenerEmpleados(int id, int pageNumber = 1, int pageSize = 6)
        {
            var datos = await _context.empleados.FindAsync(id);
            var Empleados = await _context.empleados.ToListAsync();
            var totalCount = Empleados.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            // var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var PaginacionEmpleados = Empleados.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var DepartamentosDTO = _mapper.Map<List<EmpleadosDTO>>(PaginacionEmpleados);

            var paginatedList = new PaginatedList<EmpleadosDTO>
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
        [HttpGet("all", Name = "Empleados")]
        public async Task<ActionResult<IEnumerable<EmpleadosDTO>>> Empleados()
        {
            IQueryable<EmpleadosDTO> consulta = _context.empleados
                .Select(empleado => new EmpleadosDTO
                {
                    Id = empleado.Id,
                    Nombre = empleado.Nombre,
                    Apellido = empleado.Apellido,
                    Sexo = empleado.Sexo,
                    Edad = empleado.Edad,
                    Telefono = empleado.Telefono,
                    Email = empleado.Email,
                    DNI = empleado.DNI,
                    Sueldo = empleado.Sueldo,
                    Cargo = empleado.Cargo,
                    FechaNacimiento = empleado.FechaNacimiento,
                    FechaContratacion = empleado.FechaContratacion
                });

            var empleados = await consulta.ToListAsync();

            if (empleados == null || empleados.Count == 0)
            {
                return NotFound();
            }

            var totalCount = await _context.empleados.CountAsync();
            
            Response.Headers["X-Total-Count"] = totalCount.ToString();
            Response.Headers.Append("Access-Control-Expose-Headers", "X-Total-Count");

            return empleados;
        }
        [HttpGet("buscar")]
        public async Task<ActionResult<PaginatedList<EmpleadosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = _context.empleados.AsQueryable();

            if (!string.IsNullOrEmpty(buscar))
            {
                consulta = consulta.Where(d => d.Nombre != null && d.Nombre.Contains(buscar) ||
                d.Apellido != null && d.Apellido.Contains(buscar) ||
                d.Telefono != null && d.Telefono.Contains(buscar) ||
                d.Email != null && d.Email.Contains(buscar) ||
                d.Cargo != null && d.Cargo.Contains(buscar) ||
                d.Sueldo.ToString() != null && d.Sueldo.ToString().Contains(buscar) ||
                d.FechaContratacion.ToString() != null && d.FechaContratacion.ToString().Contains(buscar) ||
                d.DNI != null && d.DNI.Contains(buscar)
                );
            }

            var totalCount = await consulta.CountAsync();

            // Obtener los dispositivos paginados
            var paginacionEmpleados = await consulta
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var EmpleadosDTO = _mapper.Map<List<EmpleadosDTO>>(paginacionEmpleados);

            var paginatedList = new PaginatedList<EmpleadosDTO>
            {
                Items = EmpleadosDTO,
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
        public async Task<IActionResult> saveInformation([FromBody] EmpleadosDTO empleado)
        {
            if (ModelState.IsValid)
            {
                Empleados AddEmpleado = _mapper.Map<Empleados>(empleado);
                _context.empleados.AddAsync(AddEmpleado);
                await _context.SaveChangesAsync();

                // Devolver una respuesta CreatedAtRoute con el dispositivo creado
                return CreatedAtRoute("ObtenerEmpleados", new { id = AddEmpleado.Id }, AddEmpleado);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] EmpleadosDTO empleado)
        {
            if (id != empleado?.Id)
            {
                return BadRequest("No se encontró el ID");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

                Empleados newEmpleado = _mapper.Map<Empleados>(empleado);
                _context.Update(newEmpleado);
                await _context.SaveChangesAsync();
                return Ok("Se actualizó correctamente");
        }
        [HttpDelete("{id}")] 
        public async Task<ActionResult<Empleados>> Delete(int id)
        {
            try{
                var empleado = await _context.empleados.FindAsync(id);
                if (empleado == null)
                {
                    return NotFound();
                }

                _context.empleados.Remove(empleado);
                await _context.SaveChangesAsync();

                return empleado;
            } catch (Exception ex) {
                return StatusCode(500, $"Ocurrió un error mientras se actualizaban los datos: {ex.Message}");
            }
        }
    }
}