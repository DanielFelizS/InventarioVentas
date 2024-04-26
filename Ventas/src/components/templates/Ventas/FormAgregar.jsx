import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  useState,
  usePost,
  useGet
} from "../Dependencies";

export default function FormAgregar() {
  const [productoId, setProductoId] = useState();
  const [empleadoId, setEmpleadoId] = useState();
  const [clienteId, setClienteId] = useState();
  const [cantidad, setCantidad] = useState(1);
  const { AgregarDatos, handleNavigate } = usePost({url: "venta", urlRuta: "ventas"});
  const { empleado } = useGet({ url: `/empleado/all`});
  const { cliente } = useGet({ url: `/cliente/all`});
  const { productos } = useGet({ url: `/producto/all`});

  const AgregarVenta = async () => {
    const datos = {
      productoId: productoId,
      empleadoId: empleadoId,
      clienteId: clienteId,
      cantidad: cantidad,
    };
    AgregarDatos(datos)
  };

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Producto: </Form.Label>
          <Select
            OptionLabel="Producto"
            SelectValue={productoId}
            SelectChange={(e) => setProductoId(e.target.value)}
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
              SelectValue={empleadoId}
              SelectChange={(e) => setEmpleadoId(e.target.value)}
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
              SelectValue={clienteId}
              SelectChange={(e) => setClienteId(e.target.value)}
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
            Inputvalue={cantidad}
            InputChange={(e) => setCantidad(e.target.value)}
          />
        </Form.Group>

        <BtnAction
          btnColor="primary"
          btnClick={AgregarVenta}
          btnContent="Agregar"
        />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
