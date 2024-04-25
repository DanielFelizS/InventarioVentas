import {
    FormInput,
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
    const [edit, setEdit] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        dni: ""
    })

    const { editarDatos } = usePut({url: "cliente", PropEdit: edit});
    const { id } = useParams();

    useEffect(() => {
      obtenerDatos();
    }, []);
  
    const obtenerDatos = async () => {
      try {
        const response = await api.get(`/cliente/${id}`);
        setEdit({
        ...response.data
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
  
            <Form.Label>Teléfono y correo electrónico: </Form.Label>
            <InputGroup>
              <FormInput
                InputTitle=""
                InputType="text"
                InputPlaceholder="+1 (123) 4567 890"
                InputName="telefono"
                Inputvalue={edit.telefono}
                InputChange={handleInputChange}
              />
              <FormInput
                InputTitle=""
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
          </Form.Group>
  
          <BtnAction btnColor="warning" btnClick={editarDatos} btnContent="Editar" />
          {/* <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" /> */}
        </Form>
      </>
    );
  }
  