import { IUserSettings } from "../models/auth";

class LocalStorageService {
  private userSettingsStorageKey: string = 'auth';

  getUserSettings() {
    const userSettingsString = localStorage.getItem(this.userSettingsStorageKey);
    if (userSettingsString) {
      return { ...JSON.parse(userSettingsString) };
    }
    return false;
  }

  setUserSettings(userSettings: IUserSettings) {
    localStorage.setItem(this.userSettingsStorageKey, JSON.stringify({ userSettings: userSettings }));
  }
}

export const localStorageService = new LocalStorageService();
