import { api, useNavigate, empleadosReducer, ventasReducer, useReducer, INITIAL_STATE, EmpleadosTypes, clientesReducer, ClientesTypes, productosReducer, ProductosTypes, VentasTypes} from "./dependencies"

export default function usePost({ urlRuta }) {
  // const [data, setData] = useState([]);
  const [stateEmpleado, dispatchEmpleado] = useReducer(empleadosReducer, INITIAL_STATE);
  const [stateCliente, dispatchCliente] = useReducer(clientesReducer, INITIAL_STATE);
  const [stateProducto, dispatchProducto] = useReducer(productosReducer, INITIAL_STATE);
  const [stateVenta, dispatchVenta] = useReducer(ventasReducer, INITIAL_STATE);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${urlRuta}`);
  };

    const AgregarEmpleado = async (empleadoDatos)=> {
      try{
          const responseEmpleado = await api.post(`/empleado`, empleadoDatos);
          dispatchEmpleado({type: EmpleadosTypes.CREAR_EMPLEADO, payload: responseEmpleado.data});
          alert("Los datos han sido agregados correctamente");
          handleNavigate();
        }
        catch(error){
          console.error(`Ha ocurrido un error: ${error}`);
        }
      }

      const AgregarClientes = async (clienteDatos)=> {
        try{
            const responseCliente = await api.post(`/cliente`, clienteDatos);
            dispatchCliente({type: ClientesTypes.CREAR_CLIENTE, payload: responseCliente.data});
    
            // const responseProducto = await api.post(`/${url}`, datos);
            alert("Los datos han sido agregados correctamente");
            handleNavigate();
          }
          catch(error){
            console.error(`Ha ocurrido un error: ${error}`);
          }
        }

    const AgregarProducto = async (productosDatos) => {
      try{
        const responseProducto = await api.post(`/producto`, productosDatos);
        dispatchProducto({type: ProductosTypes.CREAR_PRODUCTO, payload: responseProducto.data});
        alert("Los datos han sido agregados correctamente");
        handleNavigate();
      }
      catch(error){
        console.error(`Ha ocurrido un error: ${error}`);
      }
    }

    const AgregarVenta = async (ventaDatos) => {
      try{
        const responseVenta = await api.post(`/ventas`, ventaDatos);
        dispatchVenta({type: VentasTypes.CREAR_VENTAS, payload: responseVenta.data});
        alert("Los datos han sido agregados correctamente");
        handleNavigate();
      }
      catch(error){
        console.error(`Ha ocurrido un error: ${error}`);
      }
    }

  return {
    empleado: stateEmpleado.empleado,
    cliente: stateCliente.cliente,
    productos: stateProducto.productos,
    venta: stateVenta.venta,
    AgregarClientes,
    AgregarEmpleado,
    AgregarProducto,
    AgregarVenta,
    handleNavigate
    }
}
