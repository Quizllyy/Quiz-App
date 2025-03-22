import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialUser = null;

  try {
    const storedUser = sessionStorage.getItem("user");
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    initialUser = null;
  }

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Define logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Ensure useAuth() provides logout
export const useAuth = () => {
  return useContext(AuthContext);
};
