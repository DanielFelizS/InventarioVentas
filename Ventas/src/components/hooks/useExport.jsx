import { saveAs } from "file-saver";
import { api, useState } from "./dependencies";

export default function useExport( {url, search, fileName} ) {
    const [msg, setMsg] = useState()
    const ExportarExcel = async () => {
        setMsg("Generando excel...");
        try {
          const response = await api.get(`/${url}/exportar-excel?filtro=${search}`, { responseType: 'blob' });
          const blob = new Blob([response.data], { type: 'application/xlsx' });
          saveAs(blob, `${fileName}.xlsx`);
          setMsg("Descarga exitosa");
        } catch (error) {
          setMsg("La exportación del excel ha fallado");
          console.error(error);
        }
      }
  return {
    ExportarExcel,
    msg
  }
}
