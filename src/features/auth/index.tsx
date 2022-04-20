import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { KEY_AUTH_DATA, LOGIN_PAGE } from "../../app/config";
import { User } from "../../app/types";
import { AuthContext, authProvider, useAuth } from "./auth";

/**
 * Provider of auth data, will be consumed by RequireAuth, NewBooking via useAuth()
 * @param children
 * @returns
 */
function AuthProvider({ children }: { children: React.ReactNode }) {
  let userData: User | null = null;
  const userStr = localStorage.getItem(KEY_AUTH_DATA);
  if (userStr && userStr.length) {
    userData = JSON.parse(userStr);
  }
  const [user, setUser] = useState<User>(userData!);

  const signin = (userId: string, callback: (user: User) => void) => {
    return authProvider.signin(userId, (authData: User) => {
      setUser(authData);
      localStorage.setItem(KEY_AUTH_DATA, JSON.stringify(authData));
      callback(authData);
    });
  };

  const signout = (callback: VoidFunction) => {
    return authProvider.signout(() => {
      localStorage.removeItem(KEY_AUTH_DATA);
      setUser(null!);
      callback();
    });
  };

  const value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Gives protected access to components wrapped by this.
 * @param children
 * @returns
 */
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }
  return children;
}

export { AuthProvider, RequireAuth };
