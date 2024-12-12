import {
  useNavigate, useParams, api,
  crudReducer, CrudTypes, useReducer,
  INITIAL_STATE,
} from "@hooks/dependencies";

export default function useDelete({ url, urlRuta }) {
  const [state, dispatch] = useReducer(crudReducer, INITIAL_STATE);
  const { dataDelete } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const NavigateHome = () => {
    navigate(`/${urlRuta}`);
  };

  const eliminarDatos = async () => {
    await api.delete(`/${url}/${id}`, dataDelete);
    try {
      dispatch({ type: CrudTypes.ELIMINAR_DATO, payload: "" });
      alert("Se ha eliminado el dato correctamente");
      NavigateHome();
    } catch (error) {
      console.error(`Error al eliminar los datos: ${error}`);
    }
  };

  return {
    eliminarDatos,
    NavigateHome,
  };
}
