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
