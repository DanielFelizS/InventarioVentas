import { Table, BtnAction, FormInput,useSearch, useExport, useNavigate } from "../Dependencies";

export default function Ventas() {
  const { search, handleChangeSearch } = useSearch();
  const { ExportarExcel, msg } = useExport({ url: "ventas", search: search, fileName: "Ventas" })

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/agregar_venta");
  };
  const Datos = [
    "id",
    "nombre_producto",
    "precio_producto",
    "nombre_empleado",
    "nombre_cliente",
    "cantidad",
    "fecha_venta",
    "total",
    "itbis",
  ];
  const Headers = [
    "ID",
    "Producto",
    "Precio del producto",
    "Empleado",
    "Cliente",
    "Cantidad",
    "Fecha",
    "Total",
    "ITBIS",
  ];

  return (
    <>

      <div className="btn-Agregar">
        <FormInput
          value={search}
          InputChange={handleChangeSearch}
          InputType="text"
          InputPlaceholder="Buscar"
        />
        <BtnAction
          btnColor="primary"
          btnClick={handleNavigate}
          btnContent="Agregar venta"
        />
      </div>

      {msg && <span style={{ color: "red" }}>{msg}</span>}

      <Table
        APIPath="ventas"
        APINames={Datos}
        EditarDatos={"editar_venta"}
        EliminarDatos={"eliminar_venta"}
        searchData={search}
        Header={Headers}
      />
      {/* <BtnAction btncolor='success' action={Reporte} btnlabel='Generar reporte'/> */}
      <BtnAction
        btnColor="primary"
        btnClick={ExportarExcel}
        btnContent="Exportar excel"
      />
    </>
  );
}
