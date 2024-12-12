// Header.tsx
import "./Header.css";
import { useAuth } from "../../shared/components/auth/AuthContext";

const Header = () => {
  const { userSettings, clearUserSettings } = useAuth();

  if (!userSettings) return null;

  const logOut = () => {
    clearUserSettings();
    window.location.href = "/login";
  };

  console.log('фівфів');

  return (
    <>
      {userSettings ? (
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
