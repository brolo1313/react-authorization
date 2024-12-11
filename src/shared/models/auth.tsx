export interface IFormState {
    email: string;
    errorEmailMessage: string;
    errorPasswordMessage: string;
    loading: boolean;
    nameErrorMessage: string;
    password: string;
  }


  export interface IUserSettings {
    accessToken: string;
    email: string;
    expiresIn: number;
    id: string;
    username: string;
  }