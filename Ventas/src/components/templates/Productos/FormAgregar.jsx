import {
  FormInput, Select,
  BtnAction, InputGroup, Form,
  useState, usePost, productosReducer,
  useReducer, ProductosData, ProductosTypes
} from "@templates/Dependencies";

export default function FormAgregar() {

  const [disponible, setDisponible] = useState()
  const [state, dispatch] = useReducer(productosReducer, ProductosData)

  const handleChange = (e) => {
    dispatch({ type:ProductosTypes.CHANGE_INPUT, payload:{name:e.target.name, value:e.target.value} })
  }
  
  const { AgregarProducto, handleNavigate } = usePost({urlRuta: "productos"});

  const AgregarProductos = async () => {
    const productosDatos = {
      producto: state.producto,
      precio: state.precio,
      descripcion: state.descripcion,
      disponible: disponible,
    };
    AgregarProducto(productosDatos)
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
              Inputvalue={state.producto}
              InputChange={handleChange}
            />
            <FormInput
              InputType="text"
              InputPlaceholder="Íberico Gr."
              InputName="descripcion"
              Inputvalue={state.descripcion}
              InputChange={handleChange}
            />
          </InputGroup>

          <FormInput
            InputTitle="Precio"
            InputType="number"
            InputPlaceholder="100 US$"
            InputName="precio"
            Inputvalue={state.precio}
            InputChange={handleChange}
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
          btnClick={AgregarProductos}
          btnContent="Agregar"
        />
        <BtnAction btnColor="danger" btnClick={handleNavigate} btnContent="Cancelar" />
      </Form>
    </>
  );
}
