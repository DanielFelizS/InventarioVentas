import { Table, BtnAction, FormInput,useSearch, useExport, useNavigate } from "../Dependencies";

export default function Clientes () {
  const {search, handleChangeSearch } = useSearch();
  const {ExportarExcel, msg } = useExport({ url: "cliente", search: search, fileName: "Clientes" })

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/agregar_cliente");
  };
  const Datos = ['id', 'nombre', 'apellido', 'telefono', 'email', 'dni'];
  const Headers = ['ID', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'DNI'];

  return (
    <>

      <div className='btn-Agregar'>
        <FormInput value={search} InputChange={handleChangeSearch} InputType='text' InputPlaceholder="Buscar" />
        <BtnAction btnColor='primary' btnClick={handleNavigate} btnContent='Agregar Cliente'/> 
      </div>

      { msg && <span style={{color:"red"}}>{msg}</span> }

      <Table APIPath='cliente' APINames={Datos} EditarDatos={'editar_cliente'} EliminarDatos={'eliminar_cliente'} searchData={search} Header={Headers}/>
      <BtnAction btnColor='primary' btnClick={ExportarExcel} btnContent='Exportar excel'/>
    </>
  )
}