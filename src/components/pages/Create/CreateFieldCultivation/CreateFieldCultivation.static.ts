import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const API_CREATE_FIELD_CULTIVATION_URL =
  "http://localhost:8080/field-cultivation";
export const API_CREATE_FIELD_CULTIVATION_METHOD = "POST";
export const API_CREATE_FIELD_CULTIVATION_HEADERS = {
  "Content-Type": "application/json",
};

export const API_CREATE_FIELD_CULTIVATION_CULTIVATION_URL =
  "http://localhost:8080/cultivation";
export const API_CREATE_FIELD_CULTIVATION_CULTIVATION_METHOD = "GET";

export const API_CREATE_FIELD_CULTIVATION_MACHINERY_URL =
  "http://localhost:8080/machinery";
export const API_CREATE_FIELD_CULTIVATION_MACHINERY_METHOD = "GET";

export const API_CREATE_FIELD_CULTIVATION_CROP_URL =
  "http://localhost:8080/crop";
export const API_CREATE_FIELD_CULTIVATION_CROP_METHOD = "GET";

export const API_CREATE_FIELD_CULTIVATION_FIELD_URL =
  "http://localhost:8080/field";
export const API_CREATE_FIELD_CULTIVATION_FIELD_METHOD = "GET";

export const API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_URL =
  "http://localhost:8080/growing-process";
export const API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_METHOD = "POST";
export const API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_HEADERS = {
  "Content-Type": "application/json",
};

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
