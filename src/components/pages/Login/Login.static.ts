import { z } from "zod";

export const loginChangePasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
  compareNewPassword: z.string().min(6).optional(),
});

export const loginData = [
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

export const changePasswordLoginData = [
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
  {
    name: "New Password",
    registerName: "newPassword",
    type: "password",
    placeholder: "Password",
    errors: "newPassword",
    errorsMsg: "newPassword.message",
  },
  {
    name: "Confirm New Password",
    registerName: "compareNewPassword",
    type: "password",
    placeholder: "Password",
    errors: "compareNewPassword",
    errorsMsg: "compareNewPassword.message",
  },
];

export interface FormLoginData {
  email: string;
  password?: string;
  newPassword?: string;
  oldPassword?: string;
  compareNewPassword?: string;
}
