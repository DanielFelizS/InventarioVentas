import FormInput from "../../atoms/Input";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../../../../config";

export default function FormAgregar() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [data, setData] = useState([]);

  const AgregarClientes = async ()=> {
    const datos = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: email,
      dni: dni
    }
    try{
      const response = await api.post('/cliente', datos);
      setData([...data, response.data]);
      alert("Los datos del cliente han sido agregados correctamente");
    }
    catch(error){
      console.error(`Ha ocurrido un error: ${error}`);
    }
  }

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nombre y apellido: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Juan"
              InputName="nombre"
              Inputvalue={nombre}
              InputChange={(e)=> setNombre(e.target.value)}
            />
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Perez"
              InputName="apellido"
              Inputvalue={apellido}
              InputChange={(e)=> setApellido(e.target.value)}
            />
          </InputGroup>

          <Form.Label>Teléfono y correo electrónico: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="+1 (123) 4567 890"
              InputName="telefono"
              Inputvalue={telefono}
              InputChange={(e)=> setTelefono(e.target.value)}
            />
            <FormInput
              InputTitle=""
              InputType="email"
              InputPlaceholder="juanperez@correo.com"
              InputName="email"
              Inputvalue={email}
              InputChange={(e)=> setEmail(e.target.value)}
            />
          </InputGroup>

          <FormInput
            InputTitle="DNI: "
            InputType="text"
            InputPlaceholder="1-2334454665767-809"
            InputName="dni"
            Inputvalue={dni}
            InputChange={(e)=> setDni(e.target.value)}
          />
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarClientes} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
