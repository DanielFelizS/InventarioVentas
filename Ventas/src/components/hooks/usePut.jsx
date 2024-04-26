import { useState } from "react";
import { api } from "../templates/Dependencies";
import { useNavigate } from "react-router-dom";

export default function usePut({ PropEdit, url, urlRuta }) {
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(`/${urlRuta}`);
    };

    const editarDatos = async () => {
        try {
          if (!PropEdit.id) {
            setMsg(`El ID de ${url} es requerido`);
          }
    
          const response = await api.put(`/${url}/${PropEdit.id}`, PropEdit);
          alert(response.data);
          handleNavigate();
        } catch (error) {
            setMsg(`Ocurrió un error al editar ${url}`);
            console.error(error);
        }
      };

  return {
    msg,
    editarDatos,
    handleNavigate
  }
}
