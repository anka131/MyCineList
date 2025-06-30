import { MovieContext } from "./MovieContext";
import { useContext, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Error from "./components/Error";
import WatchedSummary from "./components/WatchedSummary";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieList from "./components/WatchedMovieList";
import { ThemeToggle } from "./components/ThemeToggle";



export default function App() {
  const { isLoading, error, selectedId} = useContext(MovieContext);
    const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <>
    <Navbar>
        <SearchBar />
        <NumResults />
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} /> 
    </Navbar>
    <Main> 
      <Box isDark={isDark}>
        {isLoading && <Loader />}
        {!isLoading && !error && <MovieList />}
        {error && <Error message={error} />}
      </Box>
      <Box isDark={isDark}>
      {
        selectedId ?
         (
         <MovieDetails />
        )
        :
       ( <>
        <WatchedSummary />
        <WatchedMovieList />
        </>)
        }
      </Box>
    </Main>
    </>
  );
}



















