'use client';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
  });

  const login = async (email, password) => {
    try {
      // Make sure email and password are strings
      const emailStr = typeof email === 'string' ? email : email?.email;
      const passwordStr = typeof password === 'string' ? password : password?.password;

      console.log('Attempting login with:', { email: emailStr, password: passwordStr });
      
      if (!emailStr || !passwordStr) {
        return { 
          success: false, 
          error: 'Email and password are required' 
        };
      }

      const response = await api.post('/users/login', { 
        email: emailStr.trim(),
        password: passwordStr.trim()
      });
      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.token && response.data.user) {
        const { token, user } = response.data;
        Cookies.set('token', token);
        setUser(user);
        router.push('/');
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid response from server' 
        };
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (fullname, email, password) => {
    try {
      console.log('Attempting registration with:', { fullname, email, password });
      
      if (!fullname || !email || !password) {
        return { 
          success: false, 
          error: 'All fields are required' 
        };
      }

      const response = await api.post('/users/register', { 
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim()
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data && response.data.token && response.data.user) {
        const { token, user } = response.data;
        Cookies.set('token', token);
        setUser(user);
        router.push('/');
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid response from server' 
        };
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 