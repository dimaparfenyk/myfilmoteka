import { useEffect, useState } from "react";
import api from "../../services/api";
import MoviesList from "../../components/MoviesList";

const Library = () => {
  const [genres, setGenres] = useState([]);
  const [movies] = useState(() => {
    const storedData = localStorage.getItem("watched");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    api.getGenresIds().then(({ genres }) => setGenres(genres));
  }, []);

  return (
    <div className="container">
      Library
      {movies.length > 0 && <MoviesList movies={movies} genres={genres} />}
    </div>
  );
};

export default Library;
