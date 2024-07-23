import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../Utils/Helper';
import axiosInstance from '../Utils/AxiosInstance';
import PasswordInput from '../Input/PasswordInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    // Login API CALL
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.token) {
        localStorage.setItem("userInfo", JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          token: response.data.token,
        }));
        navigate('/dashboard');
      }

      console.log(response.data.name);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-300'>
      <div className='flex flex-col rounded-2xl shadow-2xl shadow-black w-1/4 p-4'>
        <h1 className='text-xl font-semibold'>Login</h1>
        <form className='flex flex-col gap-3' onSubmit={submitHandler}>
          <label className='text-left font-serif'>Email</label>
          <input
            type="email"
            placeholder="Email"
            className='input-box p-2 font-serif text-black border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='text-left font-serif'>Password</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 pb-1 text-md'>{error}</p>}
          <button
            type='submit'
            className="bg-orange-700 p-2 rounded text-white active:bg-orange-800"
          >
            Login
          </button>
          <p>
            Not registered yet?{" "}
            <Link to={"/signup"} className='text-orange-600 underline'>
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
