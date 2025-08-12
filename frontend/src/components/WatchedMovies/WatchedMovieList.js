import WatchedMovie from "./WatchedMovie";
import { MovieContext } from "../../utils/MovieContext";
import { useContext } from "react";
import styles from "../MovieList/MovieList.module.css"

function WatchedMovieList(){
  const{watched} = useContext(MovieContext);
  return(
    <ul className={styles.list}>
      {watched.map((movie, idx) => {
    const key = movie?.imdbID ?? `fallback-${idx}`;
    if (!movie?.imdbID) console.warn("Missing imdbID:", movie);
    return <WatchedMovie movie={movie} key={key} />;
  })}
</ul>
  )
}
export default WatchedMovieList;