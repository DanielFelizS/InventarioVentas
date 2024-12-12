import { EmpleadosDatos } from "@reducers/empleadosReducer";
import { empleadosReducer, EmpleadosTypes } from "@hooks/dependencies";
import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  useState,
  usePost,
  useReducer
} from "@templates/Dependencies";

export default function FormAgregar() {
  const [state, dispatch] = useReducer(empleadosReducer, EmpleadosDatos)
  const [sexo, setSexo] = useState("")

  const { AgregarEmpleado, handleNavigate } = usePost({urlRuta: "empleados"});

  const AgregarEmpleados = async () => {
    const empleadoDatos = {
      nombre: state.nombre,
      apellido: state.apellido,
      sexo: sexo,
      edad: state.edad,
      telefono: state.telefono,
      email: state.email,
      dni: state.dni,
      sueldo: state.sueldo,
      cargo: state.cargo,
      fechaNacimiento: state.fechaNacimiento,
      fechaContratacion: state.fechaContratacion
    }
    AgregarEmpleado(empleadoDatos)
  }

  const handleChange = (e) => {
    dispatch({ type:EmpleadosTypes.CHANGE_INPUT, payload:{name:e.target.name, value:e.target.value} })
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

          <Form.Label>Sexo y Edad:</Form.Label>
          <InputGroup>
            <Select 
            OptionLabel={"Sexo"}
            SelectValue={sexo}
            SelectChange={(e)=> setSexo(e.target.value)}
              Options={
                <>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </>
              }
              SelectLabel=""
            />
            <FormInput
              InputType="number"
              InputPlaceholder="18"
              InputName="Edad"
              Inputvalue={state.edad}
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
          <FormInput
            InputTitle="Sueldo: "
            InputType="number"
            InputPlaceholder="50,000"
            InputName="sueldo"
            Inputvalue={state.sueldo}
            InputChange={handleChange}
          />
          <FormInput
            InputTitle="Cargo: "
            InputType="text"
            InputPlaceholder="Conserje"
            InputName="cargo"
            Inputvalue={state.cargo}
            InputChange={handleChange}
          />
          <Form.Label>Fecha de nacimiento y fecha de contratación: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaNacimiento"
              Inputvalue={state.fechaNacimiento}
              InputChange={handleChange}
            />
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaContratacion"
              Inputvalue={state.fechaContratacion}
              InputChange={handleChange}
            />
          </InputGroup>
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarEmpleados} btnContent="Agregar"/>
        <BtnAction btnColor="danger" btnClick={handleNavigate} btnContent="Cancelar"/>
      </Form>
    </>
  );
}
