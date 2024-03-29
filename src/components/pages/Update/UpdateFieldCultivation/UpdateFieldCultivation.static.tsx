import { z } from "zod";
import { FieldValues } from "react-hook-form";

export const fieldCultivationSchema = z.object({
  cultivationId: z.string(),
  machineryId: z.string(),
  cropId: z.string(),
  fieldId: z.string(),
  startingDate: z.string().nullable(),
});

export const fieldCultivationData = [
  {
    name: "Field",
    registerName: "fieldId",
    type: "select",
    placeholder: "Select field",
    errors: "fieldId",
    errorsMsg: "fieldId.message",
  },
  {
    name: "Machinery",
    registerName: "machineryId",
    type: "select",
    placeholder: "Select machinery",
    errors: "machineryId",
    errorsMsg: "machineryId.message",
  },
  {
    name: "Cultivation",
    registerName: "cultivationId",
    type: "select",
    placeholder: "Select cultivation",
    errors: "cultivationId",
    errorsMsg: "cultivationId.message",
  },

  {
    name: "Crop",
    registerName: "cropId",
    type: "select",
    placeholder: "Select crop",
    errors: "cropId",
    errorsMsg: "cropId.message",
  },

  {
    name: "Starting date",
    registerName: "startingDate",
    type: "date",
    placeholder: "Select date",
    errors: "startingDate",
    errorsMsg: "startingDate.message",
  },
];

export interface FieldCultivationUpdateHandler extends FieldValues {
  cultivationId: string;
  machineryId: string;
  cropId: string;
  fieldId: string;
  startingDate: string | null;
}

export interface FieldCultivationFromForm {
  cultivationId: string;
  machineryId: string;
  cropId: string;
  fieldId: string;
  startingDate: string | null;
}
