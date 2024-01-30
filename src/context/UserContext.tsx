import { createContext } from "react";
import { UserDataFromApi } from "../components/pages/Login/Login";

export const UserContext = createContext<{
  user: UserDataFromApi | null;
  setUser: React.Dispatch<React.SetStateAction<UserDataFromApi | null>>;
}>({ user: null, setUser: () => {} });
