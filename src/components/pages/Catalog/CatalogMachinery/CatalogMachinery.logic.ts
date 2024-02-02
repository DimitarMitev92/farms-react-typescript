import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { endpoint, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../../../static/interfaces";
import { MachineryFromApi } from "./CatalogMachinery.static";

export const fetchMachinery = async (user: UserDataFromApi) => {
  try {
    const response = await fetchDataFromApi(
      endpoint.MACHINERY,
      user,
      method.GET,
      null,
      "Failed to fetch machinery"
    );

    const updatedDataArray = await Promise.all(
      response.map(async (data: MachineryFromApi) => {
        const farmData = await fetchDataFromApi(
          `${endpoint.FARM}/${data.farmId}`,
          user,
          method.GET,
          null,
          `Failed to fetch farm for machinery ${data.id}`
        );

        return {
          ...data,
          farm: { name: farmData.name },
        };
      })
    );

    return updatedDataArray;
  } catch (error) {
    console.error("Error fetching machinery:", error);
    throw error;
  }
};
