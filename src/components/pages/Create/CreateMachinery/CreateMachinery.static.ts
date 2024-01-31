import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const API_CREATE_MACHINERY_URL = "http://localhost:8080/machinery";
export const API_CREATE_MACHINERY_METHOD = "POST";
export const API_CREATE_MACHINERY_HEADERS = {
  "Content-Type": "application/json",
};

export const API_CREATE_MACHINERY_FARM_URL = "http://localhost:8080/farm";
export const API_CREATE_MACHINERY_FARM_METHOD = "GET";

export const machinerySchema = z.object({
  brand: z.string().nonempty({ message: "Brand is required." }),
  model: z.string().nonempty({ message: "Model is required." }),
  identificationNumber: z
    .string()
    .nonempty({ message: "Identification number is required." }),
  farmId: z.string().uuid().nonempty({ message: "Farm is required." }),
});

export const machineryData = [
  {
    registerName: "brand",
    type: "text",
    placeholder: "Brand",
    errors: "brand",
    errorsMsg: "brand.message",
  },
  {
    registerName: "model",
    type: "text",
    placeholder: "Model",
    errors: "model",
    errorsMsg: "model.message",
  },
  {
    registerName: "identificationNumber",
    type: "text",
    placeholder: "Identification number",
    errors: "identificationNumber",
    errorsMsg: "identificationNumber.message",
  },
  {
    registerName: "farmId",
    type: "select",
    placeholder: "Select farm",
    errors: "farmId",
    errorsMsg: "farmId.message",
  },
];

export interface Farm {
  id: string;
  name: string;
  location: {
    coordinates: [number, number];
    type: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MachineryHandler extends FieldValues {
  brand: string;
  mode: string;
  identificationNumber: string;
  farmId: string;
}
