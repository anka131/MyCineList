import WatchedMovie from "./WatchedMovie";
import { MovieContext } from "../MovieContext";
import { useContext } from "react";
import styles from "./MovieList.module.css";

function WatchedMovieList(){
  const{watched} = useContext(MovieContext);
  return(
    <ul className={styles.list}>
    {watched?.map((movie) => (
     <WatchedMovie key={movie.imdbID} movie={movie} />
    ))}
  </ul>
  )
}
export default WatchedMovieList;