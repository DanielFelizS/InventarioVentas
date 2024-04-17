using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ventas.DTOs
{
    public class VentaDTO
    {
        public int Id {get; set;}
        [JsonIgnore]
        public int ProductoId {get; set;}
        [NotMapped]
        public string nombre_producto {get; set;}
        [NotMapped]
        public double precio_producto {get; set;}
        [JsonIgnore]
        public int EmpleadoId {get; set;}
        [NotMapped]
        public string nombre_empleado {get; set;}
        [JsonIgnore]
        public int ClienteId {get; set;}
        [NotMapped]
        public string nombre_cliente {get; set;}
        public int Cantidad {get; set;}
        public DateTime Fecha_venta {get; set;} = DateTime.Now;
        public double Total {get; set;}
        public double ITBIS {get; set;}
    }
}