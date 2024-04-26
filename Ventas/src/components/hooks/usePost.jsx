import { api } from "../templates/Dependencies";
import { useState } from "react";
import { useNavigate } from "../templates/Dependencies";

export default function usePost({ url, urlRuta }) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${urlRuta}`);
  };

    const AgregarDatos = async (datos)=> {
    try{
        const response = await api.post(`/${url}`, datos);
        setData([...data, response.data]);
        alert("Los datos han sido agregados correctamente");
        handleNavigate();
      }
      catch(error){
        console.error(`Ha ocurrido un error: ${error}`);
      }
    }
  return {
    AgregarDatos,
    handleNavigate
    }
}
