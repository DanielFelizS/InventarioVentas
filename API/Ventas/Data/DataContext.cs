using Microsoft.EntityFrameworkCore;
using Ventas.DTOs;
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
// foreign key
            modelBuilder.Entity<Venta>()
                .HasOne(d => d.empleados)
                .WithMany(dpto => dpto.Ventas)
                .HasForeignKey(d => d.EmpleadoId)
                .HasConstraintName("FK_Empleados");

            modelBuilder.Entity<Venta>()
                .HasOne(d => d.clientes)
                .WithMany(dpto => dpto.Ventas)
                .HasForeignKey(d => d.ClienteId)
                .HasConstraintName("FK_Clientes");

            modelBuilder.Entity<Venta>()
                .HasOne(d => d.productos)
                .WithMany(dpto => dpto.Ventas)
                .HasForeignKey(d => d.ProductoId)
                .HasConstraintName("FK_Productos");
// empleados
            modelBuilder.Entity<Empleados>()
                .Property(d => d.Nombre)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.Apellido)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.Sexo)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.Sueldo)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.Cargo)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.FechaContratacion)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .HasIndex(d => d.Telefono)
                .IsUnique();

            modelBuilder.Entity<Empleados>()
                .Property(d => d.Telefono)
                .IsRequired();

            modelBuilder.Entity<Empleados>()
                .HasIndex(d => d.DNI)
                .IsUnique();

            modelBuilder.Entity<Empleados>()
                .HasIndex(d => d.Email)
                .IsUnique();

// clientes
            modelBuilder.Entity<Clientes>()
                .Property(d => d.Nombre)
                .IsRequired();

            modelBuilder.Entity<Clientes>()
                .Property(d => d.Apellido)
                .IsRequired();

            modelBuilder.Entity<Clientes>()
                .HasIndex(d => d.Telefono)
                .IsUnique();

            modelBuilder.Entity<Clientes>()
                .HasIndex(d => d.DNI)
                .IsUnique();

            modelBuilder.Entity<Clientes>()
                .HasIndex(d => d.Email)
                .IsUnique();

// productos
            modelBuilder.Entity<Productos>()
                .Property(d => d.Producto)
                .IsRequired();

            modelBuilder.Entity<Productos>()
                .Property(d => d.Descripcion)
                .IsRequired();

            modelBuilder.Entity<Productos>()
                .Property(d => d.Precio)
                .IsRequired();

            modelBuilder.Entity<Productos>()
                .Property(d => d.Disponible)
                .IsRequired();
// ventas
            modelBuilder.Entity<Venta>()
                .Property(d => d.Cantidad)
                .IsRequired();

            modelBuilder.Entity<Venta>()
                .Property(d => d.Fecha_venta)
                .IsRequired();
        }
}
}