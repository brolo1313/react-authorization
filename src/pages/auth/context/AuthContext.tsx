// AuthContext.js
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IUserSettings } from "../../../shared/models/auth";

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
        setUserSettings(settings);
        if (settings) {
            localStorage.setItem(
                userSettingsStorageKey,
                JSON.stringify({ userSettings: settings })
            );
        } else {
            localStorage.removeItem(userSettingsStorageKey);
        }
    };

    const clearUserSettings = () => {
        localStorage.removeItem(userSettingsStorageKey);
    };

    useEffect(() => {
        const storedSettings = localStorage.getItem(userSettingsStorageKey);
        if (storedSettings) {
            setUserSettings(JSON.parse(storedSettings));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userSettings, updateUserSettings, clearUserSettings }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
