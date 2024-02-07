import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email().nonempty({ message: "Email is required." }),
  firstName: z.string().nonempty({ message: "First name is required." }),
  lastName: z.string().nonempty({ message: "Last name is required." }),
  rights: z.string().nonempty({ message: "Rights is required." }),
});

export const userData = [
  {
    registerName: "email",
    type: "email",
    placeholder: "Email",
    errors: "email",
    errorsMsg: "email.message",
  },
  {
    registerName: "firstName",
    type: "text",
    placeholder: "First Name",
    errors: "firstName",
    errorsMsg: "firstName.message",
  },
  {
    registerName: "lastName",
    type: "text",
    placeholder: "Last Name",
    errors: "lastName",
    errorsMsg: "lastName.message",
  },
  {
    registerName: "rights",
    type: "select",
    placeholder: "Select rights",
    errors: "rights",
    errorsMsg: "rights.message",
  },
];

export interface UserHandler extends FieldValues {
  email: string;
  firstName: string;
  lastName: string;
  rights: string;
}
