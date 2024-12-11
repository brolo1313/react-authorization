import { Link } from "react-router-dom";
import { TextInput } from "../shared/components/input/input";
import { useEffect, useState } from "react";
import { isEmailValid } from "../shared/helpers/validation";
import { FormState } from "../shared/models/auth";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    loading: false,
    errorPasswordMessage: "",
    errorEmailMessage: "",
    nameErrorMessage: "",
  });

  const { email, password, loading, errorPasswordMessage, errorEmailMessage } =
    formState;

  useEffect(() => {
    // This will run whenever formState changes
    console.log("Updated formState:", formState);
  }, [formState]);

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

  const sendForm = async (formState: FormState) => {
    const { email, password } = formState;
    try {
      const response = await fetch(
        "https://node-implementation.vercel.app/api/sign-in",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // You can include body if needed
          body: JSON.stringify({email,password})
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
        setFormState((prevState) => ({ ...prevState, loading: false }));
      } else {
        console.error("Unknown error:", error);
        setFormState((prevState) => ({ ...prevState, loading: false }));
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

      // console.log("formState", formState);
      // console.log('response', response);
    }
  };

  const isButtonDisabled =
  loading ||
  !!errorEmailMessage ||
  !!errorPasswordMessage || !password;

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
        {loading ? `Loading...` : `Sing in`}
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
