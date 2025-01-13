import { useAuth } from "../../context/AuthContext";
import "./footer.css";

const Footer = () => {
  const { userSettings } = useAuth();
  if (!userSettings) return null;
  return (
    <>
      {userSettings.accessToken ? (
        <footer className="app-footer">
          <div className="app-footer-container">{/* Footer content */}</div>
          <div className="app-footer-bottom">
            <p>&copy; 2024 Ваша компанія. Всі права захищені.</p>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
};

export default Footer;
