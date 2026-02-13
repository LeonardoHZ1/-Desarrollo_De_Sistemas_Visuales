import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/auth/verify");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const signin = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);
      setUser(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const logout = () => {
    axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};