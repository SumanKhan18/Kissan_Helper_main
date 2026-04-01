import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import API from '../api.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialising, setInitialising] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminProfile');
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await API.get('/profile');
      if (data?.admin) {
        setUser(data.admin);
        localStorage.setItem('adminProfile', JSON.stringify(data.admin));
      }
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession]);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const storedAdmin = localStorage.getItem('adminProfile');
        if (storedAdmin) {
          setUser(JSON.parse(storedAdmin));
        }
        const token = localStorage.getItem('adminToken');
        if (token) {
          await fetchProfile();
        }
      } finally {
        setInitialising(false);
      }
    };
    bootstrap();
  }, [fetchProfile]);

  const login = useCallback(
    async (email, password) => {
      const response = await API.post('/login', { email, password });
      if (response?.data?.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminProfile', JSON.stringify(response.data.admin));
        setUser(response.data.admin);
      }
      return response.data;
    },
    []
  );

  const register = useCallback(async (payload) => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (!formData.has('amount')) {
      formData.append('amount', '499');
    }

    const response = await API.post('/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response?.data?.success) {
      if (response.data.admin?.status === 'success') {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminProfile', JSON.stringify(response.data.admin));
        setUser(response.data.admin);
      } else {
        clearSession();
      }
    }

    return response.data;
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      await API.post('/logout');
    } catch (error) {
      // swallow
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      loading: initialising,
      login,
      register,
      logout,
      fetchProfile,
      isAuthenticated: !!user,
    }),
    [fetchProfile, initialising, login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
