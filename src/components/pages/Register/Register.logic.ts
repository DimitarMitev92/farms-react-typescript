interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

interface UserDataFromApi {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    rights: "OWNER" | "OPERATOR" | "VIEWER";
  };
  access_token: string;
}

export const registerService = async (
  url: string,
  options: RequestOptions
): Promise<UserDataFromApi> => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error(`An unexpected error occurred`);
    }
  }
};
