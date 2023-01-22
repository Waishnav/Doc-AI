import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`
        }
        const res = await axios.get('http://localhost:3001/users', {headers});
        if (!user) {
          setUser(res.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []); 

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3001/users/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error(error);
    }
    console.log('logging in')
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:3001/users/register', { name, email, password });
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.error(error);
    }
    console.log('registering')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
