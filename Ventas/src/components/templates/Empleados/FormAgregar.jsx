import FormInput from "../../atoms/Input";
import Select from "../../atoms/Select";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
export default function FormAgregar() {
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
              Inputvalue=""
              InputChange={"estado"}
            />
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Perez"
              InputName="apellido"
              Inputvalue=""
              InputChange={"estado"}
            />
          </InputGroup>

          <Form.Label>Sexo y Edad:</Form.Label>
          <InputGroup>
            <Select
              Options={
                <>
                  <option value="">M</option>
                  <option value="">F</option>
                </>
              }
              SelectLabel=""
            />
            <FormInput
              InputTitle=""
              InputType="number"
              InputPlaceholder="18"
              InputName="Edad"
              Inputvalue=""
              InputChange={"estado"}
            />
          </InputGroup>

          <Form.Label>Teléfono y correo electrónico: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="+1 (123) 4567 890"
              InputName="telefono"
              Inputvalue=""
              InputChange={"estado"}
            />
            <FormInput
              InputTitle=""
              InputType="email"
              InputPlaceholder="juanperez@correo.com"
              InputName="email"
              Inputvalue=""
              InputChange={"estado"}
            />
          </InputGroup>

          <FormInput
            InputTitle="DNI: "
            InputType="text"
            InputPlaceholder="1-2334454665767-809"
            InputName="dni"
            Inputvalue=""
            InputChange={"estado"}
          />

          <FormInput
            InputTitle="Sueldo: "
            InputType="number"
            InputPlaceholder="50,000"
            InputName="sueldo"
            Inputvalue=""
            InputChange={"estado"}
          />
          <FormInput
            InputTitle="Cargo: "
            InputType="text"
            InputPlaceholder="Conserje"
            InputName="cargo"
            Inputvalue=""
            InputChange={"estado"}
          />

          <Form.Label>Fecha de nacimiento y fecha de contratación: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaNacimiento"
              Inputvalue=""
              InputChange={"estado"}
            />
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaContratacion"
              Inputvalue=""
              InputChange={"estado"}
            />
          </InputGroup>
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={""} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
