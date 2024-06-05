import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  usePost,
  useGet,
  useReducer,
  VentasTypes, ventasReducer, VentasDatos
} from "../Dependencies";

export default function FormAgregar() {

  const [state, dispatch] = useReducer(ventasReducer, VentasDatos)
  const { AgregarVenta, handleNavigate } = usePost({urlRuta: "ventas"});
  const { empleado } = useGet({ url: `/empleado/all`});
  const { cliente } = useGet({ url: `/cliente/all`});
  const { productos } = useGet({ url: `/producto/all`});

  const AgregarVentas = async () => {
    const ventaDatos = {
      productoId: state.productoId,
      empleadoId: state.empleadoId,
      clienteId: state.clienteId,
      cantidad: state.cantidad,
    };
    AgregarVenta(ventaDatos)
  };

  // const handleChange = (e)=>{
  //   dispatch({ type:VentasTypes.CHANGE_INPUT, payload:{name:e.target.name, value:e.target.value} })
  // }

  const handleChange = (e, selectName) => {
    dispatch({ type: VentasTypes.CHANGE_INPUT, payload: { name: selectName, value: e.target.value } });
  };

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Producto: </Form.Label>
          <Select
            OptionLabel="Producto"
            SelectValue={state.productoId}
            SelectChange={(e) => handleChange(e, 'productoId')}
            Options={
              <>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.producto}
                  </option>
                ))}
              </>
            }
          />

          <Form.Label>Empleado y cliente: </Form.Label>
          <InputGroup>
            <Select
              OptionLabel="Nombre y apellido del empleado"
              SelectValue={state.empleadoId}
              SelectChange={(e) => handleChange(e, 'empleadoId')}
              Options={
                <>
                  {empleado.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombre} {empleado.apellido}
                    </option>
                  ))}
                </>
              }
            />
            <Select
              OptionLabel="Nombre y apellido del cliente"
              SelectValue={state.clienteId}
              SelectChange={(e) => handleChange(e, 'clienteId')}
              Options={
                <>
                  {cliente.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nombre} {client.apellido}
                    </option>
                  ))}
                </>
              }
            />
          </InputGroup>

          <FormInput
            InputTitle="Cantidad: "
            InputType="number"
            InputPlaceholder="1"
            InputName="cantidad"
            Inputvalue={state.cantidad}
            InputChange={(e) => handleChange(e, 'cantidad')}
          />
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarVentas} btnContent="Agregar"/>
        <BtnAction btnColor="danger" btnClick={handleNavigate} btnContent="Cancelar" />
      </Form>
    </>
  );
}
