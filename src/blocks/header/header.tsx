// Header.tsx
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

const Header = () => {
  const { userSettings } = useAuth();
  const { logOut } = useLogout();
  if (!userSettings) return null;

  return (
    <>
      {userSettings.accessToken ? (
        <header className="app-header">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div
              style={{ cursor: "pointer", marginRight: "20px" }}
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
