import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const fieldSchema = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  boundaries: z.string().nonempty({ message: "Boundaries is required." }),
  soilId: z.string().nonempty({ message: "Soil is required." }),
  farmId: z.string().nonempty({ message: "Farm is required" }),
});

export const fieldData = [
  {
    registerName: "name",
    type: "text",
    placeholder: "Name",
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
  {
    registerName: "boundaries",
    type: "text",
    placeholder: "Boundaries",
    errors: "boundaries",
    errorMsg: "boundaries.message",
  },
];

export interface FieldHandler extends FieldValues {
  name: string;
  location: string | { type: string; coordinates: number[][][] };
}
