import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../../../static/interfaces";
import { FieldFromApi } from "./CatalogField.static";

export const fetchFields = async (user: UserDataFromApi) => {
  try {
    const url = endpoint.FIELD;
    const methodType = method.GET;
    const body = null;
    const errorMsg = "Failed to fetch fields";

    const response = await fetchDataFromApi(
      url,
      user,
      methodType,
      body,
      errorMsg
    );

    const updatedDataArray = await Promise.all(
      response.map(async (data: FieldFromApi) => {
        const responseSoil = await fetchDataFromApi(
          `${endpoint.SOIL}/${data.soilId}`,
          user,
          method.GET,
          null,
          `Failed to fetch soil for field ${data.id}`
        );

        const responseFarm = await fetchDataFromApi(
          `${endpoint.FARM}/${data.farmId}`,
          user,
          method.GET,
          null,
          `Failed to fetch farm for field ${data.id}`
        );

        return {
          ...data,
          farm: { name: responseFarm.name },
          soil: { soil: responseSoil.soil },
        };
      })
    );

    return updatedDataArray;
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
};
