using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ventas.Models
{
    public class Ventas
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID {get; set;}
        public int ProductoId {get; set;}
        public int EmpleadoId {get; set;}
        public int ClienteId {get; set;}
        public int Cantidad {get; set;}
        public DateTime Fecha_venta {get; set;}
        public int Total {get; set;}
        public int ITBIS {get; set;}
    }
}