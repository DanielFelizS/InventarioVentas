using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ventas.Interfaces;

namespace Ventas.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IProductosRepository ProductosRepository { get; }
        IEmpleadoRepository EmpleadoRepository { get; }
        IClienteRepository ClienteRepository { get; }
        IVentasRepository VentasRepository { get; }

        Task<IActionResult> Save();
        // Task<ActionResult> Get(int id);
        // Task<ActionResult<IEnumerable>> GetAll();
        // Task<ActionResult<PaginatedList>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null);
        // Task<IActionResult> ExportarExcel(string filtro = null);
        Task<IActionResult> Edit(int id);
        Task<ActionResult> Delete(int id);
    }
}