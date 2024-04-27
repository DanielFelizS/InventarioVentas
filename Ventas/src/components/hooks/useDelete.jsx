import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config";

export default function useDelete({url, urlRuta}) {

  const [data, setData] = useState("");
  const { id } = useParams();
  
  const navigate = useNavigate();
  const NavigateHome = () => {
    navigate(`/${urlRuta}`);
  };

  const eliminarDatos = async () => {
    const response = await api.delete(`/${url}/${id}`, data);
    try {
      setData("");
      alert("Se ha eliminado el dispositivo correctamente");
      NavigateHome();
    } 
    catch(error){
      console.error(`Error al eliminar los datos: ${error}`);
    }
  };

  return {
    eliminarDatos,
    NavigateHome
  }
}
