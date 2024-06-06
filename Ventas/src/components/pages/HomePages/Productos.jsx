import { Table, BtnAction, FormInput,useSearch, useExport, useNavigate } from "../Dependencies";

export default function Productos() {
  const {search, handleChangeSearch } = useSearch();
  const {ExportarExcel, msg } = useExport({ url: "producto", search: search, fileName: "Productos" })
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/agregar_producto");
  };
  const Datos = ['id', 'producto', 'descripcion', 'precio', 'disponible'];
  const Headers = ['ID', 'Producto', 'Descripción', 'Precio', 'Disponible'];

  return (
    <>      
      <div className='btn-Agregar'>

      <FormInput value={search} InputChange={handleChangeSearch} InputType='text' InputPlaceholder="Buscar" />
      <BtnAction btnColor='primary' btnClick={handleNavigate} btnContent='Agregar producto'/> 
      </div>

      { msg && <span style={{color:"red"}}>{msg}</span> }

      <Table APIPath='producto' APINames={Datos} EditarDatos={'editar_producto'} EliminarDatos={'eliminar_producto'} searchData={search} Header={Headers}/>
      {/* <BtnAction btncolor='success' action={Reporte} btnlabel='Generar reporte'/> */}
      <BtnAction btnColor='primary' btnClick={ExportarExcel} btnContent='Exportar excel'/>
    </>
  )
}