import { FieldValues } from "react-hook-form";

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
