using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ventas.Models
{
    public class Productos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        public string Producto {get; set;}
        public string Descripcion {get; set;}
        public double Precio {get; set;}
        // public int Cantidad_disponible {get; set;}
        public bool Disponible {get; set;}
        public virtual ICollection<Venta> Ventas {get; set;}

    }
}