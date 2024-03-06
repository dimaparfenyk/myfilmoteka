import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

const Pagination = ({ onPageChange, currentPage, domRef }) => {
  const isMobile = window.innerWidth < 575;
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
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 3 : 5}
        marginPagesDisplayed={isMobile ? 1 : 3}
        pageCount={500}
        forcePage={currentPage - 1}
        previousLabel="<"
        pageClassName={css.page_item}
        pageLinkClassName={css.page_link}
        previousClassName={css.page_item}
        previousLinkClassName={css.arrow__page_link}
        nextClassName={css.page_item}
        nextLinkClassName={css.arrow__page_link}
        breakLabel="..."
        breakClassName={css.break_item}
        breakLinkClassName={css.break_link}
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
