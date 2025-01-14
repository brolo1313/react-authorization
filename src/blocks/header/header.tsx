// Header.tsx
import "./header.css";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import logoutIcon from "../../assets/icons/logout_icon1.svg";

const Header = () => {
  const { userSettings } = useAuth();
  const { logOut } = useLogout();
  if (!userSettings) return null;

  return (
    <>
      {userSettings.accessToken ? (
        <header className="app-header">
          <div className="logout-container">
            <div
              className="logout-icon"
              onClick={logOut}
            >
              <img
                src={logoutIcon}
                alt="Logout"
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
