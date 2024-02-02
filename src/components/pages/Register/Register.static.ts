import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerData = [
  {
    registerName: "firstName",
    type: "text",
    placeholder: "First name",
    errors: "firstName",
    errorsMsg: "firstName.message",
  },

  {
    registerName: "lastName",
    type: "text",
    placeholder: "Last name",
    errors: "lastName",
    errorsMsg: "lastName.message",
  },
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

export interface FormRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RequestOptionsRegister {
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
