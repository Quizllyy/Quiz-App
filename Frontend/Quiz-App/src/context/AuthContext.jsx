import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from sessionStorage on page load
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      console.log("Stored user in sessionStorage:", storedUser); // Debugging
  
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
        console.log("User state updated:", JSON.parse(storedUser)); // Debugging
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from sessionStorage:", error);
      setUser(null);
    }
  }, []);
  
  

  const signIn = (userData) => {
    setUser(userData); // ✅ Update state so Navbar re-renders
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
