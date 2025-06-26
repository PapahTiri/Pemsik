import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Ambil user dari localStorage saat pertama kali load
useEffect(() => {
  try {
    const stored = localStorage.getItem("user");
    
    if (stored && stored !== "undefined") {
      setUser(JSON.parse(stored));
    } else {
      localStorage.removeItem("user"); 
    }
  } catch (err) {
    console.warn("⚠️ User data corrupt in localStorage:", err);
    localStorage.removeItem("user");
  }
}, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const hasPermission = (perm) => {
    return user?.permission?.includes(perm);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
