import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import SearchBox from "../../components/SearchBox";
import MoviesList from "../../components/MoviesList";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";

  useEffect(() => {
    api.getMovieByQuery(movieName, currentPage).then((res) => {
      setMovies(res.results);
      res.total_pages > 500
        ? setTotalPages(500)
        : setTotalPages(res.total_pages);
    });
  }, [currentPage, movieName]);

  function updateQueryString(movieName) {
    const nextParams = movieName !== "" ? { movieName } : {};
    setSearchParams(nextParams);
  }

  const visibleMovies = () =>
    movies.filter((movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase())
    );

  return (
    <div className="container">
      <SearchBox value={movieName} onChange={updateQueryString} />
      {movies.length > 0 && (
        <MoviesList
          movies={visibleMovies()}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
