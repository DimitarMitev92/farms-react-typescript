import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export interface User {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    rights: "OWNER" | "OPERATOR" | "VIEWER";
  };
  access_token: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user: User | null) => {
    setUser(user);
    if (user) {
      setItem("user", JSON.stringify(user));
    } else {
      removeItem("user");
    }
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser };
};
