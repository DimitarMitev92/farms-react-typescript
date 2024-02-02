import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../Login/Login.static";
import { FieldFromApi } from "./CatalogField.static";

export const fetchFields = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(endpoint.FIELD, {
      method: method.GET,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch farms. Status: ${response.status}`);
    }

    const dataArray = await response.json();

    const updatedDataArray = await Promise.all(
      dataArray.map(async (data: FieldFromApi) => {
        const responseSoil = await fetch(`${endpoint.SOIL}/${data.soilId}`, {
          method: method.GET,
          headers: { Authorization: `Bearer ${user.access_token}` },
        });

        if (!responseSoil.ok) {
          throw new Error(
            `Failed to fetch soil. Status: ${responseSoil.status}`
          );
        }

        const soilData = await responseSoil.json();

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
          soil: { soil: soilData.soil },
        };
      })
    );
    return updatedDataArray;
  } catch (error) {
    console.error("Error fetching farms:", error);
    throw error;
  }
};
