import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { optionalSetFormState } from "../../../shared/helpers/useState";
import { API_URL } from "../../../config";
import { usePostApiData } from "../../../hooks/usePostApiData";

const ResetPassword = () => {
  const [formState, setFormState] = useState<Partial<IFormState>>({
    email: "",
    isLoading: false,
    errorEmailMessage: "",
  });

  const { email, errorEmailMessage, isLoading } = formState;

  const navigateToLogin = useNavigate();

  const {
    data: resetPasswordData,
    error: resetPasswordError,
    triggerFetch: resetPassword,
  } = usePostApiData(`${API_URL}/reset-password`, "POST");

  useEffect(() => {
    if (resetPasswordData) {
      setFormState({
        ...formState,
        email: "",
        isLoading: false,
        errorEmailMessage: "",
      });

      navigateToLogin("/login");
    }
  }, [resetPasswordData]);

  const handleCreate = async () => {
    const { email } = formState;
    await resetPassword({ email });
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
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!errorEmailMessage && email) {
      optionalSetFormState({ isLoading: true }, setFormState);
      await handleCreate();
      optionalSetFormState({ isLoading: false }, setFormState);
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
