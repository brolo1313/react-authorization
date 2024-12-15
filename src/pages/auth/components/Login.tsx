import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { useEffect, useState } from "react";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { useAuth } from "../../../context/AuthContext";
import { optionalSetFormState } from "../../../shared/helpers/useState";
import { API_URL } from "../../../config";
import { usePostApiData } from "../../../hooks/usePostApiData";

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
  const navigateToDashboard = useNavigate();

  const {
    data: loginData,
    error: loginError,
    triggerFetch: createProfile,
  } = usePostApiData(`${API_URL}/sign-in`, "POST");

  useEffect(() => {
    if (loginData) {
      updateUserSettings(loginData);
      navigateToDashboard("/dashboard");
    }
  }, [loginData]);

  useEffect(() => {
    if (loginError) {
      console.log("loginError", loginError);
    }
  }, [loginError]);

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

  const handleCreate = async () => {
    const { email, password } = formState;
    await createProfile({ email, password });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const emailValid = isEmailValid(email, setFormState);

    if (emailValid && password) {
      optionalSetFormState({ isLoading: true }, setFormState);
      await handleCreate();
      optionalSetFormState({ isLoading: false }, setFormState);
    }
  };

  const isButtonDisabled =
    isLoading || !!errorEmailMessage || !!errorPasswordMessage || !password;

  return (
    <div className="form-container">
      <h2>Login Page</h2>

      <form onSubmit={onSubmit}>
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
          disabled={isButtonDisabled}
        >
          {isLoading ? `Processing...` : `Sing in`}
        </button>
      </form>

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
