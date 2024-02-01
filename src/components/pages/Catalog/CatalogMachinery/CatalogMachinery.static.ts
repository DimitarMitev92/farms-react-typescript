export const API_MACHINERY_URL = "http://localhost:8080/machinery";
export const API_MACHINERY_METHOD = "GET";

export const API_MACHINERY_FARM_URL = "http://localhost:8080/farm";
export const API_CREATE_MACHINERY_FARM_METHOD = "GET";

export interface MachineryFromApi {
  id: string;
  farmId: string;
  brand: string;
  model: string;
  identificationNumber: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  farm: { name: string };
}
