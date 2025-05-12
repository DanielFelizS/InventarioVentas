/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useReducer,
  empleadosReducer,
  clientesReducer,
  productosReducer,
  INITIAL_STATE,
  EmpleadosTypes,
  ClientesTypes,
  ProductosTypes,
  api
} from "@hooks/dependencies";

export default function useGet({ url }) {
  const [stateEmpleado, dispatchEmpleado] = useReducer(empleadosReducer, INITIAL_STATE);
  const [stateCliente, dispatchCliente] = useReducer(clientesReducer, INITIAL_STATE);
  const [stateProducto, dispatchProducto] = useReducer(productosReducer, INITIAL_STATE);
  const { empleado } = stateEmpleado;
  const { cliente } = stateCliente;
  const { productos } = stateProducto;

  useEffect(() => {
    ObtenerDatos();
  }, [url]);

  const ObtenerDatos = async () => {
    try {
      const response = await api.get(url);
      dispatchProducto({
        type: ProductosTypes.OBTENER_DATOS_PRODUCTO,
        payload: response.data,
      });
      dispatchEmpleado({
        type: EmpleadosTypes.OBTENER_DATOS_EMPLEADO,
        payload: response.data,
      });
      dispatchCliente({
        type: ClientesTypes.OBTENER_DATOS_CLIENTE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    empleado,
    cliente,
    productos,
  };
}
