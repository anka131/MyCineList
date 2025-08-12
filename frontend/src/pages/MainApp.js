import { MovieContext } from "../utils/MovieContext"
import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/Navigation/SearchBar"
import MovieList from "../components/MovieList/MovieList";
import Navbar from "../components/Navigation/Navbar";
import Loader from "../components/Loader";
import Error from "../components/Error";
import WatchedSummary from "../components/WatchedMovies/WatchedSummary";
import NumResults from "../components/Navigation/NumResults";
import Main from "../components/MovieList/Main";
import Box from "../components/MovieList/Box";
import MovieDetails from "../components/SingleMovie/MovieDetails";
import WatchedMovieList from "../components/WatchedMovies/WatchedMovieList";
import { ThemeToggle } from "../components/ThemeToggle";
import Logout from "../components/Navigation/Logout";



function MainApp() {
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
    <> <Navbar>
        <SearchBar />
        <NumResults />
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} /> 
        <Logout />
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
  
  )
}


export default MainApp;















