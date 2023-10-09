
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Make a POST request to the signin route on the server with the form data
    fetch('http://localhost:3000/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data); // Handle success response
        if (data.success) {
          navigate('/'); // Redirect to home page on successful signin
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || 'Server error'); // Handle error
      });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
      <div className="text-center mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;