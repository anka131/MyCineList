import { useContext } from "react";
import { MovieContext } from "../../utils/MovieContext";
import styles from "../MovieList/MovieList.module.css"

function Movie({ movie }) {
  const { handleSelectMovie } = useContext(MovieContext);

  return (
    <li
      className={styles.listItem}
      onClick={() => handleSelectMovie(movie.imdbID)}
      key={movie.imdbID}
    >
      <img
        className={styles.listImage}
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <h3 className={styles.listTitle}>{movie.Title}</h3>
      <div className={styles.listInfo}>
        <p className={styles.listInfoItem}>
          <span>date</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
