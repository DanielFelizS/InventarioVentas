import { Table, BtnAction, FormInput } from "../Dependencies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../../config'

export default function Empleados () {
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState("");

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value);
  }

  const ExportarExcel = async () => {
      setMsg("Generando excel...");
      try {
        const response = await api.get(`/empleado/exportar-excel?filtro=${search}`, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/xlsx' });
        saveAs(blob, 'Empleados.xlsx');
        setMsg("Descarga exitosa");

      } catch (error) {
        setMsg("La exportación del excel ha fallado");
        console.error(error);
      }
  }

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