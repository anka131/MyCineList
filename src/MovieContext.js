import { createContext, useState } from "react";

import {useLocalStorageState} from './utils/useLocalStorageState';
import {useMovies} from './utils/useMovies';

export const MovieContext = createContext();


export const MovieProvider = function({ children }) {
      const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // }); 
 const {movies, isLoading, error} = useMovies(query);
 const[watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id){
    setSelectedId(selectedId => id === selectedId ? null : id);
  }
  function handleCloseMovie(){
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched => [...watched, movie]);
  }
  function handleDeleteWatched(id){
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id));
  }
  return(
    <MovieContext.Provider value={({
        query,
        setQuery,
        selectedId,
        setSelectedId,
        movies,
        isLoading,
        error,
        watched,
        handleSelectMovie,
        handleCloseMovie,
        handleAddWatched,
        handleDeleteWatched,
    })}>
        {children}
    </MovieContext.Provider>
  )
}