import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { useState } from "react";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { useAuth } from "../../../context/AuthContext";
import { optionalSetFormState } from "../../../shared/helpers/useState";

const Login = () => {
  const [formState, setFormState] = useState<Partial<IFormState>>({
    email: "",
    password: "",
    isLoading: false,
    errorPasswordMessage: "",
    errorEmailMessage: "",
    nameErrorMessage: "",
  });

  const {
    email,
    password,
    errorPasswordMessage,
    errorEmailMessage,
    isLoading,
  } = formState;

  const { updateUserSettings } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigateToDashboard = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === "email") {
      isEmailValid(value, setFormState);
    }

    if (id === "password") {
      if (value.length > 0) {
        setFormState((prevState: any) => ({
          ...prevState,
          errorPasswordMessage: "",
        }));
      }
      return !value.length
        ? setFormState((prevState: any) => ({
            ...prevState,
            errorPasswordMessage: "Password is required",
          }))
        : null;
    }
  };

  const sendForm = async (formState: Partial<IFormState>) => {
    const { email, password } = formState;
    try {
      const response = await fetch(`${apiUrl}/sign-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      return {
        result: { ...data },
        success: true,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
        optionalSetFormState({isLoading: false}, setFormState)
      } else {
        console.error("Unknown error:", error);
        optionalSetFormState({isLoading: false}, setFormState)
      }
      throw error; // Re-throw the error so that we can handle it in onSubmit
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emailValid = isEmailValid(email, setFormState);

    if (emailValid && password) {
      optionalSetFormState({isLoading: true}, setFormState)
      const response = await sendForm(formState);

      if (response.success) {
        updateUserSettings(response.result);

        setFormState({
          ...formState,
          email: "",
          password: "",
          isLoading: false,
          errorPasswordMessage: "",
          errorEmailMessage: "",
          nameErrorMessage: "",
        });

        navigateToDashboard("/dashboard");
      }
    }
  };

  const isButtonDisabled =
    isLoading || !!errorEmailMessage || !!errorPasswordMessage || !password;

  return (
    <div className="form-container">
      <h2>Login Page</h2>

      <TextInput
        type="email"
        value={email}
        onChange={handleChange}
        id="email"
        label="Email"
        required
        placeholder="test@example.com"
        error={errorEmailMessage}
        disabled={isLoading}
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
        disabled={isLoading}
      />

      <button
        type="submit"
        name="action"
        onClick={onSubmit}
        disabled={isButtonDisabled}
      >
        {isLoading ? `Processing...` : `Sing in`}
      </button>

      <div>
        <Link to="/reset-password">Go to Reset Pass</Link>
      </div>
      <div>
        <Link to="/registration">Go to Registration</Link>
      </div>
    </div>
  );
};

export default Login;
