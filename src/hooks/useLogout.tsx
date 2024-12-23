import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const { userSettings, clearUserSettings } = useAuth();
  const navigateToLogin = useNavigate();

  const logOut = () => {
    clearUserSettings();
    if (userSettings?.isSocial) googleLogout();
    navigateToLogin("/login");
  };

  return { logOut };
};

export default useLogout;
