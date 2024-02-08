import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerData = [
  {
    name: "First Name",
    registerName: "firstName",
    type: "text",
    placeholder: "Dimitar",
    errors: "firstName",
    errorsMsg: "firstName.message",
  },

  {
    name: "Last Name",
    registerName: "lastName",
    type: "text",
    placeholder: "Mitev",
    errors: "lastName",
    errorsMsg: "lastName.message",
  },
  {
    name: "Email",
    registerName: "email",
    type: "email",
    placeholder: "d.mitev@email.com",
    errors: "email",
    errorsMsg: "email.message",
  },
  {
    name: "Password",
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
