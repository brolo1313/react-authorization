import { Navigate } from "react-router-dom";
import { localStorageService } from "./localStorage";

const isAuthenticated = () => {
  const userSettings =  localStorageService.getUserSettings();
  return userSettings.accessToken ? true : false;
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
