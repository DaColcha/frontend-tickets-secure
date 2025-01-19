'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserData {
  id: string;
  rol: string;
  sitio: string;
  usuario: string;
  token: string;
}

interface AuthContextProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const readCookie = () => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_data='));
    if (cookie) {
      const userData = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      setUser(userData);
      console.log('Cookie leída:', userData);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};