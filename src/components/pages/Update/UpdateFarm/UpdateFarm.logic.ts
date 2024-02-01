import { FarmObj } from "../../Create/CreateFarm/CreateFarm.static";
import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_UPDATE_FARM_HEADER,
  API_UPDATE_FARM_METHOD_GET,
  API_UPDATE_FARM_METHOD_PATCH,
  API_UPDATE_FARM_URL,
  FarmUpdate,
} from "./UpdateFarm.static";

export const fetchFarm = async (
  id: string | undefined,
  user: UserDataFromApi
) => {
  if (id) {
    const url = `${API_UPDATE_FARM_URL}/${id}`;
    const response = await fetch(url, {
      method: API_UPDATE_FARM_METHOD_GET,
      headers: {
        ...API_UPDATE_FARM_HEADER,
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      throw new Error(errorData.message);
    }

    const farmData = await response.json();
    return farmData;
  }

  throw new Error("Farm id is undefined.");
};

export const updateFarm = async (
  farmObj: FarmUpdate,
  id: string | undefined,
  user: UserDataFromApi
) => {
  console.log(id);
  if (id) {
    let coordinates: [number, number];

    if (typeof farmObj.location === "string") {
      coordinates = farmObj.location.split(",").map(parseFloat) as [
        number,
        number
      ];
    } else {
      coordinates = farmObj.location.coordinates;
    }

    farmObj.location = {
      type: "Point",
      coordinates,
    } as FarmObj["location"];
    const url = `${API_UPDATE_FARM_URL}/${id}`;
    const method = API_UPDATE_FARM_METHOD_PATCH;

    const options = {
      method,
      headers: {
        ...API_UPDATE_FARM_HEADER,
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(farmObj),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      throw new Error(errorData.message);
    }
    return response.json();
  }

  throw new Error("Farm id is undefined.");
};
