import FormInput from "../../atoms/Input";
import Select from "../../atoms/Select";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../../../../config";

export default function FormAgregar() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState();
  const [disponible, setDisponible] = useState();
  const [descripcion, setDescripcion] = useState("");
  const [data, setData] = useState([]);
  const [clientes, setClientes] = ([]);

  const AgregarProducto = async () => {
    const datos = {
      producto: producto,
      precio: precio,
      descripcion: descripcion,
      disponible: disponible,
    };
    try {
      const response = await api.post("/productos", datos);
      setData([...data, response.data]);
      alert("los datos se agregaron correctamente");
    } catch (error) {
      console.error(`Ha aparecido un error: ${error}`);
    }
  };

  useEffect(() => {
    ObtenerClientes();
  }, [])

  const ObtenerClientes = async () => {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nombre del producto y descripción: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Jamón"
              InputName="producto"
              Inputvalue={producto}
              InputChange={(e) => setProducto(e.target.value)}
            />
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Íberico Gr."
              InputName="descripicion"
              Inputvalue={descripcion}
              InputChange={(e) => setDescripcion(e.target.value)}
            />
          </InputGroup>

          <FormInput
            InputTitle="Precio"
            InputType="number"
            InputPlaceholder="10,000"
            InputName="precio"
            Inputvalue={precio}
            InputChange={(e) => setPrecio(e.target.value)}
          />
          <Select
            SelectLabel="Disponible: "
            OptionLabel="Todavía hay productos"
            SelectValue={disponible}
            SelectChange={(e)=> setDisponible(e.target.value)}
            Options={
              <>
                <option value="true">Si</option>
                <option value="false">No</option>
              </>
            }
          />
        </Form.Group>
        <BtnAction
          btnColor="primary"
          btnClick={AgregarProducto}
          btnContent="Agregar"
        />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
