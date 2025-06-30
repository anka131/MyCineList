import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MovieProvider } from './MovieContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MovieProvider>
    <React.StrictMode>
     <App /> 
  </React.StrictMode>
  </MovieProvider>

);

