import { z } from "zod";

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
