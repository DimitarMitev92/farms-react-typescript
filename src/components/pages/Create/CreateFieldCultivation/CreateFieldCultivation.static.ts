import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const fieldCultivationSchema = z.object({
  cultivationId: z
    .string()
    .uuid()
    .nonempty({ message: "Cultivation is required." }),
  machineryId: z
    .string()
    .uuid()
    .nonempty({ message: "Machinery is required." }),
  cropId: z.string().uuid().nonempty({ message: "Crop is required." }),
  fieldId: z.string().uuid().nonempty({ message: "Field is required." }),
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
    placeholder: "Select machinery",
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

export interface Cultivation {
  id: string;
  cultivation: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Machinery {
  id: string;
  farmId: string;
  brand: string;
  model: string;
  identificationNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Crop {
  id: string;
  crop: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Field {
  id: string;
  name: string;
  boundaries: {
    coordinates: number[][][];
    type: string;
  };
  soilId: string;
  farmId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FieldOption extends Field {
  value: string;
  label: string;
}

export interface FieldCultivationHandler extends FieldValues {
  cultivationId: string;
  machineryId: string;
  growingProcessId: string;
  startingDate: Date;
}

export interface GrowingProcessHandler {
  cropId: string;
  fieldId: string;
}
