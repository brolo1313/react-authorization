import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { useEffect, useState } from "react";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { useAuth } from "../../../context/AuthContext";
import { optionalSetFormState } from "../../../shared/helpers/useState";
import { usePostApiData } from "../../../hooks/usePostApiData";
import { ShowToasterSuccess } from "../../../shared/helpers/showToaster";
import { GoogleLogin } from "@react-oauth/google";

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
  } = usePostApiData("sign-in", "POST");

  const {
    data: googleOAuthData,
    error: googleOAuthError,
    triggerFetch: googleOAuthProfile,
  } = usePostApiData("auth/google/callback", "POST");

  useEffect(() => {
    if (loginData) {
      updateUserSettings(loginData);
      ShowToasterSuccess({ message: "You are now signed in" });
      navigateToDashboard("/dashboard");
    }
  }, [loginData]);

  useEffect(() => {
    if (googleOAuthData) {
      updateUserSettings(googleOAuthData);
      ShowToasterSuccess({ message: "You are now signed in" });
      navigateToDashboard("/dashboard");
    }
  }, [googleOAuthData]);

  useEffect(() => {
    if (loginError) {
      // console.log("loginError", loginError);
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

  // Функція для декодування Base64Url
  const base64UrlDecode = (base64Url: string) => {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64); // Декодування з Base64
    return JSON.parse(decoded); // Перетворення на об'єкт JSON
  };

  // Функція для парсингу JWT
  const parseJwt = (token: string) => {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const payload = base64UrlDecode(parts[1]); // Витягуємо payload
    return payload;
  };

  return (
    <div className="auth-container">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const { credential } = credentialResponse;
          console.log("credentialResponse", credentialResponse);
          const { email, family_name, given_name, name, picture } = parseJwt(
            credential as string
          );

          const dataForServer = {
            email,
            firstName: family_name,
            // id:,
            idToken: credential,
            lastName: given_name,
            name,
            photoUrl: picture,
            provider: "GOOGLE",
          };
          console.log(dataForServer);
          await googleOAuthProfile(dataForServer);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
      <div className={`form-container ${isLoading ? "loading" : ""}`}>
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
    </div>
  );
};

export default Login;
