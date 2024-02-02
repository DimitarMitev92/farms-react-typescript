import { UserDataFromApi } from "../static/interfaces";

export const rightsOfUser = (user: UserDataFromApi) => {
  if (user) {
    return user.user.rights;
  }
  throw new Error("No user login.");
};
