import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const farmSchema = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  location: z.string().refine(
    (value) => {
      const coordinates = value.split(",").map(parseFloat);
      return (
        coordinates.length === 2 &&
        !isNaN(coordinates[0]) &&
        !isNaN(coordinates[1])
      );
    },
    {
      message:
        "Invalid location format. It should be two floats separated by a comma.",
    }
  ),
});

export const farmData = [
  {
    registerName: "name",
    type: "text",
    placeholder: "Name",
    errors: "name",
    errorsMsg: "name.message",
  },
  {
    registerName: "location",
    type: "text",
    placeholder: "Location",
    errors: "location",
    errorsMsg: "location.message",
  },
];

export interface FormFarmData {
  name: string;
  location: string;
}

export interface FarmObj {
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

export interface FarmHandler extends FieldValues {
  name: string;
  location: string | { type: string; coordinates: [number, number] };
}

export interface FarmDataFromApi {
  id: string;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}
