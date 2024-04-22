import FormInput from "../../atoms/Input";
import Select from "../../atoms/Select";
import BtnAction from "../../atoms/Button";
import { InputGroup, Form } from "react-bootstrap";
export default function FormAgregar() {
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
              Inputvalue=""
              InputChange={"estado"}
            />
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Íberico Gr."
              InputName="descripicion"
              Inputvalue=""
              InputChange={"estado"}
            />
          </InputGroup>

            <FormInput
              InputTitle="Precio"
              InputType="number"
              InputPlaceholder="10,000"
              InputName="precio"
              Inputvalue=""
              InputChange={"estado"}
            />
            <Select
              SelectLabel="Disponible: "
              Options={
                <>
                  <option value="">Si</option>
                  <option value="">No</option>
                </>
              }
            />

        </Form.Group>

        <BtnAction btnColor="primary" btnClick={""} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" />
      </Form>
    </>
  );
}
