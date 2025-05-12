import { useState, useEffect } from "react";
import api from '../../../config.js'
import Pagination from "@components/molecules/pagination/Paginacion";
import Search from "@components/molecules/Search/Search";
import TableHead from "@components/atoms/Table/TableHead";
// import DataSpinner from "@components/atoms/others/Spinner.js";

export const Table = ({ APIPath, APINames, EditarDatos, EliminarDatos, searchData, Header }) => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const limit = 6;

  const fetchData = async () => {
    try {
      const response = await api.get(
        `/${APIPath}/buscar?pageNumber=${currentPage}&pageSize=${limit}&search=${searchData}`
      );
      const { data, headers } = response;
      const total = headers["x-total-count"];
      setPageCount(Math.ceil(total / limit));
      setData(data.items);
      setLoad(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchData]); 
  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <>
      {load ? (
        <>
          <table>
            <TableHead HeadPath={Header}/>

            <Search DataFilter={data} search={searchData} columnNames={APINames} EditarPath={EditarDatos} EliminarPath={EliminarDatos}/>
          </table>
        </>
      ) : (
        // <DataSpinner/>
        <h2>Consultando datos...</h2>
      )}
      <Pagination PageCount={pageCount} ActionPage={handlePageClick}/>
    </>
  );
};

export default Table;
