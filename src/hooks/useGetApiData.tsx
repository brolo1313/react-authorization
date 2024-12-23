import { useEffect, useState, useCallback } from "react";
import { fetchInterceptor } from "../interceptor/interceptor";
import { useLoader } from "../context/loaderContext";
import useLogout from "./useLogout";

export function useGetApiData(apiEndpoint: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const { logOut } = useLogout();

  const fetchData = useCallback(async () => {
    try {
      showLoader();

      const result = await fetchInterceptor(apiEndpoint, "GET", "", logOut);
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

  return { data, error, refetch: fetchData, setError };
}
