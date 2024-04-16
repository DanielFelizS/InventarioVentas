using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ventas.Models;

namespace Ventas.Models
{
    public class Venta
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        public int ProductoId {get; set;}
        public Productos productos {get; set;}
        public int EmpleadoId {get; set;}
        public Empleados empleados {get; set;}
        public int ClienteId {get; set;}
        public Clientes clientes {get; set;}
        public int Cantidad {get; set;}
        public DateTime Fecha_venta {get; set;} = DateTime.Now;
        public double Total {
            get{return Cantidad * productos.Precio;}
        }
        public double ITBIS {
            get {return Total * 0.18;}
        }
    }
}