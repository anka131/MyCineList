import { useRef } from "react";
import { useKey } from "../utils/useKey";
import { MovieContext } from "../MovieContext";
import { useContext } from "react";
import styles from "./NavBar.module.css"

function SearchBar(){
  const {query, setQuery} = useContext(MovieContext);
 const inputEl = useRef(null);


 useKey('Enter', function(){
    if(document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery("");
 });


  return(
    <input
    className={styles.search}
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
  )
}
export default SearchBar;
