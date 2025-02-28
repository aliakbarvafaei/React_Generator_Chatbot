import React, { useState } from 'react';
import { KdFormLoader, KdpaInput, KdpaPrimaryButton } from 'your-component-library';

const UserRegistrationForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    // You can add more logic here to handle form submission, validations, etc.
  };

  return (
    <KdFormLoader errorMode="onSubmit" loading={loading}>
      <KdpaInput label="Username" placeholder="Enter your username" variant="outlined" size="medium" type="text" />
      <KdpaInput label="Email" placeholder="Enter your email" variant="outlined" size="medium" type="email" />
      <KdpaInput label="Password" placeholder="Enter your password" helperText="Please enter a secure password" variant="outlined" size="medium" type="password" />
      <KdpaInput label="Repeat Password" placeholder="Repeat your password" helperText="Please repeat your password" variant="outlined" size="medium" type="password" />
      <KdpaPrimaryButton variant="contained" title="Submit" loading={loading} onClick={handleSubmit} />
    </KdFormLoader>
  );
};

export default UserRegistrationForm;