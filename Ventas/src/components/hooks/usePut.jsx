import {
  useNavigate,
  api,
  crudReducer,
  CrudTypes,
  useReducer,
  INITIAL_STATE,
} from "@hooks/dependencies";

export default function usePut({ PropEdit, url, urlRuta }) {
  const [state, dispatch] = useReducer(crudReducer, INITIAL_STATE);
  const { msg } = state;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${urlRuta}`);
  };

  const editarDatos = async () => {
    try {
      if (!PropEdit.id) {
        dispatch({
          type: CrudTypes.ERROR,
          payload: `El ID de ${url} es requerido`,
        });
      }
      const response = await api.put(`/${url}/${PropEdit.id}`, PropEdit);
      dispatch({ type: CrudTypes.EDITAR_DATO, payload: response.data });
      alert("Se editaron los datos correctamente");
      handleNavigate();
    } catch (error) {
      dispatch({
        type: CrudTypes.ERROR,
        payload: `Ocurrió un error al editar ${url}`,
      });
      console.error(error);
    }
  };

  return {
    msg,
    editarDatos,
    handleNavigate,
  };
}
