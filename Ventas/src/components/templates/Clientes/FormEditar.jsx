/* eslint-disable react-hooks/exhaustive-deps */
import useGetById from "../../hooks/useGetById";
import {
  FormInput,
  BtnAction,
  InputGroup,
  Form,
  useState,
  useEffect,
  usePut,
  useParams,
} from "../Dependencies";

export default function FormEditar() {
  const [edit, setEdit] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
  });

  const { editarDatos, handleNavigate } = usePut({
    url: "cliente",
    PropEdit: edit,
    urlRuta: "clientes",
  });
  const { id } = useParams();
  const { cliente } = useGetById({ url: "cliente", id: id });

  useEffect(() => {
    obtenerDatos();
  }, [cliente]);

  const obtenerDatos = async () => {
    setEdit({
      ...cliente,
    });
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

        <BtnAction
          btnColor="warning"
          btnClick={editarDatos}
          btnContent="Editar"
        />
        <BtnAction
          btnColor="danger"
          btnClick={handleNavigate}
          btnContent="Cancelar"
        />
      </Form>
    </>
  );
}
