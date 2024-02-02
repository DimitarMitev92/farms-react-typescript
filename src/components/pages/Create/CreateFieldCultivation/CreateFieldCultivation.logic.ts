// apiServices.js

import { endpoint, header, method } from "../../../../static/endPoints";
import { UserDataFromApi } from "../../../../static/interfaces";
import {
  FieldCultivationHandler,
  GrowingProcessHandler,
} from "./CreateFieldCultivation.static";

export const fetchCultivations = async (user: UserDataFromApi) => {
  try {
    const response = await fetch(endpoint.CULTIVATION, {
      method: method.GET,
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
    const response = await fetch(endpoint.MACHINERY, {
      method: method.GET,
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
    const response = await fetch(endpoint.CROP, {
      method: method.GET,
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
    const response = await fetch(endpoint.FIELD, {
      method: method.GET,
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
    const response = await fetch(endpoint.GROWING_PROCESS, {
      method: method.POST,
      headers: {
        ...header.CONTENT_TYPE_APP_JSON,
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(growingProcessObj),
    });
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
  const response = await fetch(endpoint.FIELD_CULTIVATION, {
    method: method.POST,
    headers: {
      ...header.CONTENT_TYPE_APP_JSON,
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
