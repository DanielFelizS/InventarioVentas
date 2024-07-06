using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ventas.Interfaces;
using Ventas.Models;
using Ventas.DTOs;
using Ventas.Controllers;
using AutoMapper;

namespace Ventas.Interfaces
{
    public interface IEmpleadoRepository
    {
        Task<IActionResult> saveInformation([FromBody] EmpleadosDTO empleado);

        Task<ActionResult<PaginatedList<EmpleadosDTO>>> ObtenerEmpleados(int id, int pageNumber = 1, int pageSize = 6); 

        Task<ActionResult<EmpleadosDTO>> GetEmpleado(int id);

        Task<ActionResult<IEnumerable<EmpleadosDTO>>> Empleados();

        Task<ActionResult<PaginatedList<EmpleadosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null);

        Task<IActionResult> Put(int id, [FromBody] EmpleadosDTO empleado);

        Task<ActionResult<Empleados>> Delete(int id);
    }
}