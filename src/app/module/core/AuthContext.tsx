import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  iphone: string;
  name: string;
  role?: string;
  tarjeta?: string;
}

interface AuthUser {
  user: UserType;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
}

const AuthContex = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

 const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setuserData] = useState<AuthUser | null>(null);

  const login = (userData: UserType, token: string) => {
    const newUser: AuthUser = { user: userData, token };
    setuserData(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setuserData(null);
    localStorage.removeItem("authData");
  };
  
  useEffect(() => {
    const initializeAuth = (): void => {
      const storedData = localStorage.getItem("authData");
      if (!storedData) return;
      
      try {
        const parsedData: AuthUser = JSON.parse(storedData);
        // Validación básica de estructura
        if (parsedData?.user && parsedData?.token) {
          setuserData(parsedData);
        } else {
          localStorage.removeItem("authData");
        }
      } catch (error) {
        console.error("Error al analizar datos de autenticación:", error);
        localStorage.removeItem("authData");
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContex.Provider value={{ user, login, logout }}>
      {children}
    </AuthContex.Provider>
  );
};

const useAuth = () => useContext(AuthContex);
