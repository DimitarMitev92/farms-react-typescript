import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_FIELD_FARM_METHOD,
  API_FIELD_FARM_URL,
  API_FIELD_METHOD,
  API_FIELD_SOIL_METHOD,
  API_FIELD_SOIL_URL,
  API_FIELD_URL,
  FieldFromApi,
} from "./CatalogField.static";

export const fetchFields = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_FIELD_URL, {
      method: API_FIELD_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch farms. Status: ${response.status}`);
    }

    const dataArray = await response.json();

    const updatedDataArray = await Promise.all(
      dataArray.map(async (data: FieldFromApi) => {
        const responseSoil = await fetch(
          `${API_FIELD_SOIL_URL}/${data.soilId}`,
          {
            method: API_FIELD_SOIL_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseSoil.ok) {
          throw new Error(
            `Failed to fetch soil. Status: ${responseSoil.status}`
          );
        }

        const soilData = await responseSoil.json();

        const responseFarm = await fetch(
          `${API_FIELD_FARM_URL}/${data.farmId}`,
          {
            method: API_FIELD_FARM_METHOD,
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
