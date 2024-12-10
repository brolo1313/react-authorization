import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <p>Welcome to the login page</p>

      <Link to="/reset-password">Go to Reset Pass</Link>
      <Link to="/registration">Go to Registration</Link>
    </div>
  );
};

export default Login;
