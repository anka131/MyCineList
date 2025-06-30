import {useState, useEffect} from 'react';
export function useMovies(query, callback){
 
      const [movies, setMovies] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");
      const KEY = "63ec1dc6"; 

    
      useEffect(function(){
    const controler = new AbortController();
    
    async function fetchMovies() {  
      try{
        setIsLoading(true);
        setError("");
     const res =  await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controler.signal});
     if(!res.ok) throw new Error("Something went wrong with fetching movies");
    
     const data = await res.json();
     if(data.Response === "False")throw new Error("Movie not found");
     setMovies(data.Search);
     setError("");
    }catch(err){
      console.log(err.message);
      if(err.name !== "AbortError") setError(err.message);
    }finally{
      setIsLoading(false);
    }
    }
    if(query.length < 3){
      setMovies([]);
      setError("");
      return; 
    }
    fetchMovies();
    
    return function(){
      controler.abort();
    }
      }, [query]);
      return {movies, isLoading, error};
}