using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Data;
using AutoMapper;
using OfficeOpenXml;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using Ventas.Abstractions;

namespace Ventas.Repositories
{
    public class EmpleadoRepository : IEmpleadoRepository
    {
        private readonly DataContext _context;
        private readonly ILogger<IEmpleadoRepository> _logger;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public EmpleadoRepository(ILogger<IEmpleadoRepository> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host) {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
    // Agregar empleado
    public async Task<IActionResult> saveInformation([FromBody] EmpleadosDTO empleado)
    {
        try 
        {
            Empleados AddEmpleado = _mapper.Map<Empleados>(empleado);
            _context.empleados.AddAsync(AddEmpleado);
            await _context.SaveChangesAsync();
            return new OkResult();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al intentar guardar empleado");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError); // Devuelve un StatusCodeResult
        }
    }
    // Obtener empleado por página
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
        var EmpleadosDTO = _mapper.Map<List<EmpleadosDTO>>(PaginacionEmpleados);

        var paginatedList = new PaginatedList<EmpleadosDTO>
        {
            Items = EmpleadosDTO,
            TotalCount = totalCount,
            PageIndex = pageNumber,
            PageSize = pageSize,
            TotalPages = totalPages
        };

        return paginatedList;

    }
    // Obtener empleado por ID
    public async Task<ActionResult<EmpleadosDTO>> GetEmpleado(int id)
    {
        var empleado = await _context.empleados
            .FirstOrDefaultAsync(d => d.Id == id);

        // Mapear el empleado a un DTO que incluya el nombre del departamento
        var EmpleadosDTO = new EmpleadosDTO
        {
            Sexo = empleado.Sexo,
            Edad = empleado.Edad,
            Sueldo = empleado.Sueldo,
            Cargo = empleado.Cargo,
            FechaNacimiento = empleado.FechaNacimiento,
            FechaContratacion = empleado.FechaContratacion,

            Empleado = new PersonaRecord
            (
                empleado.Id,
                empleado.Nombre,
                empleado.Apellido,
                empleado.Telefono,
                empleado.Email,
                empleado.DNI
            )   
        };

        return EmpleadosDTO;
    }
    // Obtener todos los empleados
    public async Task<ActionResult<IEnumerable<EmpleadosDTO>>> Empleados()
    {
        IQueryable<EmpleadosDTO> consulta = _context.empleados
            .Select(empleado => new EmpleadosDTO
            {
                Sexo = empleado.Sexo,
                Edad = empleado.Edad,
                Sueldo = empleado.Sueldo,
                Cargo = empleado.Cargo,
                FechaNacimiento = empleado.FechaNacimiento,
                FechaContratacion = empleado.FechaContratacion,

                Empleado = new PersonaRecord
                (
                    empleado.Id,
                    empleado.Nombre,
                    empleado.Apellido,
                    empleado.Telefono,
                    empleado.Email,
                    empleado.DNI
                )
            });
        var empleados = await consulta.ToListAsync();
        var totalCount = await _context.empleados.CountAsync();

        return new ActionResult<IEnumerable<EmpleadosDTO>>(empleados);
    }
    // Buscar empleado
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

        // Obtener los empleados paginados
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

        return paginatedList;
    }
    // Editar empleado
    public async Task<IActionResult> Put(int id, [FromBody] EmpleadosDTO empleado)
    {
        Empleados newEmpleado = _mapper.Map<Empleados>(empleado);
        _context.Update(newEmpleado);
        await _context.SaveChangesAsync();

        return new OkResult();
    }
    // Eliminar empleado
    public async Task<ActionResult<Empleados>> Delete(int id)
    {
            var empleado = await _context.empleados.FindAsync(id);

            _context.empleados.Remove(empleado);
            await _context.SaveChangesAsync();

            return empleado;
        
    }
    }
}