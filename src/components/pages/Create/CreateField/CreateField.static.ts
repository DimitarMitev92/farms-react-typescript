import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const fieldSchema = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  boundaries: z.string().nonempty({ message: "Boundaries are required." }),
  soilId: z.string().nonempty({ message: "Soil is required." }),
  farmId: z.string().nonempty({ message: "Farm is required" }),
});

export const fieldData = [
  {
    registerName: "name",
    name: "Name",
    type: "text",
    placeholder: "Field 1",
    errors: "name",
    errorsMsg: "name.message",
  },
  {
    registerName: "soilId",
    type: "select",
    placeholder: "Select soil",
    errors: "soilId",
    errorsMsg: "soilId.message",
  },
  {
    registerName: "farmId",
    type: "select",
    placeholder: "Select Farm",
    errors: "farmId",
    errorsMsg: "farmId.message",
  },
];

export interface FieldHandler extends FieldValues {
  name: string;
  location: string | { type: string; coordinates: number[][][] };
}
