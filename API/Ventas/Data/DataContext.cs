using Microsoft.EntityFrameworkCore;
using Ventas.Models;

namespace Ventas.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        public DbSet<Clientes> clientes { get; set; }
        public DbSet<Empleados> empleados { get; set; }
        public DbSet<Productos> productos {get; set;}
        public DbSet<Venta> ventas { get; set; }
        // public DbSet<Auditoria> historial { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
}
}