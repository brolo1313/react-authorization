import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/components/input/input";
import { isEmailValid } from "../../../shared/helpers/validation";
import { IFormState } from "../../../shared/models/auth";
import { optionalSetFormState } from "../../../shared/helpers/useState";
import { usePostApiData } from "../../../hooks/usePostApiData";
import { ShowToasterSuccess } from "../../../shared/helpers/showToaster";

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
  } = usePostApiData(`reset-password`, "POST");

  useEffect(() => {
    if (resetPasswordData) {
      setFormState({
        ...formState,
        email: "",
        isLoading: false,
        errorEmailMessage: "",
      });

      ShowToasterSuccess({message:resetPasswordData.message})
      navigateToLogin("/login");
    }
  }, [resetPasswordData]);

  useEffect(() => {
    if (resetPasswordError) {
      console.log("resetPasswordError", resetPasswordError);
    }
  }, [resetPasswordError]);

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
    <div className="auth-container">
      <div className="form-container">
        <h2 className={'text-center'}>Reset Password</h2>
        <form onSubmit={onSubmit}>
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
            disabled={isButtonDisabled}
          >
            {isLoading ? `Processing...` : `Reset password`}
          </button>
        </form>

        <div>
          <Link to="/login">Go to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
