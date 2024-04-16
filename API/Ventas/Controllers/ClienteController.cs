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
            var DepartamentosDTO = _mapper.Map<List<ClientesDTO>>(PaginacionCliente);

            var paginatedList = new PaginatedList<ClientesDTO>
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