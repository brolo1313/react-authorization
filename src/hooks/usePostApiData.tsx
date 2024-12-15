import { useState, useCallback } from "react";
import { useLoader } from "../context/loaderContext";
import { localStorageService } from "../shared/helpers/localStorage";

type HttpMethod = "POST" | "PUT" | "DELETE";

export function usePostApiData<T>(apiEndpoint: string, method: HttpMethod) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { showLoader, hideLoader } = useLoader();

  const userSettings = localStorageService.getUserSettings();
  const accessToken = userSettings?.accessToken || null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const triggerFetch = useCallback(
    async (body?: T) => {
      showLoader();
      try {
        const response = await fetch(apiEndpoint, {
          method,
          headers,
          body: JSON.stringify(body),
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
    },
    [apiEndpoint, method]
  );

  return { data, error, triggerFetch };
}
