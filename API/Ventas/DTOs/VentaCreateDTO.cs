using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ventas.DTOs
{
    public class VentaCreateDTO
    {
        public int ProductoId {get; set;}
        public int EmpleadoId {get; set;}
        public int ClienteId {get; set;}
        public int Cantidad {get; set;}
    }
}