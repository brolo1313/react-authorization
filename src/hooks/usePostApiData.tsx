import { useState, useCallback } from "react";
import { useLoader } from "../context/loaderContext";
import { fetchInterceptor } from "../interceptor/interceptor";

type HttpMethod = "POST" | "PUT" | "DELETE";

export function usePostApiData<T>(apiEndpoint: string, method: HttpMethod) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { showLoader, hideLoader } = useLoader();

  const authPath = ["sign-in", "reset-password", "sign-up"];

  const triggerFetch = useCallback(
    async (data?: T) => {
      if (!authPath.includes(apiEndpoint)) {
        showLoader();
      }
      try {
        const response = await fetchInterceptor(apiEndpoint, "POST", data);

        setData(response);
      } catch (err: any) {
        setError(err);
      } finally {
        if (!authPath.includes(apiEndpoint)) {
          hideLoader();
        }
      }
    },
    [apiEndpoint, method]
  );

  return { data, error, triggerFetch };
}
