// Header.tsx
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const { userSettings, clearUserSettings } = useAuth();
  const navigateToLogin = useNavigate();
  if (!userSettings) return null;

  const logOut = () => {
    clearUserSettings();
    if (userSettings.isSocial) googleLogout();
    navigateToLogin("/login");
  };

  return (
    <>
      {userSettings.accessToken ? (
        <header className="app-header">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={logOut}
            >
              <img
                src="/src/assets/icons/logout_icon.png"
                alt=""
              />
            </div>
          </div>
        </header>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
