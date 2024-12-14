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
