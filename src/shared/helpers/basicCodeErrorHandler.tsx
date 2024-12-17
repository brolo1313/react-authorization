import { ShowToasterError } from "./showToaster";

export const httpErrorHandler = (errCode: any) => {
  const errorCases: any = {
    400: () =>
      ShowToasterError({
        title: "Bad Request 400",
        message: "The request could not be understood",
      }),
    401: () =>
      ShowToasterError({
        title: "Unauthorized 401",
        message: "Permission denied",
      }),
    403: () =>
      ShowToasterError({
        title: "Less Permission 403",
        message: "Permission denied",
      }),
    404: () =>
      ShowToasterError({
        title: "Not Found 404",
        message: "Requested resource not found",
      }),
    500: () =>
      ShowToasterError({
        title: "Server Error 500",
        message: "Internal Server Error",
      }),
    default: () =>
      ShowToasterError({
        title: "Error",
        message: "Something went wrong",
      }),
  };

  // Determine the error handler based on the error status or use the default handler
  const handleCustomError = errorCases[errCode] || errorCases.default;
  // Execute the determined error handler
  handleCustomError();
};
