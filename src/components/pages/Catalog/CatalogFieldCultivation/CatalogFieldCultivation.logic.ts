import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../Login/Login.static";
import { FieldCultivationFroApi } from "./CatalogFieldCultivation.static";

export const fetchFieldCultivation = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(endpoint.FIELD_CULTIVATION, {
      method: method.GET,
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
          `${endpoint.CULTIVATION}/${data.cultivationId}`,
          {
            method: method.GET,
            headers: { Authorization: `Bearer ${user.access_token}` },
          }
        );

        if (!responseCultivation.ok) {
          throw new Error(
            `Failed to fetch cultivation. Status ${responseCultivation.status}`
          );
        }

        const cultivationData = await responseCultivation.json();
        const responseMachinery = await fetch(
          `${endpoint.MACHINERY}/${data.machineryId}`,
          {
            method: method.GET,
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
          `${endpoint.GROWING_PROCESS}/${data.growingProcessId}`,
          {
            method: method.GET,
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
        ${endpoint.CROP}/${growingProcessData.cropId}`,
          {
            method: method.GET,
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
          `${endpoint.FIELD}/${growingProcessData.fieldId}`,
          {
            method: method.GET,
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
