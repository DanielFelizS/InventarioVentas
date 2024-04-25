import { useState, useEffect } from "react";
import { api } from "../templates/Dependencies";

export default function useGet({ url }) {
  const [empleado, setEmpleado] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [productos, setProductos] = useState([]);

    useEffect(()=> {
        ObtenerDatos()
    }, [url])

    const ObtenerDatos = async () => {
        try {
          const response = await api.get(url);
          setProductos(response.data);
          setEmpleado(response.data);
          setCliente(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
  return {
    empleado,
    cliente,
    productos
  }
}
