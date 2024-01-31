import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_CREATE_FIELD_FARM_METHOD,
  API_CREATE_FIELD_FARM_URL,
  API_CREATE_FIELD_HEADERS,
  API_CREATE_FIELD_METHOD,
  API_CREATE_FIELD_SOIL_METHOD,
  API_CREATE_FIELD_SOIL_URL,
  API_CREATE_FIELD_URL,
  FieldHandler,
} from "./CreateField.static";

export const fetchSoils = async (user: UserDataFromApi) => {
  const soilResponse = await fetch(API_CREATE_FIELD_SOIL_URL, {
    method: API_CREATE_FIELD_SOIL_METHOD,
    headers: { Authorization: `Bearer ${user.access_token}` },
  });

  if (!soilResponse.ok) {
    const errorData = await soilResponse.json();
    console.error("Error fetching soils:", errorData);
    throw new Error(errorData.message);
  }

  return soilResponse.json();
};

export const fetchFarms = async (user: UserDataFromApi) => {
  const farmResponse = await fetch(API_CREATE_FIELD_FARM_URL, {
    method: API_CREATE_FIELD_FARM_METHOD,
    headers: { Authorization: `Bearer ${user.access_token}` },
  });

  if (!farmResponse.ok) {
    const errorData = await farmResponse.json();
    console.error("Error fetching farms:", errorData);
    throw new Error(errorData.message);
  }

  return farmResponse.json();
};

export const createField = async (
  user: UserDataFromApi,
  fieldObj: FieldHandler
) => {
  const coordinates = JSON.parse(fieldObj.boundaries);

  fieldObj.boundaries = {
    type: "Polygon",
    coordinates: coordinates,
  };

  const url = API_CREATE_FIELD_URL;
  const options = {
    method: API_CREATE_FIELD_METHOD,
    headers: {
      ...API_CREATE_FIELD_HEADERS,
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(fieldObj),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Server error:", errorData);
    throw new Error(errorData.message);
  }

  return response.json();
};
