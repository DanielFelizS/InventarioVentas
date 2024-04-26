import { Table, BtnAction, FormInput } from "../Dependencies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../../config'

export default function Clientes () {
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState("");

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value);
  }

  const ExportarExcel = async () => {
    setMsg("Generando excel...");
    try {
      const response = await api.get(`/cliente/exportar-excel?filtro=${search}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/xlsx' });
      saveAs(blob, 'Clientes.xlsx');
      setMsg("Descarga exitosa");
    } catch (error) {
      setMsg("La exportación del excel ha fallado");
      console.error(error);
    }
  }

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
      {/* <BtnAction btncolor='success' action={Reporte} btnlabel='Generar reporte'/> */}
      <BtnAction btnColor='primary' btnClick={ExportarExcel} btnContent='Exportar excel'/>
    </>
  )
}