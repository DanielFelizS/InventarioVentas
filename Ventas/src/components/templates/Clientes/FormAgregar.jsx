import { ClientesDatos } from "../../../reducers/clientesReducer";
import { clientesReducer } from "../../hooks/dependencies";
import {
  FormInput,
  BtnAction,
  InputGroup,
  Form,
  usePost,
  useReducer,
  ProductosTypes
} from "../Dependencies";

export default function FormAgregar() {
  const [state, dispatch] = useReducer(clientesReducer, ClientesDatos)
  const { AgregarClientes, handleNavigate } = usePost({urlRuta: "clientes"});

  const AgregarCliente = async ()=> {
    const clienteDatos = {
      nombre: state.nombre,
      apellido: state.apellido,
      telefono: state.telefono,
      email: state.email,
      dni: state.dni
    }
    AgregarClientes(clienteDatos)
  }

  const handleChange = (e) => {
    dispatch({ type:ProductosTypes.CHANGE_INPUT, payload:{name:e.target.name, value:e.target.value} })
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
              Inputvalue={state.nombre}
              InputChange={handleChange}
            />
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="Perez"
              InputName="apellido"
              Inputvalue={state.apellido}
              InputChange={handleChange}
            />
          </InputGroup>

          <Form.Label>Teléfono y correo electrónico: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="text"
              InputPlaceholder="+1 (123) 4567 890"
              InputName="telefono"
              Inputvalue={state.telefono}
              InputChange={handleChange}
            />
            <FormInput
              InputTitle=""
              InputType="email"
              InputPlaceholder="juanperez@correo.com"
              InputName="email"
              Inputvalue={state.email}
              InputChange={handleChange}
            />
          </InputGroup>

          <FormInput
            InputTitle="DNI: "
            InputType="text"
            InputPlaceholder="1-2334454665767-809"
            InputName="dni"
            Inputvalue={state.dni}
            InputChange={handleChange}
          />
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarCliente} btnContent="Agregar" />
        <BtnAction btnColor="danger" btnClick={handleNavigate} btnContent="Cancelar" />
      </Form>
    </>
  );
}
