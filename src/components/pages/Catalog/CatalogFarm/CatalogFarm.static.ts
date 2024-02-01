import { Farm } from "./CatalogFarmCard/CatalogFarmCard.static";

export const API_FARM_URL = "http://localhost:8080/farm";
export const API_FARM_METHOD = "GET";

export interface FarmCatalogProps {
  farms: Farm[];
}

export interface ApiError {
  message: string;
}
