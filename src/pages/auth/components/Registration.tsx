import { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import {
  isEmailValid,
  isNameValid,
  isPasswordConfirmationValid,
  isPasswordValid,
} from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";

const validators: any = {
  name: isNameValid,
  email: isEmailValid,
  password: isPasswordValid,
  passwordConfirmation: isPasswordConfirmationValid,
};

const Registration = () => {
  const [formState, setFormState] = useState<Partial<IFormState>>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isLoading: false,
    errorPasswordMessage: "",
    errorPasswordConfirmation: "",
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
    isLoading,
    errorPasswordMessage,
    errorPasswordConfirmation,
    errorEmailMessage,
    passwordLength,
    nameErrorMessage,
    nameLengthError,
  } = formState;

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

    if (validators[id]) {
      validators[id](value, setFormState, password);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = validators.email(email, setFormState);
    const nameValid = validators.name(name, setFormState);
    const passwordValid = validators.password(password, setFormState);
    const passwordConfirmationValid = validators.passwordConfirmation(
      passwordConfirmation,
      setFormState,
      password
    );

    //passwordValid &&
    if (emailValid && nameValid && passwordValid && passwordConfirmationValid) {
      setFormState((prevState) => ({ ...prevState, loading: true }));
      const response = await sendForm();
      setFormState((prevState) => ({ ...prevState, loading: false }));

      if (response.ok) {
        setFormState({
          ...formState,
          email: "",
          name: "",
          password: "",
          passwordConfirmation: "",
          errorPasswordMessage: "",
          nameLengthError: "",
          nameErrorMessage: "",
        });
      }
    }
  };

  // Button should be disabled if there are any error messages
  const isButtonDisabled =
    isLoading ||
    !!errorEmailMessage ||
    !!errorPasswordMessage ||
    !!errorPasswordConfirmation ||
    !!passwordLength ||
    !!nameLengthError ||
    !!nameErrorMessage;

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
        error={nameLengthError?.length ? nameLengthError : nameErrorMessage}
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
        error={errorPasswordConfirmation}
        disabled={!password}
      />
      <button
        onClick={onSubmit}
        type="submit"
        name="action"
        disabled={isButtonDisabled} // Disable button if there are errors
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </button>

      <div>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default Registration;
