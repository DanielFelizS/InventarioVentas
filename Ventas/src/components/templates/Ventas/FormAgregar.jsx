import FormInput from "../../atoms/Input";
import Select from "../../atoms/Select";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from '../../../../config'

export default function FormAgregar() {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState();
  const [empleadoId, setEmpleadoId] = useState();
  const [clienteId, setClienteId] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [empleado, setEmpleado] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [data, setData] = useState([]);
  const [ventas, setVentas] = useState([]);

  const AgregarVenta = async () => {
    const datos = {
      productoId: productoId,
      empleadoId: empleadoId,
      clienteId: clienteId,
      cantidad: cantidad
    };
    try {
      const response = await api.post("/ventas", datos);
      setData([...data, response.data]);
      alert("los datos se agregaron correctamente");
    } catch (error) {
      console.error(`Ha aparecido un error: ${error}`);
    }
  };

  useEffect(()=> {
    ObtenerProductos()
  }, [])
  useEffect(()=> {
    ObtenerEmpleados()
  }, [])
  useEffect(()=> {
    ObtenerClientes()
  }, [])

  const ObtenerProductos = async () => {
    try{
      const response = await api.get('/producto/all');
      setProductos(response.data);
    } 
    catch(error) {
      console.error(error);
    }
  }

  const ObtenerEmpleados = async () => {
    try {
      const response = await api.get('/empleado/all');
      setEmpleado(response.data);
    }
    catch(error){
      console.error(error)
    }
  }

  const ObtenerClientes = async () => {
    try {
      const response = await api.get('/cliente/all');
      setCliente(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Producto: </Form.Label>
            <Select
              OptionLabel="Producto"
              SelectValue={productoId}
              SelectChange={(e)=> setProductoId(e.target.value)}
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
              SelectChange={(e)=> setEmpleadoId(e.target.value)}
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
              SelectChange={(e)=> setClienteId(e.target.value)}
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
            InputChange={(e)=> setCantidad(e.target.value)}
          />

        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarVenta} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
