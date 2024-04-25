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
    useParams
  } from "../Dependencies";
  
  export default function FormEditar() {
    const  [edit, setEdit] = useState({
        nombre: "",
        apellido: "",
        sexo: "",
        edad: 0,
        telefono: "",
        email: "",
        dni: "",
        sueldo: 0,
        cargo: "",
        fechaNacimiento: "",
        fechaContratacion: ""
    })

    const { editarDatos } = usePut({ url: "empleado", PropEdit: edit})
    const { id } = useParams();

    useEffect(() => {
      obtenerDatos();
    }, []);
  
    const obtenerDatos = async () => {
      try {
        const response = await api.get(`/empleado/${id}`);
        const fechaNacimiento = response.data.fechaNacimiento.substring(0, 10); 
        const fechaContratacion = response.data.fechaContratacion.substring(0, 10); 
        setEdit({
        ...response.data,
        fechaNacimiento: fechaNacimiento,
        fechaContratacion: fechaContratacion
      })
      } catch (error) {
        setError("Error al consultarse los datos");
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
                Inputvalue={edit.nombre}
                InputChange={handleInputChange}
              />
              <FormInput
                InputTitle=""
                InputType="text"
                InputPlaceholder="Perez"
                InputName="apellido"
                Inputvalue={edit.apellido}
                InputChange={handleInputChange}
              />
            </InputGroup>
            <Form.Label>Sexo y Edad:</Form.Label>
            <InputGroup>
              <Select 
              OptionLabel={"Sexo"}
              SelectValue={edit.sexo}
              SelectChange={handleInputChange}
                Options={
                  <>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </>
                }
              />
              <FormInput
                InputType="number"
                InputPlaceholder="18"
                InputName="Edad"
                Inputvalue={edit.edad}
                InputChange={handleInputChange}
              />
            </InputGroup>
            <Form.Label>Teléfono y correo electrónico: </Form.Label>
            <InputGroup>
              <FormInput
                InputType="text"
                InputPlaceholder="+1 (123) 4567 890"
                InputName="telefono"
                Inputvalue={edit.telefono}
                InputChange={handleInputChange}
              />
              <FormInput
                InputType="email"
                InputPlaceholder="juanperez@correo.com"
                InputName="email"
                Inputvalue={edit.email}
                InputChange={handleInputChange}
              />
            </InputGroup>
  
            <FormInput
              InputTitle="DNI: "
              InputType="text"
              InputPlaceholder="1-2334454665767-809"
              InputName="dni"
              Inputvalue={edit.dni}
              InputChange={handleInputChange}
            />
            <FormInput
              InputTitle="Sueldo: "
              InputType="number"
              InputPlaceholder="50,000"
              InputName="sueldo"
              Inputvalue={edit.sueldo}
              InputChange={handleInputChange}
            />
            <FormInput
              InputTitle="Cargo: "
              InputType="text"
              InputPlaceholder="Conserje"
              InputName="cargo"
              Inputvalue={edit.cargo}
              InputChange={handleInputChange}
            />
            <Form.Label>Fecha de nacimiento y fecha de contratación: </Form.Label>
            <InputGroup>
              <FormInput
                InputType="date"
                InputName="fechaNacimiento"
                Inputvalue={edit.fechaNacimiento}
                InputChange={handleInputChange}
              />
              <FormInput
                InputType="date"
                InputName="fechaContratacion"
                Inputvalue={edit.fechaContratacion}
                InputChange={handleInputChange}
              />
            </InputGroup>
          </Form.Group>
  
          <BtnAction btnColor="warning" btnClick={editarDatos} btnContent="Editar"/>
          {/* <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar"/> */}
        </Form>
      </>
    );
  }
  