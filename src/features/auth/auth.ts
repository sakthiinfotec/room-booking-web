import { createContext, useContext } from "react";
import { User } from './../../app/types/index';
import { login } from "../booking/BookingAPI";
import { message } from "antd";

export interface AuthContextType {
  user: User;
  signin: (userId: string, callback: (user: User) => void) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

function useAuth() {
  return useContext(AuthContext);
}

/**
 * An auth provider.
 */
const authProvider = {
  isAuthenticated: false,
  async signin(userId: string, callback: (user: User) => void) {
    await login({ userId: userId }).then(resp => {
      if (resp.error) {
        message.error(resp.error);
      } else {
        authProvider.isAuthenticated = true;
        callback(resp);
      }
    })
  },
  signout(callback: VoidFunction) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProvider, useAuth, AuthContext };
