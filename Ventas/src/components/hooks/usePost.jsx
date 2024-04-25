import { api } from "../templates/Dependencies";
import { useState } from "react";

export default function usePost({ url }) {
  const [data, setData] = useState([]);

//   const navigate = useNavigate();
//   const handleNavigate = () => {
//     navigate(`/${url}`);
//   };

    const AgregarDatos = async (datos)=> {
    try{
        const response = await api.post(`/${url}`, datos);
        setData([...data, response.data]);
        alert("Los datos han sido agregados correctamente");
      }
      catch(error){
        console.error(`Ha ocurrido un error: ${error}`);
      }
    }
  return {
    AgregarDatos
    }
}
