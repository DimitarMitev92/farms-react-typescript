import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export const useFetch = <T>(
  url: string,
  options?: RequestInit
): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(url, options);
        const json: T = await res.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred")
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};
