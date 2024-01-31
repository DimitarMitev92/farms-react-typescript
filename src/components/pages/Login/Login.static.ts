import { z } from "zod";

export const API_LOGIN_URL = "http://localhost:8080/auth/login";
export const API_LOGIN_METHOD = "POST";
export const API_LOGIN_HEADERS = { "Content-Type": "application/json" };

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginData = [
  {
    registerName: "email",
    type: "email",
    placeholder: "Email",
    errors: "email",
    errorsMsg: "email.message",
  },
  {
    registerName: "password",
    type: "password",
    placeholder: "Password",
    errors: "password",
    errorsMsg: "password.message",
  },
];

export interface FormLoginData {
  email: string;
  password: string;
}

export interface RequestOptionsLogin {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface UserDataFromApi {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    rights: "OWNER" | "OPERATOR" | "VIEWER";
  };
  access_token: string;
}
