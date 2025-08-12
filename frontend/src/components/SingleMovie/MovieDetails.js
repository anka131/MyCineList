import { useKey } from "../../utils/useKey"
import Loader from "../Loader";
import StarRating from "../StarRating";
import { MovieContext } from "../../utils/MovieContext";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./MovieDetails.module.css";

function MovieDetails(){
  const{selectedId, handleCloseMovie,handleAddWatched, watched} = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading]= useState(false);
  const [userRating, setUserRating] = useState('');
  
const KEY = "63ec1dc6"; 
  const countRef = useRef(0);

  useEffect(
    function(){


   if(userRating) countRef.current = countRef.current++;

  }, [userRating]
);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
  

  const{
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot:plot,
    Released: released,
    Genre: genre,
    Director: director,
    Actors: actors,
  } = movie;

  function handleAdd(){
    const newWatchedMovie= {
      imdbID:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    }
    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  };



  useKey('Escape', handleCloseMovie);



useEffect(function(){
  async function getMovieDetails(){
    setIsLoading(true);
    const res =  await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
    const data = await res.json();
  setMovie(data);
  setIsLoading(false);
  };
  getMovieDetails();
  
}, [selectedId])

useEffect(function(){
  if(!title) return;
  document.title = `Movie | ${title}`;

  return function(){
    document.title = "usePopcorn";
  }
},
 [title])

return <div className={styles.details}>
  {isLoading ? <Loader /> : 
  <> 
   <header>
  <button className={styles.btnBack} onClick={handleCloseMovie}>⬅️</button>
    <img src={poster} alt={`Poster of ${movie} movie`} />
    <div className={styles.detailsOverview}>
      <h2>{title}</h2>
      <p>{released} &bull; {runtime}</p>
      <p>{genre}</p>
      <p><span>⭐ </span>{imdbRating} IMDB rating</p>

    </div>
  </header>
  <section>
 <div className={styles.rating}> 
   {!isWatched ? <>
    <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
   
   { userRating > 0 && <button className={styles.btnAdd} onClick={handleAdd}>+ Add to list</button> } </> 
   : <p>You rated this movie {watchedUserRating} <span>⭐</span></p> 
   }

    </div>
    <p><em>{plot}</em></p>
    <p>Starring {actors}</p>
    <p>Directed by {director}</p>
  </section>  
  </>
  
}


    </div>
}
export default MovieDetails