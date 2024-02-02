import { FieldValues } from "react-hook-form";

export const API_UPDATE_FIELD_URL = "http://localhost:8080/field";
export const API_UPDATE_FIELD_METHOD_GET = "GET";
export const API_UPDATE_FIELD_METHOD_PATCH = "PATCH";
export const API_UPDATE_FIELD_HEADERS = {
  "Content-Type": "application/json",
};

export interface RequestOptionsField {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface FieldUpdateHandler extends FieldValues {
  name: string;
  boundaries:
    | string
    | {
        type: string;
        coordinates: number[][][];
      };
  soilId: string;
  farmId: string;
}
