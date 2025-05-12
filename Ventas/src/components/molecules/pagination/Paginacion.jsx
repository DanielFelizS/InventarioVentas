import ReactPaginate from "react-paginate";

export default function Pagination ({ PageCount, ActionPage }) {
  return (
      <ReactPaginate
        previousLabel={" <-"}
        nextLabel={" ->"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={PageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={ActionPage}
        containerClassName={"pagination pagination-md justify-content-center"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
  )
}