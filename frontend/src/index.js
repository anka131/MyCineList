import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './utils/useAuth';
import { MovieProvider } from './utils/MovieContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <AuthProvider>
    <MovieProvider>
     <App /> 
    </MovieProvider>
  </AuthProvider></BrowserRouter>

  </React.StrictMode>



);

