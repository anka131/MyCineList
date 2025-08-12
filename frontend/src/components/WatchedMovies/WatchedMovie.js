import { MovieContext } from "../../utils/MovieContext";
import { useContext } from "react";
import styles from "./WatchedSummary.module.css";

function WatchedMovie({movie}){
  const { handleDeleteWatched } = useContext(MovieContext);

  return(
    <li key={movie.imdbID} className={styles.movie}>
      <img src={movie.poster} alt={`${movie.title} poster`} className={styles.poster} />
      <h3 className={styles.title}>{movie.title}</h3>
      <div className={styles.stats}>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className={styles.btnDelete} onClick={() => handleDeleteWatched(movie.imdbID)}>X</button>
    </div>
  </li>
  )
}
export default WatchedMovie;