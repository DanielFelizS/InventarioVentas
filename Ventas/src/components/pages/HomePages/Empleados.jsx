import { Table, BtnAction, FormInput,useSearch, useExport, useNavigate } from "../Dependencies";

export default function Empleados () {
  const {search, handleChangeSearch } = useSearch();
  const {ExportarExcel, msg } = useExport({ url: "empleado", search: search, fileName: "Empleados" })

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/agregar_empleado");
  };
  const Datos = ['id', 'nombre', 'apellido', 'sexo', 'edad', 'telefono', 'email' , 'dni', 'cargo', 'sueldo', 'fechaNacimiento', 'fechaContratacion'];

  const Headers = ['ID', 'Nombre', 'Apellido', 'Sexo', 'Edad', 'Teléfono', 'Email', 'DNI', 'Cargo', 'Sueldo', 'Fecha de Nacimiento','Fecha de contratación'];

  return (
    <>

      <div className='btn-Agregar'>
      <FormInput value={search} InputChange={handleChangeSearch} InputType='text' InputPlaceholder="Buscar" />
      <BtnAction btnColor='primary' btnClick={handleNavigate} btnContent='Agregar Empleado'/> 
      </div>

      { msg && <span style={{color:"red"}}>{msg}</span> }

      <Table APIPath='empleado' APINames={Datos} EditarDatos={'editar_empleado'} EliminarDatos={'eliminar_empleado'} searchData={search} Header={Headers}/>
      <BtnAction btnColor='primary' btnClick={ExportarExcel} btnContent='Exportar excel'/>
    </>
  )
}