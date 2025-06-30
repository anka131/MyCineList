import { MovieContext } from "../MovieContext";
import { useContext } from "react";
import styles from "./NavBar.module.css"
function NumResults(){
  const {movies} = useContext(MovieContext);
  return(
    <p className={styles.numResults}>
          Found <strong>{movies.length}</strong> results
        </p>
  )
}
export default NumResults;