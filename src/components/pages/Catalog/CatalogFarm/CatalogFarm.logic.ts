import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../Login/Login.static";

export const fetchFarms = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(endpoint.FARM, {
      method: method.GET,
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
