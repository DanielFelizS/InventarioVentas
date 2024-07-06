using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Controllers;
using AutoMapper;

namespace Ventas.Interfaces
{
    public interface IProductosRepository
    {
        Task<ActionResult<PaginatedList<ProductosDTO>>> VerProductos(int id, int pageNumber = 1, int pageSize = 6);
        Task<ActionResult<ProductosDTO>> GetProducto(int id);
        Task<ActionResult<IEnumerable<ProductosDTO>>> Productos();
        Task<ActionResult<PaginatedList<ProductosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null);
        // Task<IActionResult> ExportarExcel(string filtro = null);
        Task<IActionResult> AgregarProducto([FromBody] ProductosDTO productos);
        Task<IActionResult> EditarProducto(int id, [FromBody] ProductosDTO productos);
        Task<ActionResult<Productos>> EliminarProducto(int id);
        
    }
}