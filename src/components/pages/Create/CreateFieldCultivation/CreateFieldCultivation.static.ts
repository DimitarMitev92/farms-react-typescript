import { FieldValues } from "react-hook-form";
import { z } from "zod";
import { Field } from "../../../../static/interfaces";

export const fieldCultivationSchema = z.object({
  cultivationId: z.string().nonempty({ message: "Cultivation is required." }),
  machineryId: z.string().nonempty({ message: "Machinery is required." }),
  cropId: z.string().nonempty({ message: "Crop is required." }),
  fieldId: z.string().nonempty({ message: "Field is required." }),
  startingDate: z.string().nullable(),
});

export const fieldCultivationData = [
  {
    registerName: "cultivationId",
    type: "select",
    placeholder: "Select cultivation",
    errors: "cultivationId",
    errorsMsg: "cultivationId.message",
  },
  {
    registerName: "machineryId",
    type: "select",
    placeholder: "Select machinery id",
    errors: "machineryId",
    errorsMsg: "machineryId.message",
  },
  {
    registerName: "cropId",
    type: "select",
    placeholder: "Select crop",
    errors: "cropId",
    errorsMsg: "cropId.message",
  },
  {
    registerName: "fieldId",
    type: "select",
    placeholder: "Select field",
    errors: "fieldId",
    errorsMsg: "fieldId.message",
  },
  {
    registerName: "startingDate",
    type: "date",
    placeholder: "Select date",
    errors: "startingDate",
    errorsMsg: "startingDate.message",
  },
];

export interface FieldOption extends Field {
  value: string;
  label: string;
}

export interface FieldCultivationForRes {
  growingProcessId: string;
  cultivationId: string;
  machineryId: string;
  startingDate: Date;
}

export interface FieldCultivationHandler extends FieldValues {
  cultivationId: string;
  machineryId: string;
  growingProcessId: string;
  startingDate: Date;
}
