import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_CREATE_MACHINERY_FARM_METHOD,
  API_MACHINERY_FARM_URL,
  API_MACHINERY_METHOD,
  API_MACHINERY_URL,
  MachineryFromApi,
} from "./CatalogMachinery.static";

export const fetchMachinery = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_MACHINERY_URL, {
      method: API_MACHINERY_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch machinery. Status:  ${response.status}`);
    }

    const machineryData = await response.json();

    const updatedDataArray = await Promise.all(
      machineryData.map(async (data: MachineryFromApi) => {
        const responseFarm = await fetch(
          `${API_MACHINERY_FARM_URL}/${data.farmId}`,
          {
            method: API_CREATE_MACHINERY_FARM_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseFarm.ok) {
          throw new Error(
            `Failed to fetch farm. Status: ${responseFarm.status}`
          );
        }

        const farmData = await responseFarm.json();

        return {
          ...data,
          farm: { name: farmData.name },
        };
      })
    );
    return updatedDataArray;
  } catch (error) {
    console.error(`Error fetching machinery:`, error);
  }
};
