import { localStorageService } from "../shared/helpers/localStorage";
import { API_URL } from "../config";
import { toast } from "react-toastify";

interface ToastProps {
  title?: string;
  message?: string;
}

export const httpErrorHandler = (errCode: any) => {
  const errorCases: any = {
    400: () =>
      showToaster({
        title: "Bad Request 400",
        message: "The request could not be understood",
      }),
    401: () =>
      showToaster({
        title: "Unauthorized 401",
        message: "Permission denied",
      }),
    403: () =>
      showToaster({
        title: "Less Permission 403",
        message: "Permission denied",
      }),
    404: () =>
      showToaster({
        title: "Not Found 404",
        message: "Requested resource not found",
      }),
    500: () =>
      showToaster({
        title: "Server Error 500",
        message: "Internal Server Error",
      }),
    default: () =>
      showToaster({
        title: "Error",
        message: "Something went wrong",
      }),
  };

  // Determine the error handler based on the error status or use the default handler
  const handleCustomError = errorCases[errCode] || errorCases.default;
  // Execute the determined error handler
  handleCustomError();
};

const showToaster = ({ title, message }: ToastProps) => {
  toast.error(
    <div>
      {title}
      <br /> {message}
    </div>,
    {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
};

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
    showToaster({
      title: error.status ?? "500",
      message: errorMessage ?? error.message,
    });
    throw error;
  }
}
