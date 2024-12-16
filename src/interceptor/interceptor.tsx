import { localStorageService } from "../shared/helpers/localStorage";
import { API_URL } from "../config";

export async function fetchInterceptor(
  apiEndpoint: string,
  method: string = "GET",
  body: any = null
) {
  const userSettings = localStorageService.getUserSettings();
  const accessToken = userSettings?.accessToken || null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  try {
    const response = await fetch(`${API_URL}/${apiEndpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
