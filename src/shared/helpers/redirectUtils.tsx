import { Navigate } from "react-router-dom";
import { IUserSettings } from "../models/auth";

export const redirectFromAuthRoutes = (
  userSettings: IUserSettings | undefined,
  element: JSX.Element
) => {
  return userSettings?.accessToken ? (
    <Navigate to="/dashboard" />
  ) : (
    element
  );
};
