import { z } from "zod";

export const API_UPDATE_FARM_URL = "http://localhost:8080/farm";
export const API_UPDATE_FARM_METHOD_GET = "GET";
export const API_UPDATE_FARM_METHOD_PATCH = "PATCH";
export const API_UPDATE_FARM_HEADER = {
  "Content-Type": "application/json",
};

export const farmSchema = z.object({
  name: z
    .string()
    .nullable()
    .refine((value) => value === null || value.trim() !== "", {
      message: "Name cannot be an empty string.",
    }),
  location: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (value === null || value.trim() === "") return true;
        const coordinates = value.split(",").map(parseFloat);
        return (
          coordinates.length === 2 &&
          !isNaN(coordinates[0]) &&
          !isNaN(coordinates[1])
        );
      },
      {
        message:
          "Invalid location format. It should be two floats separated by a comma, or null or an empty string.",
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

export interface FarmUpdate {
  name: string;
  location: string | { type: string; coordinates: [number, number] };
}
