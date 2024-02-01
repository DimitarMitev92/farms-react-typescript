import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_FIELD_CULTIVATION_CROP_METHOD,
  API_FIELD_CULTIVATION_CROP_URL,
  API_FIELD_CULTIVATION_CULTIVATION_METHOD,
  API_FIELD_CULTIVATION_CULTIVATION_URL,
  API_FIELD_CULTIVATION_FIELD_METHOD,
  API_FIELD_CULTIVATION_FIELD_URL,
  API_FIELD_CULTIVATION_GROWING_PROCESS_METHOD,
  API_FIELD_CULTIVATION_GROWING_PROCESS_URL,
  API_FIELD_CULTIVATION_MACHINERY_METHOD,
  API_FIELD_CULTIVATION_MACHINERY_URL,
  API_FIELD_CULTIVATION_METHOD,
  API_FIELD_CULTIVATION_URL,
  FieldCultivationFroApi,
} from "./CatalogFieldCultivation.static";

export const fetchFieldCultivation = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_FIELD_CULTIVATION_URL, {
      method: API_FIELD_CULTIVATION_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch field cultivation: Status: ${response.status}`
      );
    }

    const fieldCultivationData = await response.json();

    const updatedDataArray = await Promise.all(
      fieldCultivationData.map(async (data: FieldCultivationFroApi) => {
        const responseCultivation = await fetch(
          `${API_FIELD_CULTIVATION_CULTIVATION_URL}/${data.cultivationId}`,
          {
            method: API_FIELD_CULTIVATION_CULTIVATION_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseCultivation.ok) {
          throw new Error(
            `Failed to fetch cultivation. Status ${responseCultivation.status}`
          );
        }

        const cultivationData = await responseCultivation.json();
        console.log(data.machineryId);
        const responseMachinery = await fetch(
          `${API_FIELD_CULTIVATION_MACHINERY_URL}/${data.machineryId}`,
          {
            method: API_FIELD_CULTIVATION_MACHINERY_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseMachinery.ok) {
          throw new Error(
            `Failed to fetch machinery. Status ${responseMachinery.status}`
          );
        }

        const machineryData = await responseMachinery.json();

        const responseGrowingProcess = await fetch(
          `${API_FIELD_CULTIVATION_GROWING_PROCESS_URL}/${data.growingProcessId}`,
          {
            method: API_FIELD_CULTIVATION_GROWING_PROCESS_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseGrowingProcess.ok) {
          throw new Error(
            `Failed to fetch growing process. Status ${responseGrowingProcess.status}`
          );
        }

        const growingProcessData = await responseGrowingProcess.json();

        const responseCrop = await fetch(
          `
        ${API_FIELD_CULTIVATION_CROP_URL}/${growingProcessData.cropId}`,
          {
            method: API_FIELD_CULTIVATION_CROP_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseCrop.ok) {
          throw new Error(
            `Failed to fetch crop. Status ${responseCrop.status}`
          );
        }

        const cropData = await responseCrop.json();

        const responseField = await fetch(
          `${API_FIELD_CULTIVATION_FIELD_URL}/${growingProcessData.fieldId}`,
          {
            method: API_FIELD_CULTIVATION_FIELD_METHOD,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseField.ok) {
          throw new Error(
            `Failed to fetch field. Status ${responseField.status}`
          );
        }

        const fieldData = await responseField.json();

        return {
          ...data,
          cultivation: { cultivation: cultivationData.cultivation },
          machinery: {
            identificationNumber: machineryData.identificationNumber,
          },
          crop: { crop: cropData.crop },
          field: { name: fieldData.name },
        };
      })
    );

    return updatedDataArray;
  } catch (error) {
    console.error(`Error fetching field cultivation:`, error);
  }
};
