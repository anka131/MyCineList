import Movie from "./Movie";
import { MovieContext } from "../MovieContext";
import { useContext } from "react";
import styles from "./MovieList.module.css";

function MovieList(){
  const {movies} = useContext(MovieContext);
 const uniqueMovies = movies.filter(
  (movie, index, self) =>
    index === self.findIndex(m => m.imdbID === movie.imdbID)
);
  return(
    
      <ul className={`${styles.list} ${styles.listMovies} `}>
        {uniqueMovies?.map((movie) => (
         <Movie movie={movie} key={movie.imdbID}  />
        ))}
      </ul>
  )
}
export default MovieList;
