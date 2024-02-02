import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../Login/Login.static";
import { MachineryFromApi } from "./CatalogMachinery.static";

export const fetchMachinery = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(endpoint.MACHINERY, {
      method: method.GET,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch machinery. Status:  ${response.status}`);
    }

    const machineryData = await response.json();

    const updatedDataArray = await Promise.all(
      machineryData.map(async (data: MachineryFromApi) => {
        const responseFarm = await fetch(`${endpoint.FARM}/${data.farmId}`, {
          method: method.GET,
          headers: { Authorization: `Bearer ${user.access_token}` },
        });

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
