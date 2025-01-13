// AuthContext.js
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserSettings } from "../shared/models/auth";

export interface ILoaderContext {
  userSettings: IUserSettings | undefined;
  updateUserSettings: (settings: IUserSettings) => void;
  clearUserSettings: () => void;
}

const AuthContext = createContext<ILoaderContext>({} as ILoaderContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userSettings, setUserSettings] = useState<IUserSettings>();

  const userSettingsStorageKey: string = "auth";

  const updateUserSettings = (settings: IUserSettings) => {
    setUserSettings({ ...settings });
    if (settings) {
      localStorage.setItem(userSettingsStorageKey, JSON.stringify(settings));
    } else {
      localStorage.removeItem(userSettingsStorageKey);
    }
  };

  const clearUserSettings = () => {
    localStorage.removeItem(userSettingsStorageKey);
    setUserSettings(undefined);
  };

  useEffect(() => {
    const storedSettings = localStorage.getItem(userSettingsStorageKey);
    if (storedSettings) {
      setUserSettings(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    const neonElements = document.querySelectorAll(
      ".btn-neon"
    ) as NodeListOf<HTMLElement>;

    const applyNeonEffect = (
      neonElement: HTMLElement | null,
      applyEffect: boolean
    ) => {
      if (!neonElement) return;
      if (applyEffect) {
        neonElement.style.boxShadow =
          "0 0 10px #ff6f61, 0 0 40px #ff6f61, 0 0 80px #ff6f61";
        neonElement.style.backgroundColor = "#ff6f61";
      } else {
        neonElement.style.boxShadow = "none";
        neonElement.style.backgroundColor = "transparent";
      }
    };

    const applyEffectToNeons = userSettings?.accessToken ? true : false;

    neonElements.forEach((neonElement, index) => {
      if (index < 2) {
        applyNeonEffect(neonElement as HTMLElement, applyEffectToNeons);
      }
    });
  }, [userSettings]);

  return (
    <AuthContext.Provider
      value={{ userSettings, updateUserSettings, clearUserSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
