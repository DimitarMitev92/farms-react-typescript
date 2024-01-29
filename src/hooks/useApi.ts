import { useState, useEffect } from "react";

interface ApiResponse<T> {
  response: T | null;
  error: Error | null;
  loading: boolean;
}

const useApi = <T>(
  url: string,
  method: string = "GET",
  data: unknown = null,
  jwtToken: string | null = null
): ApiResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
          },
          body: data ? JSON.stringify(data) : null,
        };

        const res = await fetch(url, options);
        const json: T = await res.json();

        setResponse(json);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, data, jwtToken]);

  return { response, error, loading };
};

export default useApi;
