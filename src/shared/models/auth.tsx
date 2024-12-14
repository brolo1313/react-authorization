export interface IFormState {
    email: string;
    errorEmailMessage: string;
    errorPasswordMessage: string;
    nameErrorMessage: string;
    password: string;
    isLoading: boolean;
  }


  export interface IUserSettings {
    accessToken: string;
    email: string;
    expiresIn: number;
    id: string;
    username: string;
  }