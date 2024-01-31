// apiServices.js

import { UserDataFromApi } from "../../Login/Login.static";
import {
  API_CREATE_FIELD_CULTIVATION_CROP_METHOD,
  API_CREATE_FIELD_CULTIVATION_CROP_URL,
  API_CREATE_FIELD_CULTIVATION_CULTIVATION_METHOD,
  API_CREATE_FIELD_CULTIVATION_CULTIVATION_URL,
  API_CREATE_FIELD_CULTIVATION_FIELD_METHOD,
  API_CREATE_FIELD_CULTIVATION_FIELD_URL,
  API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_HEADERS,
  API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_METHOD,
  API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_URL,
  API_CREATE_FIELD_CULTIVATION_HEADERS,
  API_CREATE_FIELD_CULTIVATION_MACHINERY_METHOD,
  API_CREATE_FIELD_CULTIVATION_MACHINERY_URL,
  API_CREATE_FIELD_CULTIVATION_METHOD,
  API_CREATE_FIELD_CULTIVATION_URL,
  FieldCultivationHandler,
  GrowingProcessHandler,
} from "./CreateFieldCultivation.static";

export const fetchCultivations = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_CREATE_FIELD_CULTIVATION_CULTIVATION_URL, {
      method: API_CREATE_FIELD_CULTIVATION_CULTIVATION_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching cultivations: ${errorData.message}`);
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

export const fetchMachinery = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_CREATE_FIELD_CULTIVATION_MACHINERY_URL, {
      method: API_CREATE_FIELD_CULTIVATION_MACHINERY_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching machineries: ${errorData.message}`);
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

export const fetchCrops = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_CREATE_FIELD_CULTIVATION_CROP_URL, {
      method: API_CREATE_FIELD_CULTIVATION_CROP_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching crops: ${errorData.message}`);
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

export const fetchFields = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(API_CREATE_FIELD_CULTIVATION_FIELD_URL, {
      method: API_CREATE_FIELD_CULTIVATION_FIELD_METHOD,
      headers: { Authorization: `Bearer ${user.access_token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching fields: ${errorData.message}`);
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

export const createGrowingProcess = async (
  growingProcessObj: GrowingProcessHandler,
  user: UserDataFromApi
) => {
  try {
    const response = await fetch(
      API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_URL,
      {
        method: API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_METHOD,
        headers: {
          ...API_CREATE_FIELD_CULTIVATION_GROWING_PROCESS_HEADERS,
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(growingProcessObj),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Server error while creating growing process: ${errorData.message}`
      );
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

export const createFieldCultivation = async (
  fieldCultivationObjForRes: FieldCultivationHandler,
  user: UserDataFromApi
) => {
  console.log(fieldCultivationObjForRes);
  const response = await fetch(API_CREATE_FIELD_CULTIVATION_URL, {
    method: API_CREATE_FIELD_CULTIVATION_METHOD,
    headers: {
      ...API_CREATE_FIELD_CULTIVATION_HEADERS,
      Authorization: `Bearer ${user.access_token}`,
    },
    body: JSON.stringify(fieldCultivationObjForRes),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Server error while creating field cultivation: ${errorData.message}`
    );
  }
};
