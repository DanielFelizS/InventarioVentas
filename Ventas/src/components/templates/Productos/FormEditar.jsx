import useGetById from "@hooks/useGetById";
import {
  FormInput,
  Select,
  BtnAction,
  InputGroup,
  Form,
  // api,
  useState,
  useEffect,
  usePut,
  useParams,
  // useReducer,
  // productosReducer,
  // ProductosData,
} from "@templates/Dependencies";

export default function FormEditar() {
  // const [state, dispatch] = useReducer(productosReducer, ProductosData)
  const [edit, setEdit] = useState({
    producto: "",
    precio: 0,
    descripcion: "",
    disponible: null,
  });
  const { editarDatos, handleNavigate } = usePut({
    url: "producto",
    PropEdit: edit,
    urlRuta: "productos",
  });

  const { id } = useParams();
  const { productos } = useGetById({url: "producto", id: id})

  useEffect(() => {
    obtenerDatos();
  }, [productos]);

  const obtenerDatos = async () => {
    setEdit({...productos});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handleSelectChange = (e) => {
    const select = e.target.value;
    setEdit((prevState) => ({
      ...prevState,
      disponible: select,
    }));
  };

  return (
    <>
      <Form className="FormData">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Nombre del producto y descripción: </Form.Label>
          <InputGroup>
            <FormInput
              InputType="text"
              InputPlaceholder="Jamón"
              InputName="producto"
              Inputvalue={edit.producto}
              InputChange={handleInputChange}
            />
            <FormInput
              InputType="text"
              InputPlaceholder="Íberico Gr."
              InputName="descripcion"
              Inputvalue={edit.descripcion}
              InputChange={handleInputChange}
            />
          </InputGroup>

          <FormInput
            InputTitle="Precio"
            InputType="number"
            InputPlaceholder="100 US$"
            InputName="precio"
            Inputvalue={edit.precio}
            InputChange={handleInputChange}
          />
          <Select
            SelectLabel="Disponible: "
            OptionLabel="Todavía hay productos"
            SelectValue={edit.disponible}
            SelectChange={handleSelectChange}
            Options={
              <>
                <option value="true">Si</option>
                <option value="false">No</option>
              </>
            }
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
