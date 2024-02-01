import { UserDataFromApi } from "../../Login/Login.static";
import { API_FARM_METHOD, API_FARM_URL } from "./CatalogFarm.static";

export const fetchFarms = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_FARM_URL, {
      method: API_FARM_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch farms. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching farms:", error);
    throw error;
  }
};
