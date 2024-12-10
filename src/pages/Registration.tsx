import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <div>
      <h2>Registration Page</h2>
      <p>Welcome to the registration page</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Registration;
