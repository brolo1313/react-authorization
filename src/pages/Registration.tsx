import { useState } from "react";
import { Link } from "react-router-dom";
import { TextInput } from "../shared/components/input/input";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Registration = () => {
  const [formState, setFormState] = useState({
    email: ``,
    password: ``,
    passwordConfirmation: ``,
    loading: false,
    accountCreationSuccessful: false,
    errorPasswordMessage: ``,
    errorEmailMessage: ``,
    passwordLength: ``,
  });

  //destructure the state
  const {
    email,
    password,
    passwordConfirmation,
    loading,
    accountCreationSuccessful,
    errorPasswordMessage,
    errorEmailMessage,
    passwordLength,
  } = formState;

  const isPasswordValid = (password: any, passwordConfirmation: any) => {
    if (!password || !passwordConfirmation) {
      setFormState({
        ...formState,
        errorPasswordMessage: "Password required",
      });

      return false;
    } else if (password.length < 8) {
      setFormState({
        ...formState,
        passwordLength: "Password is too short",
      });
      return false;
    } else if (password !== passwordConfirmation) {
      setFormState({
        ...formState,
        errorPasswordMessage: "Upps sorry Password did not match 😔",
      });
      return false;
    }

    return true;
  };

  const isEmailValid = (value: any) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(value)) {
      setFormState({
        ...formState,
        errorEmailMessage: "Enter a valid email",
      });

      return false;
    } else if (errorEmailMessage) {
      setFormState({
        ...formState,
        errorEmailMessage: "",
      });
    }

    return true;
  };

  const sendForm = (payload: any) => {
    // return fetch(
    //   "https://run.mocky.io/v3/03659a5b-fed5-4c5f-b8d0-4b277e902ed3",
    //   {
    //     method: `POST`,
    //     headers: {
    //       Accept: `application/json`,
    //       "Content-Type": `application/json`
    //     },
    //     body: JSON.stringify(payload)
    //   }
    // );
  };

  const handleChange = (e: any) => {
    let passwordError = "";

    // if (e.target.id === "password" && password.length < 7) {
    //   passwordError = "Password is too short";
    // }

    // setFormState({
    //   ...formState,
    //   [e.target.id]: e.target.value,
    //   passwordLength: passwordError, //In here it display the error
    // });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const passwordValid = isPasswordValid(password, passwordConfirmation);
    const emailValid = isEmailValid(email);

    // if (passwordValid && emailValid) {
    //   const response = await sendForm({
    //     email: formState.email,
    //     password: formState.password
    //   });

    //   if (response.ok) {
    //     setFormState({
    //       ...formState,
    //       accountCreationSuccessful: true,
    //       email: ``,
    //       password: ``,
    //       passwordConfirmation: ``,
    //       errorPasswordMessage: ""
    //     });
    //   }
    // }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <TextInput
          type="text"
          value={email}
          onChange={handleChange}
          id="email"
          label="Email"
          required
          error={errorEmailMessage}
        />
        <TextInput
          type="password"
          value={password}
          onChange={handleChange}
          id="password"
          required
          label="password"
          isPassword
          error={passwordLength} //Password lenght error
        />
        <TextInput
          type="password"
          value={passwordConfirmation}
          onChange={handleChange}
          id="passwordConfirmation"
          required
          label="Confirm password"
          isPassword
          error={errorPasswordMessage}
        />
        <button
          type="submit"
          name="action"
          onClick={onSubmit}
          disabled={!formState.email}
        >
          {loading ? `Loading...` : `Sign Up`}
        </button>

        {accountCreationSuccessful && !loading ? (
          <p>You have succefully create and account 👏🏾</p>
        ) : null}

        <Link to="/login">Go to Registration</Link>
      </div>
    </div>
  );
};

export default Registration;
