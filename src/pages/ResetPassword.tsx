import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../shared/components/input/input';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [loading, setLoading] = useState('');



  const handleChange = (e: any) => {
  };

  const onSubmit = (e: any) => {
  };

  return (
    <div className="page-container">
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
          disabled={!email}
        >
          {loading ? `Loading...` : `Reset password`}
        </button>

        <Link to="/login">Go to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
