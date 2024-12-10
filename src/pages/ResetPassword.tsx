import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Reset Password Page</h2>
        <p>Welcome to the Reset Password page</p>
        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
