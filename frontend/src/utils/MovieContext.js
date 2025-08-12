import { createContext, useEffect, useState } from "react";
import {useMovies} from './useMovies';
import { useAuth } from "./useAuth";

import {getFavorites, addFavorite, deleteFavorite} from './api';

export const MovieContext = createContext();


export const MovieProvider = function({ children }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

 const {movies,isLoading, error} = useMovies(query);
 const[watched, setWatched] = useState([]);
 const {token} = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!token) return;
      
      try {
        const { data } = await getFavorites(token);
        setWatched(data || []);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };
    
    loadFavorites();
  }, [token]);

  function handleSelectMovie(id){
    setSelectedId((prev) => id === prev ? null : id);
  }
  function handleCloseMovie(){
    setSelectedId(null);
  }

 const handleAddWatched = async (movie) => {
    try {
      if (watched.some(m => m.imdbID === movie.imdbID)) {
        console.warn("Movie already in watchlist");
        return;
      }

      const { data } = await addFavorite(
        {
          imdbID: movie.imdbID,
          title: movie.title,
          poster: movie.poster === "N/A" ? null : movie.poster,
      imdbRating: movie.imdbRating ? Number(movie.imdbRating) : null,
      userRating: movie.userRating ? Number(movie.userRating) : null,
      runtime: movie.runtime ? Number(movie.runtime) : null
        }, 
        token
      );
      
      setWatched(data);
    } catch (err) {
      console.error("Failed to add movie:", err.response?.data || err.message);
      throw err;
    }
  };

const handleDeleteWatched = async (imdbID) => {
  try {

    if (!imdbID) {
      throw new Error("No movie ID provided");
    }


    setWatched(prev => prev.filter(movie => movie.imdbID !== imdbID));


    const { data } = await deleteFavorite(imdbID, token);
    
  
    setWatched(data);
  } catch (err) {
    console.error("Delete failed:", {
      error: err.response?.data || err.message,
      movieId: imdbID
    });
    

    const { data } = await getFavorites(token);
    setWatched(data);
    
    throw err;
  }
};
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