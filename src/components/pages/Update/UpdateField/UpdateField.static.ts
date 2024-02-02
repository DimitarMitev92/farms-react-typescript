import { FieldValues } from "react-hook-form";

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
