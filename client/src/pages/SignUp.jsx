
import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the signup route on the server with the form data
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle success response
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
        {/* Other form fields */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;