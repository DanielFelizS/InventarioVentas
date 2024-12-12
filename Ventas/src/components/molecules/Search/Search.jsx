import dayjs from "dayjs";
import TableButtons from "@components/molecules/Table/TableButtons";

const Search = ({
  DataFilter,
  search,
  columnNames,
  EditarPath,
  EliminarPath,
}) => {
  const disponible = (data)=> {
    if(data === true){
      return "Si"
    }
    else{
      return "No"
    }
  }

  return (
    <>
    <tbody>
      {DataFilter
        .filter((row) => {
          return (
            search.trim() === "" ||
            columnNames.some(columnName =>
              typeof row[columnName] === "string" &&
              row[columnName]?.toLowerCase().includes(search.toLowerCase())
            )
          );
        })
        .map((item, index) => (
          <tr key={index}>
            {columnNames.map(columnName => {
              return (
                <td key={columnName}>
                  {columnName === "fechaNacimiento" || columnName === "fechaContratacion" || 
                  columnName === "fecha_venta"
                    ? dayjs(item[columnName]).format("DD/MM/YYYY")
                    : item[columnName]}
                    
                    {columnName === "disponible"
                    // ? item[columnName].toString()
                    ? disponible(item[columnName])
                    : null}
                </td>
              );
            })}
            <td>
              <TableButtons
                DataNavigate={item}
                EditarProp={EditarPath}
                EliminarProp={EliminarPath}
              />
            </td>
          </tr>
        ))}
        </tbody>
    </>
  );
};

export default Search;
