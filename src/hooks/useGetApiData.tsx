import { useEffect, useState, useCallback } from "react";
import { useLoader } from "../context/loaderContext";
import { localStorageService } from "../shared/helpers/localStorage";

export function useGetApiData(apiEndpoint: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { showLoader, hideLoader, isLoading } = useLoader();

  const userSettings = localStorageService.getUserSettings();
  const accessToken = userSettings?.accessToken || null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const fetchData = useCallback(async () => {
    showLoader();
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err);
    } finally {
      hideLoader();
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData, isLoading };
}
