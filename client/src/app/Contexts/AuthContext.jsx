'use client';
import { createContext, useContext, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
  });

  // Add request interceptor to include token in all requests
  api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Fetch user data on mount and when token changes
  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await api.get('/users/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          Cookies.remove('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
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
      // Return a more descriptive error message
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.message || 'Login failed. Please check your credentials and try again.' 
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
      // Return a more descriptive error message
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 