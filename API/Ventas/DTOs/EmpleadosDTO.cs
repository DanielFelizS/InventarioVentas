using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ventas.Abstractions;

namespace Ventas.DTOs
{
    public class EmpleadosDTO
    {
        public PersonaRecord Empleado { get; set; }
        public string Sexo { get; set; }
        public int Edad { get; set; }
        public int Sueldo { get; set; }
        public string Cargo { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public DateTime FechaContratacion { get; set; }
    }
}