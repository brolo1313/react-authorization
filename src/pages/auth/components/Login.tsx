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
import { parseJwt } from "../../../shared/helpers/common";

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
      const userData = {
        ...googleOAuthData,
        isSocial: true,
      };
      updateUserSettings(userData);
      optionalSetFormState({ isLoading: false }, setFormState);
      ShowToasterSuccess({ message: "You are now signed in" });
      navigateToDashboard("/dashboard");
    }
  }, [googleOAuthData]);

  useEffect(() => {
    console.log("Login Error: ", loginError);
    console.log("Google OAuth Error: ", googleOAuthError);
  
    if (loginError || googleOAuthError) {
      optionalSetFormState({ isLoading: false }, setFormState);
    }
  }, [loginError, googleOAuthError]);

  const handleOAuthResponse = async (credentialResponse: {
    clientId: string;
    credential: string;
    select_by: string;
  }) => {
    optionalSetFormState({ isLoading: true }, setFormState);

    const { credential } = credentialResponse;
    const { email, family_name, given_name, name, picture } = parseJwt(
      credential as string
    );

    const dataForServer = {
      email,
      firstName: family_name,
      idToken: credential,
      lastName: given_name,
      name,
      photoUrl: picture,
      provider: "GOOGLE",
    };
    await googleOAuthProfile(dataForServer);
  };
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
    <div className="auth-container">
      <GoogleLogin
        text="signin"
        locale="en"
        type="standard"
        size="large"
        theme="filled_black"
        width="240px"
        auto_select={false}
        onSuccess={async (credentialResponse) =>
          handleOAuthResponse(
            credentialResponse as {
              clientId: string;
              credential: string;
              select_by: string;
            }
          )
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />

      <div className={`form-container ${isLoading ? "loading" : ""}`}>
        <h2  className={'text-center'}>Login</h2>

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
