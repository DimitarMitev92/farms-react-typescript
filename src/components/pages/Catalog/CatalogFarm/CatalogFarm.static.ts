import { Farm } from "./CatalogFarmCard/CatalogFarmCard.static";

export interface FarmCatalogProps {
  farms: Farm[];
}

export interface ApiError {
  message: string;
}
