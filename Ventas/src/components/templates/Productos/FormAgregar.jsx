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
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(1);
  const [disponible, setDisponible] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const { AgregarDatos } = usePost({url: "producto"})

  const AgregarProducto = async () => {
    const datos = {
      producto: producto,
      precio: precio,
      descripcion: descripcion,
      disponible: disponible,
    };
    AgregarDatos(datos)
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
              Inputvalue={producto}
              InputChange={(e) => setProducto(e.target.value)}
            />
            <FormInput
              InputType="text"
              InputPlaceholder="Íberico Gr."
              InputName="descripicion"
              Inputvalue={descripcion}
              InputChange={(e) => setDescripcion(e.target.value)}
            />
          </InputGroup>

          <FormInput
            InputTitle="Precio"
            InputType="number"
            InputPlaceholder="100 US$"
            InputName="precio"
            Inputvalue={precio}
            InputChange={(e) => setPrecio(e.target.value)}
          />
          <Select
            SelectLabel="Disponible: "
            OptionLabel="Todavía hay productos"
            SelectValue={disponible}
            SelectChange={(e)=> setDisponible(e.target.checked)}
            Options={
              <>
                <option value="true">Si</option>
                <option value="false">No</option>
              </>
            }
          />
        </Form.Group>
        <BtnAction
          btnColor="primary"
          btnClick={AgregarProducto}
          btnContent="Agregar"
        />
        {/* <BtnAction btnColor="danger" btnClick={""} btnContent="Cancelar" /> */}
      </Form>
    </>
  );
}
