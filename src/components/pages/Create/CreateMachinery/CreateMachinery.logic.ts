import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_CREATE_MACHINERY_FARM_METHOD,
  API_CREATE_MACHINERY_FARM_URL,
  API_CREATE_MACHINERY_HEADERS,
  API_CREATE_MACHINERY_METHOD,
  API_CREATE_MACHINERY_URL,
  MachineryHandler,
} from "./CreateMachinery.static";

export const fetchFarms = async (user: UserDataFromApi) => {
  const farmResponse = await fetch(API_CREATE_MACHINERY_FARM_URL, {
    method: API_CREATE_MACHINERY_FARM_METHOD,
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
  if (!farmResponse.ok) {
    const errorData = await farmResponse.json();
    console.error("Error fetch farms:", errorData);
    throw new Error(errorData.message);
  }
  const farmData = await farmResponse.json();
  return farmData;
};

export const createMachinery = async (
  user: UserDataFromApi,
  machineryObj: MachineryHandler
) => {
  const url = API_CREATE_MACHINERY_URL;
  const options = {
    method: API_CREATE_MACHINERY_METHOD,
    headers: {
      ...API_CREATE_MACHINERY_HEADERS,
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
};
