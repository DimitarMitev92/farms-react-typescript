export const API_FIELD_CULTIVATION_URL =
  "http://localhost:8080/field-cultivation";
export const API_FIELD_CULTIVATION_METHOD = "GET";

export const API_FIELD_CULTIVATION_CULTIVATION_URL =
  "http://localhost:8080/cultivation";
export const API_FIELD_CULTIVATION_CULTIVATION_METHOD = "GET";

export const API_FIELD_CULTIVATION_MACHINERY_URL =
  "http://localhost:8080/machinery";
export const API_FIELD_CULTIVATION_MACHINERY_METHOD = "GET";

export const API_FIELD_CULTIVATION_GROWING_PROCESS_URL =
  "http://localhost:8080/growing-process";
export const API_FIELD_CULTIVATION_GROWING_PROCESS_METHOD = "GET";

export const API_FIELD_CULTIVATION_CROP_URL = "http://localhost:8080/crop";
export const API_FIELD_CULTIVATION_CROP_METHOD = "GET";

export const API_FIELD_CULTIVATION_FIELD_URL = "http://localhost:8080/field";
export const API_FIELD_CULTIVATION_FIELD_METHOD = "GET";

export interface FieldCultivationFroApi {
  id: string;
  cultivationId: string;
  machineryId: string;
  growingProcessId: string;
  startingDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  cultivation: { cultivation: string };
  machinery: { identificationNumber: string };
  crop: { crop: string };
  field: { name: string };
}
