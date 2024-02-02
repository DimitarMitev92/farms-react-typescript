import { endpoint, header, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../../../static/interfaces";
import { MachineryHandler } from "./CreateMachinery.static";

export const fetchFarms = async (user: UserDataFromApi) => {
  try {
    const farmResponse = await fetch(endpoint.FARM, {
      method: method.GET,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    if (!farmResponse.ok) {
      const errorData = await farmResponse.json();
      console.error("Error fetch farms:", errorData);
      throw new Error(errorData.message);
    }
    const farmData = await farmResponse.json();
    return farmData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};

export const createMachinery = async (
  user: UserDataFromApi,
  machineryObj: MachineryHandler
) => {
  try {
    const url = endpoint.MACHINERY;
    const options = {
      method: method.POST,
      headers: {
        ...header.CONTENT_TYPE_APP_JSON,
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(machineryObj),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      throw new Error(errorData.message);
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};
