import { endpoint, header, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../Login/Login.static";
import { FieldHandler } from "./CreateField.static";

export const fetchSoils = async (user: UserDataFromApi) => {
  try {
    const soilResponse = await fetch(endpoint.SOIL, {
      method: method.GET,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!soilResponse.ok) {
      const errorData = await soilResponse.json();
      console.error("Error fetching soils:", errorData);
      throw new Error(errorData.message);
    }

    return soilResponse.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};

export const fetchFarms = async (user: UserDataFromApi) => {
  try {
    const farmResponse = await fetch(endpoint.FARM, {
      method: method.GET,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!farmResponse.ok) {
      const errorData = await farmResponse.json();
      console.error("Error fetching farms:", errorData);
      throw new Error(errorData.message);
    }

    return farmResponse.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};

export const createField = async (
  user: UserDataFromApi,
  fieldObj: FieldHandler
) => {
  try {
    const coordinates = JSON.parse(fieldObj.boundaries);

    fieldObj.boundaries = {
      type: "Polygon",
      coordinates: coordinates,
    };

    const url = endpoint.FIELD;
    const options = {
      method: method.POST,
      headers: {
        ...header.CONTENT_TYPE_APP_JSON,
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};
