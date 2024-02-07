import { auth } from "../../../static/endPoints";

export const publicHeaderData = [
  { name: "Register", to: auth.REGISTER },
  { name: "Login", to: auth.LOGIN },
];

export const privateHeaderDataOperator = [
  { name: "Catalog" },
  { name: "Create" },
  { name: "Reporting" },
  { name: "Logout", to: auth.LOGOUT },
];

export const privateHeaderDataOwner = [
  { name: "Dashboard", to: auth.DASHBOARD },
  { name: "Catalog" },
  { name: "Create" },
  { name: "Reporting" },
  { name: "Logout", to: auth.LOGOUT },
];

export const privateHeaderDataViewer = [
  { name: "Catalog" },
  { name: "Reporting" },
  { name: "Logout", to: auth.LOGOUT },
];
