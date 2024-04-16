using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ventas.DTOs
{
    public class ProductosDTO
    {
        public int Id {get; set;}
        public string Producto {get; set;}
        public string Descripcion {get; set;}
        public int Precio {get; set;}
        // public int Cantidad_disponible {get; set;}
        public bool Disponible {get; set;}
    }
}