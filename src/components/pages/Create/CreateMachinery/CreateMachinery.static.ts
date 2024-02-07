import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const machinerySchema = z.object({
  brand: z.string().nonempty({ message: "Brand is required." }),
  model: z.string().nonempty({ message: "Model is required." }),
  identificationNumber: z
    .string()
    .nonempty({ message: "Identification number is required." }),
  farmId: z.string().nonempty({ message: "Farm is required." }),
});

export const machineryData = [
  {
    registerName: "brand",
    name: "Brand",
    type: "text",
    placeholder: "John Deere",
    errors: "brand",
    errorsMsg: "brand.message",
  },
  {
    registerName: "model",
    name: "Model",
    type: "text",
    placeholder: "9XR 640",
    errors: "model",
    errorsMsg: "model.message",
  },
  {
    registerName: "identificationNumber",
    name: "Identification Number",
    type: "text",
    placeholder: "123",
    errors: "identificationNumber",
    errorsMsg: "identificationNumber.message",
  },
  {
    registerName: "farmId",
    name: "Select Farm",
    type: "select",
    placeholder: "Select farm",
    errors: "farmId",
    errorsMsg: "farmId.message",
  },
];

export interface MachineryHandler extends FieldValues {
  brand: string;
  model: string;
  identificationNumber: string;
  farmId: string;
}
