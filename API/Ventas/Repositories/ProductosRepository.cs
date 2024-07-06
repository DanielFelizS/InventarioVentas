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
    public class ProductosRepository : IProductosRepository
    {
        private readonly ILogger<ProductosRepository> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _host;

        public ProductosRepository(ILogger<ProductosRepository> logger, DataContext context, IMapper mapper,  IWebHostEnvironment host)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _host = host;
        }
        //  Ver productos paginados
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> VerProductos(int id, int pageNumber = 1, int pageSize = 6)
        {
            var datos = await _context.productos.FindAsync(id);
            var Productos = await _context.productos.ToListAsync();
            var totalCount = Productos.Count;
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            // var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var PaginacionProductos = Productos.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var DepartamentosDTO = _mapper.Map<List<ProductosDTO>>(PaginacionProductos);

            var paginatedList = new PaginatedList<ProductosDTO>
            {
                Items = DepartamentosDTO,
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages
            };
            
            return paginatedList;
        }
        // Obtener el producto por el id
        public async Task<ActionResult<ProductosDTO>> GetProducto(int id)
        {
            var producto = await _context.productos
                .FirstOrDefaultAsync(d => d.Id == id);

            // Mapear el producto a un DTO que incluya el nombre del producto
            var productosDTO = new ProductosDTO
            {
                Id = producto.Id,
                Producto = producto.Producto,
                Precio = producto.Precio,
                Descripcion = producto.Descripcion,
                Disponible = producto.Disponible,
            };

            return productosDTO;
        }
        // Obtener todos los productos
        public async Task<ActionResult<IEnumerable<ProductosDTO>>> Productos()
        {
            IQueryable<ProductosDTO> consulta = _context.productos
                .Select(producto => new ProductosDTO
                {
                    Id = producto.Id,
                    Producto = producto.Producto,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    Disponible = producto.Disponible,
                });

            var productos = await consulta.ToListAsync();

            var totalCount = await _context.productos.CountAsync();

            return productos;
        }
        // Buscar producto
        public async Task<ActionResult<PaginatedList<ProductosDTO>>> Buscar(int id, int pageNumber = 1, int pageSize = 6, string buscar = null)
        {
            var consulta = _context.productos.AsQueryable();

            if (!string.IsNullOrEmpty(buscar))
            {
                consulta = consulta.Where(d => d.Producto != null && d.Producto.Contains(buscar) ||
                d.Descripcion != null && d.Descripcion.Contains(buscar) ||
                d.Precio.ToString() != null && d.Precio.ToString().Contains(buscar) ||
                d.Disponible.ToString() != null && d.Disponible.ToString().Contains(buscar));
            }

            var totalCount = await consulta.CountAsync();

            // Obtener los productos paginados
            var paginacionProductos = await consulta
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var productosDto = _mapper.Map<List<ProductosDTO>>(paginacionProductos);

            var paginatedList = new PaginatedList<ProductosDTO>
            {
                Items = productosDto,
                TotalCount = totalCount,
                PageIndex = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };

            return paginatedList;
        }
        // Agregar producto
        public async Task<IActionResult> AgregarProducto([FromBody] ProductosDTO productos)
        {
            Productos AddProductos = _mapper.Map<Productos>(productos);
            _context.productos.AddAsync(AddProductos);
            await _context.SaveChangesAsync();

            return new OkResult();
        }
        // Editar producto
        public async Task<IActionResult> EditarProducto(int id, [FromBody] ProductosDTO productos)
        {
            Productos newProduct = _mapper.Map<Productos>(productos);
            _context.Update(newProduct);
            await _context.SaveChangesAsync();

            return new OkResult();
        }
        // Eliminar producto
        public async Task<ActionResult<Productos>> EliminarProducto(int id)
        {
            var producto = await _context.productos.FindAsync(id);  

            _context.productos.Remove(producto);
            await _context.SaveChangesAsync();

            return producto;
        }
    }
}