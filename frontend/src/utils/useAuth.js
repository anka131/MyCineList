import { createContext, useState, useContext } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

   const login = async (e, email, password) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://mycinelist-00b6.onrender.com/api/users/login', { email, password });
    
    // Verify token exists in response
    console.log('Login response:', res.data); // Check if token exists
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      console.log('Token stored:', localStorage.getItem('token')); // Verify storage
    } else {
      throw new Error('No token received');
    }
    
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
  }
};


    const register = async (e, username, email, password) => {
        e.preventDefault();
  try {
    const res = await axios.post('https://mycinelist-00b6.onrender.com/api/users/register', {username, email, password });
    
    // Verify token exists in response
    console.log('Register response:', res.data); // Check if token exists
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      console.log('Token stored:', localStorage.getItem('token')); // Verify storage
    } else {
      throw new Error('No token received');
    }
    
  } catch (err) {
    console.error('Register failed:', err.response?.data || err.message);
  }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);