using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ventas.DTOs
{
    public class ClientesDTO
    {
        public int Id {get; set;}
        public string Nombre {get; set;}
        public string Apellido {get; set;}
        public string Telefono {get; set;} = "No tiene";
        public string Email {get; set;} = "No tiene";
        public string DNI {get; set;} = "Es menor de edad o no tiene identificación";
    }
}