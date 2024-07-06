using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Controllers;
using AutoMapper;

namespace Ventas.Interfaces
{
    public interface IVentasRepository
    {
        Task<ActionResult<PaginatedList<VentaDTO>>> ConsultarVentas(int id, int pageNumber = 1, int pageSize = 6);
        Task<ActionResult<VentaDTO>> VentaPorId(int id);
        Task<ActionResult<PaginatedList<VentaDTO>>> BuscarVenta(int id, int pageNumber = 1, int pageSize = 6, string buscar = null);
        Task<IActionResult> AgregarVenta([FromBody] VentaCreateDTO venta);
        Task<IActionResult> EditarVenta(int id, [FromBody] VentaDTO venta);
        Task<ActionResult<Venta>> EliminarVenta(int id);
    }
}