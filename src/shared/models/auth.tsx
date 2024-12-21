export interface IFormState {
    email: string;
    errorEmailMessage: string;
    errorPasswordMessage: string;
    nameErrorMessage: string;
    password: string;
    isLoading: boolean;

    name?: string,
    passwordConfirmation?: string,
    passwordLength? : string,
    nameLengthError? : string,
    errorPasswordConfirmation? : string
  }


  export interface IUserSettings {
    accessToken: string;
    email: string;
    expiresIn: number;
    id: string;
    username: string;
    isSocial? : boolean;
  }