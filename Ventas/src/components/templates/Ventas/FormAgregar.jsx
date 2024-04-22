import FormInput from "../../atoms/Input";
import Select from "../../atoms/Select";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
export default function FormAgregar() {
  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nombre y precio del producto: </Form.Label>
          <InputGroup>
            <Select
              SelectLabel=""
              Options={
                <>
                  <option value="">M</option>
                  <option value="">F</option>
                </>
              }
            />
            <Select
              SelectLabel=""
              Options={
                <>
                  <option value="">M</option>
                  <option value="">F</option>
                </>
              }
            />
          </InputGroup>

          <Form.Label>Empleado y cliente: </Form.Label>
          <InputGroup>
            <Select
              SelectLabel=""
              Options={
                <>
                  <option value="">M</option>
                  <option value="">F</option>
                </>
              }
            />
            <Select
              SelectLabel=""
              Options={
                <>
                  <option value="">M</option>
                  <option value="">F</option>
                </>
              }
            />
          </InputGroup>

          <FormInput
            InputTitle="Cantidad: "
            InputType="number"
            InputPlaceholder="5"
            InputName="cantidad"
            Inputvalue=""
            InputChange={"estado"}
          />

        </Form.Group>

        <BtnAction btnColor="primary" btnClick={""} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
