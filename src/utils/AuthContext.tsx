import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  iphone: string;
  name: string;
  role?: string;
  tarrjeta?: string;
}

interface User {
  user: UserType;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: UserType, token: string) => void;
  logout: () => void;
}

const AuthContex = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setuserData] = useState<User | null>(null);

  const login = (user: UserType, token: string) => {
    const newUser = { user, token };
    setuserData(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setuserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setuserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <AuthContex.Provider value={{ user, login, logout }}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
