import { Table, BtnAction, FormInput } from "../Dependencies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../../config'

export default function Productos() {
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState("");

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value);
  }
    
  const ExportarExcel = async () => {
      setMsg("Generando excel...");
      try {
        const response = await api.get(`/producto/exportar-excel?filtro=${search}`, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/xlsx' });
        saveAs(blob, 'Productos.xlsx');
        setMsg("Descarga exitosa");

      } catch (error) {
        setMsg("La exportación del excel ha fallado");
        console.error(error);
      }
  }

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