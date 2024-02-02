import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../../../static/interfaces";
import { FieldCultivationFroApi } from "./CatalogFieldCultivation.static";

export const fetchFieldCultivation = async (user: UserDataFromApi) => {
  try {
    const url = endpoint.FIELD_CULTIVATION;
    const methodType = method.GET;
    const body = null;
    const errorMsg = "Failed to fetch field cultivation";

    const response = await fetchDataFromApi(
      url,
      user,
      methodType,
      body,
      errorMsg
    );

    const updatedDataArray = await Promise.all(
      response.map(async (data: FieldCultivationFroApi) => {
        const responseCultivation = await fetchDataFromApi(
          `${endpoint.CULTIVATION}/${data.cultivationId}`,
          user,
          method.GET,
          null,
          `Failed to fetch cultivation for field cultivation ${data.id}`
        );

        const responseMachinery = await fetchDataFromApi(
          `${endpoint.MACHINERY}/${data.machineryId}`,
          user,
          method.GET,
          null,
          `Failed to fetch machinery for field cultivation ${data.id}`
        );

        const responseGrowingProcess = await fetchDataFromApi(
          `${endpoint.GROWING_PROCESS}/${data.growingProcessId}`,
          user,
          method.GET,
          null,
          `Failed to fetch growing process for field cultivation ${data.id}`
        );

        const responseCrop = await fetchDataFromApi(
          `${endpoint.CROP}/${responseGrowingProcess.cropId}`,
          user,
          method.GET,
          null,
          `Failed to fetch crop for field cultivation ${data.id}`
        );

        const responseField = await fetchDataFromApi(
          `${endpoint.FIELD}/${responseGrowingProcess.fieldId}`,
          user,
          method.GET,
          null,
          `Failed to fetch field for field cultivation ${data.id}`
        );

        return {
          ...data,
          cultivation: { cultivation: responseCultivation.cultivation },
          machinery: {
            identificationNumber: responseMachinery.identificationNumber,
          },
          crop: { crop: responseCrop.crop },
          field: { name: responseField.name },
        };
      })
    );

    return updatedDataArray;
  } catch (error) {
    console.error("Error fetching field cultivation:", error);
    throw error;
  }
};
