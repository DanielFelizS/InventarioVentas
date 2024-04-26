import { Table, BtnAction, FormInput } from "../Dependencies";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../../../config'

export default function Ventas() {
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState("");

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value);
  }
    
    const ExportarExcel = async () => {
      setMsg("Generando excel...");
      try {
        const response = await api.get(`/venta/exportar-excel?filtro=${search}`, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/xlsx' });
        saveAs(blob, 'Ventas.xlsx');
        setMsg("Descarga exitosa");

      } catch (error) {
        setMsg("La exportación del excel ha fallado");
        console.error(error);
      }
    }

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/agregar_venta");
  };
  const Datos = ['id', 'nombre_producto', 'precio_producto', 'nombre_empleado', 'nombre_cliente', 'cantidad', 'fecha_venta', 'total', 'itbis'];
  const Headers = ['ID', 'Producto', 'Precio del producto', 'Empleado', 'Cliente', 'Cantidad', 'Fecha', 'Total', 'ITBIS'];

  return (
    <>
      <div className='btn-Agregar'>

      <FormInput value={search} InputChange={handleChangeSearch} InputType='text' InputPlaceholder="Buscar" />
      <BtnAction btnColor='primary' btnClick={handleNavigate} btnContent='Agregar venta'/> 
      </div>

      { msg && <span style={{color:"red"}}>{msg}</span> }

      <Table APIPath='ventas' APINames={Datos} EditarDatos={'editar_venta'} EliminarDatos={'eliminar_venta'} searchData={search} Header={Headers}/>
      {/* <BtnAction btncolor='success' action={Reporte} btnlabel='Generar reporte'/> */}
      <BtnAction btnColor='primary' btnClick={ExportarExcel} btnContent='Exportar excel'/>
    </>
  )
}