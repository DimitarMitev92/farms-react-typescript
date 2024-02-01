import { UserDataFromApi } from "../components/pages/Login/Login.static";

export const rightsOfUser = (user: UserDataFromApi) => {
  if (user) {
    return user.user.rights;
  }
  throw new Error("No user login.");
};
