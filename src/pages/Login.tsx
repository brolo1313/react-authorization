import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../shared/components/input/input";
import { useEffect, useState } from "react";
import { isEmailValid } from "../shared/helpers/validation";
import { IFormState } from "../shared/models/auth";
import { localStorageService } from "../shared/helpers/localStorage";
import { useLoader } from "../shared/components/loader/loaderContext";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errorPasswordMessage: "",
    errorEmailMessage: "",
    nameErrorMessage: "",
  });

  const { email, password, errorPasswordMessage, errorEmailMessage } =
    formState;

  const { showLoader, hideLoader, isLoading } = useLoader();

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigateToDashboard = useNavigate();

  useEffect(() => {}, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === "email") {
      isEmailValid(value, setFormState);
    }
  };

  const sendForm = async (formState: IFormState) => {
    showLoader();
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
        hideLoader();
      } else {
        console.error("Unknown error:", error);
        hideLoader();
      }
      throw error; // Re-throw the error so that we can handle it in onSubmit
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emailValid = isEmailValid(email, setFormState);

    if (emailValid && password) {
      setFormState((prevState) => {
        return { ...prevState, loading: true };
      });

      const response = await sendForm(formState);

      setFormState((prevState) => {
        return { ...prevState, loading: false };
      });

      if (response.success) {
        setFormState({
          ...formState,
          email: "",
          password: "",
          errorPasswordMessage: "",
          errorEmailMessage: "",
          nameErrorMessage: "",
        });

        navigateToDashboard("/dashboard");
      }

      localStorageService.setUserSettings(response.result);
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
