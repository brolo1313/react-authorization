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

  const authPath = ["sign-in", "reset-password", "sign-up"];
  const match = apiEndpoint.match(/\/api\/(.*)/);
  const path = match![1];

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const triggerFetch = useCallback(
    async (body?: T) => {
      if (!authPath.includes(path)) {
        showLoader();
      }
      try {
        const response = await fetch(apiEndpoint, {
          method,
          headers,
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err);
      } finally {
        if (!authPath.includes(path)) {
          hideLoader();
        }
      }
    },
    [apiEndpoint, method]
  );

  return { data, error, triggerFetch };
}
