import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { optionalSetFormState } from "../../../shared/helpers/useState";
import { API_URL } from "../../../config";

const ResetPassword = () => {
  const [formState, setFormState] = useState<Partial<IFormState>>({
    email: "",
    isLoading: false,
    errorEmailMessage: "",
  });

  const { email, errorEmailMessage, isLoading } = formState;

  const navigateToLogin = useNavigate();

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

  const sendForm = async (formState: Partial<IFormState>) => {
    const { email } = formState;
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
      throw error;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!errorEmailMessage && email) {
      optionalSetFormState({isLoading: true}, setFormState)
      const response = await sendForm(formState);

      if (response.success) {
        setFormState({
          ...formState,
          email: "",
          isLoading: false,
          errorEmailMessage: "",
        });

        navigateToLogin("/login");
      }
    }
  };

  const isButtonDisabled = isLoading || !!errorEmailMessage || !email;

  return (
    <div className="form-container">
      <h2>Reset Password Page</h2>
      <TextInput
        type="text"
        value={email}
        onChange={handleChange}
        id="email"
        label="Email"
        required
        error={errorEmailMessage}
        disabled={isLoading}
      />
      <button
        type="submit"
        name="action"
        onClick={onSubmit}
        disabled={isButtonDisabled}
      >
        {isLoading ? `Processing...` : `Reset password`}
      </button>
      <div>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
