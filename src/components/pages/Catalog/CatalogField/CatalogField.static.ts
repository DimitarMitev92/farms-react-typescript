export const API_FIELD_URL = "http://localhost:8080/field";
export const API_FIELD_METHOD = "GET";

export const API_FIELD_SOIL_URL = "http://localhost:8080/soil";
export const API_FIELD_SOIL_METHOD = "GET";

export const API_FIELD_FARM_URL = "http://localhost:8080/farm";
export const API_FIELD_FARM_METHOD = "GET";

export interface FieldFromApi {
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
