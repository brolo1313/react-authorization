import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { useLoader } from "../../../context/loaderContext";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";

const ResetPassword = () => {
  const [formState, setFormState] = useState({
    email: "",
    errorEmailMessage: "",
  });

  const { email, errorEmailMessage } = formState;
  const { showLoader, hideLoader, isLoading } = useLoader();

  const apiUrl = import.meta.env.VITE_API_URL;
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

  const sendForm = async (formState: Pick<IFormState, "email">) => {
    const { email } = formState;
    try {
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.log("response", response);
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
      throw error;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!errorEmailMessage && email) {
      showLoader();
      const response = await sendForm(formState);

      if (response.success) {
        setFormState({
          ...formState,
          email: "",
          errorEmailMessage: "",
        });

        navigateToLogin("/login");
        hideLoader();
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
