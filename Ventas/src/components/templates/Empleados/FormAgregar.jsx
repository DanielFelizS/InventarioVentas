import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  api,
  useState,
  useEffect,
  usePost
} from "../Dependencies";

export default function FormAgregar() {

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState(18);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [sueldo, setSueldo] = useState(1000);
  const [cargo, setCargo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const { AgregarDatos } = usePost({ url: "empleado"})

  const AgregarEmpleados = async () => {
    const datos = {
      nombre: nombre,
      apellido: apellido,
      sexo: sexo,
      edad: edad,
      telefono: telefono,
      email: email,
      dni: dni,
      sueldo: sueldo,
      cargo: cargo,
      fechaNacimiento: fechaNacimiento,
      fechaContratacion: fechaContratacion
    }
    AgregarDatos(datos)
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
              Inputvalue={edad}
              InputChange={(e)=> setEdad(e.target.value)}
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
          <FormInput
            InputTitle="Sueldo: "
            InputType="number"
            InputPlaceholder="50,000"
            InputName="sueldo"
            Inputvalue={sueldo}
            InputChange={(e)=> setSueldo(e.target.value)}
          />
          <FormInput
            InputTitle="Cargo: "
            InputType="text"
            InputPlaceholder="Conserje"
            InputName="cargo"
            Inputvalue={cargo}
            InputChange={(e)=> setCargo(e.target.value)}
          />
          <Form.Label>Fecha de nacimiento y fecha de contratación: </Form.Label>
          <InputGroup>
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaNacimiento"
              Inputvalue={fechaNacimiento}
              InputChange={(e)=> setFechaNacimiento(e.target.value)}
            />
            <FormInput
              InputTitle=""
              InputType="date"
              InputPlaceholder=""
              InputName="fechaContratacion"
              Inputvalue={fechaContratacion}
              InputChange={(e)=> setFechaContratacion(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <BtnAction btnColor="primary" btnClick={AgregarEmpleados} btnContent="Agregar"/>
        <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar"/>
      </Form>
    </>
  );
}
