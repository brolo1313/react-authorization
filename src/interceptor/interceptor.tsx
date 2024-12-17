import { localStorageService } from "../shared/helpers/localStorage";
import { API_URL } from "../config";
import { ShowToasterError } from "../shared/helpers/showToaster";
import { httpErrorHandler } from "../shared/helpers/basicCodeErrorHandler";

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
      const errorBody = await response.json();

      const errorMessage = errorBody || httpErrorHandler(response.status);
      const errorData = {
        status: response.status,
        message: errorMessage.message,
      };
      throw errorData;
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    let errorMessage;

    if (
      error instanceof SyntaxError &&
      error?.message.includes("Unexpected token")
    ) {
      errorMessage = "The server returned an invalid response format.";
    }
    ShowToasterError({
      title: error.status ?? "500",
      message: errorMessage ?? error.message,
    });
    throw error;
  }
}
