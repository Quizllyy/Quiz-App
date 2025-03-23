import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialUser = null;

  try {
    const storedUser = sessionStorage.getItem("user");

    // ✅ Prevent parsing "undefined" and invalid values
    if (storedUser && storedUser !== "undefined") {
      initialUser = JSON.parse(storedUser);
    } else {
      initialUser = null;
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
    initialUser = null;
    sessionStorage.removeItem("user"); // ✅ Remove corrupted data
  }

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Logout function
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

// ✅ Provide a safe useAuth() hook
export const useAuth = () => {
  return useContext(AuthContext);
};
