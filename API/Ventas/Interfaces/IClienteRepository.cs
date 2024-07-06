using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Controllers;
using AutoMapper;

namespace Ventas.Interfaces
{
    public interface IClienteRepository
    {
        Task<ActionResult<PaginatedList<ClientesDTO>>> VerClientes(int id, int pageNumber = 1, int pageSize = 6);
        
        Task<ActionResult<ClientesDTO>> ClientePorId(int id);

        Task<ActionResult<IEnumerable<ClientesDTO>>> Clientes();

        Task<ActionResult<PaginatedList<ClientesDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null);

        // Task<IActionResult> ExportarExcel(string filtro = null);

        Task<IActionResult> AgregarCliente([FromBody] ClientesDTO cliente);

        Task<IActionResult> EditarCliente(int id, [FromBody] ClientesDTO cliente);

        Task<ActionResult<Clientes>> BorrarCliente(int id);
    }
}