import { UserDataFromApi } from "../static/interfaces";

export const fetchDataFromApi = async (
  url: string,
  user: UserDataFromApi,
  methodType: string,
  body: unknown | null,
  errorMsg: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${user.access_token}`,
      "Content-Type": "application/json",
    };

    const options = {
      method: methodType,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`${errorMsg} Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data: ${errorMsg}`, error);
    throw error;
  }
};
