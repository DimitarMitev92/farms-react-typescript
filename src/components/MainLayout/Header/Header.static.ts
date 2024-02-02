import { auth } from "../../../static/endPoints";

export const publicHeaderData = [
  { name: "Register", to: auth.REGISTER },
  { name: "Login", to: auth.LOGIN },
];

export const privateHeaderData = [
  { name: "Catalog" },
  { name: "Create" },
  { name: "Reporting" },
  { name: "Logout", to: auth.LOGOUT },
];
