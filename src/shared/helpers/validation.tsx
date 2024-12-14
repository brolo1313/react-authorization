import { IFormState } from "../models/auth";

export const isEmailValid = (value: string | undefined, setFormState: any) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (!value) {
    setFormState((prevState: any) => ({
      ...prevState,
      errorEmailMessage: "Email is required",
    }));
    return false;
  } else if (!emailRegex.test(value) && value) {
    setFormState((prevState: any) => ({
      ...prevState,
      errorEmailMessage: "Enter a valid email",
    }));
    return false;
  }

  // Clear error message if valid
  setFormState((prevState: any) => ({
    ...prevState,
    errorEmailMessage: "",
  }));
  return true;
};


export const isNameValid = (value: string | undefined, setFormState: React.Dispatch<React.SetStateAction<Partial<IFormState>>>) => {
  if (value) {
    if (value.length < 2) {
      setFormState((prevState) => ({
        ...prevState,
        nameLengthError: "Name is too short",
        nameErrorMessage: "",
      }));
      return false;
    } else {
      setFormState((prevState) => ({
        ...prevState,
        nameLengthError: "",
        nameErrorMessage: "",
      }));
    }
  } else {
    setFormState((prevState) => ({
      ...prevState,
      nameErrorMessage: "Name is required",
      nameLengthError: "",
    }));
    return false;
  }

  return true;
};


export const isPasswordValid = (value: string | undefined, setFormState: React.Dispatch<React.SetStateAction<Partial<IFormState>>>) => {
  if (!value) {
    setFormState((prevState) => ({
      ...prevState,
      errorPasswordMessage: "Password required",
    }));
    return false;
  } else if (value.length < 8) {
    setFormState((prevState) => ({
      ...prevState,
      errorPasswordMessage: "Password must be at least 8 characters",
    }));
    return false;
  }

  setFormState((prevState) => ({
    ...prevState,
    errorPasswordMessage: "",
  }));
  return true;
};

export const isPasswordConfirmationValid = (
  value: string | undefined,
  setFormState: React.Dispatch<React.SetStateAction<Partial<IFormState>>>,
  password: string | undefined,
) => {
  if (!password) {
    setFormState((prevState) => ({
      ...prevState,
      errorPasswordConfirmation: "Password is required before confirming",
    }));
    return false;
  } else if (value !== password) {
    setFormState((prevState) => ({
      ...prevState,
      errorPasswordConfirmation: "Password and Confirm Password do not match",
    }));
    return false;
  }

  setFormState((prevState) => ({
    ...prevState,
    errorPasswordConfirmation: "",
  }));
  return true;
};