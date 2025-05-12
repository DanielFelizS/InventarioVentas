/* eslint-disable react-hooks/exhaustive-deps */
import {
    useEffect,
    useReducer,
    empleadosReducer,
    INITIAL_STATE,
    EmpleadosTypes, api,
    ProductosTypes,
    clientesReducer,
    ClientesTypes,
    productosReducer,
    ventasReducer,
    VentasTypes
  } from "@hooks/dependencies";
  
  export default function useGetById({ url, id }) {
    const [stateEmpleado, dispatchEmpleado] = useReducer(empleadosReducer, INITIAL_STATE);
    const [stateCliente, dispatchCliente] = useReducer(clientesReducer, INITIAL_STATE);
    const [stateProducto, dispatchProducto] = useReducer(productosReducer, INITIAL_STATE);
    const [stateVenta, dispatchVenta] = useReducer(ventasReducer, INITIAL_STATE);
    const { empleado } = stateEmpleado;
    const { cliente } = stateCliente;
    const { productos } = stateProducto;
    const { ventas } = stateVenta;
  
    useEffect(() => {
      ObtenerDatos();
    }, [url]);
  
    const ObtenerDatos = async () => {
      try {
        const response = await api.get(`/${url}/${id}`);
        dispatchEmpleado({
          type: EmpleadosTypes.OBTENER_ID_EMPLEADO,
          payload: response.data,
        });
        dispatchCliente({
          type: ClientesTypes.OBTENER_ID_CLIENTE,
          payload: response.data,
        });
        dispatchProducto({
            type: ProductosTypes.OBTENER_ID_PRODUCTO,
            payload: response.data,
          });
        dispatchVenta({
          type: VentasTypes.OBTENER_ID_VENTAS,
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
      ventas
    };
  }
  