import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextInput } from "../shared/components/input/input";
import { isEmailValid } from "../shared/helpers/validation";

const Registration = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    loading: false,
    accountCreationSuccessful: false,
    errorPasswordMessage: "",
    errorEmailMessage: "",
    passwordLength: "",
    nameErrorMessage: "",
    nameLengthError: "",
  });

  const {
    name,
    email,
    password,
    passwordConfirmation,
    loading,
    accountCreationSuccessful,
    errorPasswordMessage,
    errorEmailMessage,
    passwordLength,
    nameErrorMessage,
    nameLengthError,
  } = formState;

  useEffect(() => {
    console.log("Updated formState:", formState);
  }, [formState]);

  const isPasswordValid = (password: string, passwordConfirmation: string) => {
    if (!password || !passwordConfirmation) {
      setFormState((prevState) => ({
        ...prevState,
        errorPasswordMessage: "Password required",
      }));
      return false;
    } else if (password.length < 8) {
      setFormState((prevState) => ({
        ...prevState,
        passwordLength: "Password is too short",
      }));
      return false;
    } else if (passwordConfirmation.length < 8) {
      setFormState((prevState) => ({
        ...prevState,
        passwordLength: "Password is too short",
      }));
      return false;
    } else if (password !== passwordConfirmation) {
      setFormState((prevState) => ({
        ...prevState,
        errorPasswordMessage: "Upps sorry Password did not match 😔",
      }));
      return false;
    }

    // Clear errors if everything is valid
    setFormState((prevState) => ({
      ...prevState,
      errorPasswordMessage: "",
      passwordLength: "",
    }));
    return true;
  };

  const isNameValid = (value: string) => {
    if (value.length < 2 && value) {
      setFormState((prevState) => ({
        ...prevState,
        nameLengthError: "Name is too short",
      }));
      return false;
    } else if (!value) {
      setFormState((prevState) => ({
        ...prevState,
        nameErrorMessage: "Name is required",
        nameLengthError: "",
      }));
      return true;
    }

    // Clear error if name is valid
    setFormState((prevState) => ({
      ...prevState,
      nameLengthError: "",
      nameErrorMessage: "",
    }));
    return true;
  };

  const sendForm = () => {
    return fetch("https://node-implementation.vercel.app/api/all-profiles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Update the input value in form state
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Validate field based on id
    // if (id === "password" || id === "passwordConfirmation") {
    //   isPasswordValid(
    //     e?.target?.form?.password.value,
    //     e?.target?.form?.passwordConfirmation.value
    //   );
    // }

    if (id === "name") {
      isNameValid(value);
    }

    if (id === "email") {
      isEmailValid(value, setFormState);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const passwordValid = isPasswordValid(password, passwordConfirmation);
    const emailValid = isEmailValid(email, setFormState);
    const nameValid = isNameValid(name);

    //passwordValid &&
    if (emailValid && nameValid) {
      setFormState((prevState) => ({ ...prevState, loading: true }));
      const response = await sendForm();
      setFormState((prevState) => ({ ...prevState, loading: false }));

      if (response.ok) {
        setFormState({
          ...formState,
          accountCreationSuccessful: true,
          email: "",
          name: "",
          password: "",
          passwordConfirmation: "",
          errorPasswordMessage: "",
        });
      }
    }
  };

  // Button should be disabled if there are any error messages
  const isButtonDisabled =
    loading ||
    !!errorEmailMessage ||
    !!errorPasswordMessage ||
    !!passwordLength ||
    !!nameLengthError;

  return (
    <div className="form-container">
      <h2>Registration Page</h2>
      <TextInput
        type="text"
        value={name}
        onChange={handleChange}
        id="name"
        label="Name"
        required
        error={nameLengthError.length ? nameLengthError : nameErrorMessage}
      />
      <TextInput
        type="text"
        value={email}
        onChange={handleChange}
        id="email"
        label="Email"
        required
        error={errorEmailMessage}
      />
      <TextInput
        type="password"
        value={password}
        onChange={handleChange}
        id="password"
        required
        label="Password"
        isPassword
        error={errorPasswordMessage}
      />
      <TextInput
        type="password"
        value={passwordConfirmation}
        onChange={handleChange}
        id="passwordConfirmation"
        required
        label="Confirm password"
        isPassword
        error={errorPasswordMessage}
      />
      <button
        onClick={onSubmit}
        type="submit"
        name="action"
        disabled={isButtonDisabled} // Disable button if there are errors
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      {accountCreationSuccessful && !loading ? (
        <p>You have successfully created an account 👏🏾</p>
      ) : null}

      <div>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default Registration;
