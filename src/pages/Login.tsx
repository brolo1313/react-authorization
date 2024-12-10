import { Link } from "react-router-dom";
import { TextInput } from "../shared/components/input/input";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>("");

  const [name, setName] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
  };

  const onSubmit = async (e: any) => {
  };
  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Login Page</h2>
        <p>Welcome to the login page</p>

        <TextInput
          type="text"
          value={name}
          onChange={handleChange}
          id="name"
          label="Name"
          required
          error={errorNameMessage}
        />

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
          disabled={!email && !name}
        >
          {loading ? `loading...` : `Sing in`}
        </button>

        <Link to="/reset-password">Go to Reset Pass</Link>
        <Link to="/registration">Go to Registration</Link>
      </div>
    </div>
  );
};

export default Login;
