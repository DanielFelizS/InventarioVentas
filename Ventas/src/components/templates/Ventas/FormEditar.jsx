import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  api,
  useState,
  useEffect,
  usePut,
  useGet,
  useParams,
} from "../Dependencies";

export default function FormEditar() {
  const [edit, setEdit] = useState({
    id: "",
    productoId: 0,
    empleadoId: 0,
    clienteId: 0,
    cantidad: 0,
  });

  const { editarDatos, handleNavigate } = usePut({
    url: "venta",
    PropEdit: edit,
    urlRuta: "ventas",
  });
  const { empleado } = useGet({ url: `/empleado/all` });
  const { cliente } = useGet({ url: `/cliente/all` });
  const { productos } = useGet({ url: `/producto/all` });
  const { id } = useParams();

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const response = await api.get(`/ventas/${id}`);
      setEdit({
        ...response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setEdit((prevState) => ({
      ...prevState,
      empleadoId: id,
      clienteId: id,
      productoId: id,
    }));
  };

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Producto: </Form.Label>
          <Select
            OptionLabel="Producto"
            SelectValue={edit.productoId}
            SelectChange={handleSelectChange}
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
              SelectValue={edit.empleadoId}
              SelectChange={handleSelectChange}
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
              SelectValue={edit.clienteId}
              SelectChange={handleSelectChange}
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
            Inputvalue={edit.cantidad}
            InputChange={handleInputChange}
          />
        </Form.Group>
        <BtnAction
          btnColor="warning"
          btnClick={editarDatos}
          btnContent="Editar"
        />
        <BtnAction
          btnColor="danger"
          btnClick={handleNavigate}
          btnContent="Cancelar"
        />
      </Form>
    </>
  );
}
