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

namespace Ventas.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly DataContext _context;
        private readonly ILogger<IClienteRepository> _logger;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public ClienteRepository(ILogger<IClienteRepository> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host) {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        // Ver clientes paginados
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


            
            return paginatedList;
        }
        // Cliente por Id
        public async Task<ActionResult<ClientesDTO>> ClientePorId(int id)
        {
            var cliente = await _context.clientes
                .FirstOrDefaultAsync(d => d.Id == id);

            // Mapear el cliente a un DTO que incluya el nombre del departamento
            var clientesDTO = new ClientesDTO
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Telefono = cliente.Telefono,
                Email = cliente.Email,
                DNI = cliente.DNI
            };

            return clientesDTO;
        }
        // Ver todos los clientes
        public async Task<ActionResult<IEnumerable<ClientesDTO>>> Clientes()
        {
            IQueryable<ClientesDTO> consulta = _context.clientes
                .Select(cliente => new ClientesDTO
                {
                    Id = cliente.Id,
                    Nombre = cliente.Nombre,
                    Apellido = cliente.Apellido,
                    Telefono = cliente.Telefono,
                    Email = cliente.Email,
                    DNI = cliente.DNI
                });

            var clientes = await consulta.ToListAsync();
            var totalCount = await _context.clientes.CountAsync();

            return new ActionResult<IEnumerable<ClientesDTO>>(clientes);
        }
        // Buscar cliente
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

            return paginatedList;
        }
        // Agregar cliente
        public async Task<IActionResult> AgregarCliente([FromBody] ClientesDTO cliente)
        {
            Clientes AddCliente = _mapper.Map<Clientes>(cliente);
            _context.clientes.AddAsync(AddCliente);
            await _context.SaveChangesAsync();
            return new OkResult();
        }
        // Editar cliente
        public async Task<IActionResult> EditarCliente(int id, [FromBody] ClientesDTO cliente)
        {
            Clientes newCliente = _mapper.Map<Clientes>(cliente);
            _context.Update(newCliente);
            await _context.SaveChangesAsync();
            return new OkResult();
        }
        // Eliminar cliente
        public async Task<ActionResult<Clientes>> BorrarCliente(int id)
        {
                var cliente = await _context.clientes.FindAsync(id);

                _context.clientes.Remove(cliente);
                await _context.SaveChangesAsync();

                return cliente;
            
        }
    }
}