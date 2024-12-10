import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div>
      <h2>Reset Password Page</h2>
      <p>Welcome to the Reset Password page</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default ResetPassword;
