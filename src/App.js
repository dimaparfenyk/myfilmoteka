import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Library from "./pages/Library";
import MovieDetails from "./components/MovieDetails";
import Cast from "./components/Cast";
import Reviews from "./components/Reviews";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/library" element={<Library />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/library/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
