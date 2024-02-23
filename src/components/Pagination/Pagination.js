import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

const Pagination = ({ onPageChange, currentPage, domRef }) => {
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
    smoothScrollToTop();
  };

  const smoothScrollToTop = () => {
    domRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={css.paginate__box}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
        pageCount={500}
        forcePage={currentPage - 1}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="break-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
