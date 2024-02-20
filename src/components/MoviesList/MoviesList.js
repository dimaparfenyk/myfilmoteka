import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import MovieItem from "../MovieItem";
import api from "../../services/api";
import css from "./MoviesList.module.css";

export default function MoviesList({
  children,
  movies,
  totalPages,
  onPageChange,
}) {
  const [currentItems, setCurrentItems] = useState(null);
  const [itemOffset] = useState(0);
  const [genres, setGenres] = useState([]);
  const movieGallery = useRef(null);
  const itemsPerPage = 20;

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(movies.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, movies]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
    smoothScrollToTop();
  };

  const smoothScrollToTop = () => {
    movieGallery.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {children}
      <ul className={css.movie__list} ref={movieGallery}>
        {currentItems &&
          currentItems.map((movie) => (
            <MovieItem key={movie.id} movie={movie} genres={genres} />
          ))}
      </ul>
      <div className={css.paginate__box}>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
