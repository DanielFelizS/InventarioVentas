using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ventas.Models
{
    public class Empleados
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {get; set;}
        public string Nombre {get; set;}
        public string Apellido {get; set;}
        public string Sexo {get; set;}
        public int Edad {get; set;}
        public string Telefono {get; set;}
        public string Email {get; set;}
        public string DNI {get; set;}
        public int Sueldo {get; set;}
        public string Cargo {get; set;}
        public DateTime FechaNacimiento {get; set;}
        public DateTime FechaContratacion {get; set;}

        public virtual ICollection<Venta> Ventas {get; set;}
    }
}