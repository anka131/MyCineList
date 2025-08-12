import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api' 
});

export const getFavorites = (token) => {
  return API.get('/favorites', {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const addFavorite = (movie, token) => {
  return API.post('/favorites', movie, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteFavorite = (imdbID, token) => {
  return API.delete(`/favorites/${imdbID}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};



// Add request interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token available');
  }
  
  return config;
});