import { useState } from "react";
import AuthContext from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cravix-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("cravix-token");
  });

  const login = (userData, tokenData) => {
    localStorage.setItem(
      "cravix-user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "cravix-token",
      tokenData
    );

    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("cravix-user");
    localStorage.removeItem("cravix-token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}