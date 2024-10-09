import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the IDMeContext
const IDMeContext = createContext();

// Custom hook to use the IDMeContext
export const useIDMeAuth = () => useContext(IDMeContext);

// IDMeProvider component to wrap around the app
export const IDMeProvider = ({ children }) => {
  // Simulate the auth state with useState
  const [authState, setAuthState] = useState({
    isAuthenticated: false, // Whether the user is authenticated
    user: null, // Holds the user info if logged in
  });

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth-check", {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          setAuthState({
            isAuthenticated: true,
            user: response.data.user,
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  //login
  const login = (userInfo) => {
    window.location.href = "http://localhost:8000/auth/idme"; // Redirect to the backend's login route
  };

  // logout
  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", {
        withCredentials: true,
      });
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const idMeAuth = {
    getAuthState: () => authState, // Get the current auth state
    login,
    logout,
  };

  return (
    <IDMeContext.Provider value={{ authState, idMeAuth }}>
      {children}
    </IDMeContext.Provider>
  );
};
