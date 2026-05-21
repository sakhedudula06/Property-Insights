import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeOff, Lock, Mail, LogIn, User } from 'lucide-react'
import { toast } from 'react-hot-toast'
// import { createRoot } from 'react-dom/client'
import api from '../lib/axios.js';

function Register() {
  const navigate = useNavigate();

  const redirectURL = import.meta.env.NODE_ENV === 'production' ? 'https://property-insights-1.onrender.com/login' : 'http://localhost:5173/login';

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(Eye);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  async function handleRegister(e) {
    try {
      e.preventDefault();

      if (!emailValue.trim() || !passwordValue.trim() || !nameValue.trim()) {
        toast.error("All fields are required");
        return;
      }

      const request = await api.post("/users/signup", {
        'email': emailValue,
        'password': passwordValue,
        "options": {
          "data": {
            "name": nameValue
          },
          "emailRedirectTo": redirectURL
        }
      });

      if (request.status === 200) {
        toast.success('Account created! Check your email to verify your account.');

        setTimeout(() => {
          navigate('/login');
        }, 2000);

        // const loginResponse = await api.post("/users/signin", {
        //   'email': emailValue,
        //   'password': passwordValue
        // });

        // console.log('Login Response:', loginResponse);
        // console.log('Token:', loginResponse.data?.data?.session?.access_token);

        // if (loginResponse.data?.data?.session?.access_token) {
        //   localStorage.setItem('token', loginResponse.data.data.session.access_token);
        //   toast.success('Account created! Redirecting...');
        //   navigate('/dashboard');
        // }else{
        //   console.error('No token in response');
        // }

      }

    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Registration failed";
      toast.error(errorMsg);
      console.error('Registration failed!', error);
    }
  }

  function handleShowPassword() {

    if (type === 'password' && icon === Eye) {

      try {
        setType('text');
        setIcon(EyeOff);
      } catch (error) {
        console.error('Error toggling view', error);
      }
    } else {
      setType('password');
      setIcon(Eye)
    }
  };


  return (
    <div className='bg-white p-14 shadow-md rounded-xl'>
      <div className='flex flex-col justify-center mb-16 items-center'>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">

          <circle cx="60" cy="60" r="50" fill="#EAF0FB" />

          <circle cx="60" cy="50" r="12" fill="url(#blueGradient)" />

          <path d="M35 85C35 70 50 65 60 65C70 65 85 70 85 85V88H35V85Z"
            fill="url(#blueGradient)" />

          <circle cx="88" cy="88" r="16" fill="#FFFFFF" />

          <path d="M88 80V96M80 88H96"
            stroke="#82C91E"
            stroke-width="4"
            stroke-linecap="round" />

          <defs>
            <linearGradient id="blueGradient" x1="35" y1="50" x2="85" y2="90">
              <stop offset="0%" stop-color="#5C7CFA" />
              <stop offset="100%" stop-color="#1C4ED8" />
            </linearGradient>
          </defs>

        </svg>
        <div className='flex flex-col justify-center items-center gap-5'>
          <p className='text-4xl font-bold'>Create Your Account</p>
          <p className='text-xl text-gray-400'>Let's get started! Fill in the details below to create your account.</p>
        </div>
      </div>

      <form onSubmit={handleRegister} className='mb-10'>
        <p className='font-bold text-xl mb-5'>Full Name</p>
        <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
          <User />
          <input onChange={(e) => setNameValue(e.target.value)} value={nameValue} name='Full Name' type='text' placeholder='Enter your full name' className='w-full h-full border-none focus:outline-none' required></input>
        </div>

        <p className='font-bold text-xl mb-5'>Email Address</p>
        <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
          <Mail />
          <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} name='email' type='email' placeholder='Enter your email address' className='w-full h-full border-none focus:outline-none' required />
        </div>

        <p className='font-bold text-xl mb-5'>Password</p>
        <div className='border-2 p-4 rounded-lg flex gap-7 mb-6'>
          <Lock />
          <input name='password' onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} type={type} placeholder='Enter your password' className='w-full h-full border-none focus:outline-none' required />
          {React.createElement(icon, { className: 'cursor-pointer', onClick: handleShowPassword })}
        </div>

        <button type='submit' className='flex bg-secondary text-secondary-content gap-7 justify-center text-3xl items-center p-5 mt-14 rounded-lg w-full hover:shadow-2xl active:bg-[rgba(55,124,251,0.8)] transition duration-200 ease-in-out '>
          <LogIn />
          Submit
        </button>
      </form>

      <div>
        <div></div>
        <div className='flex justify-center text-xl'>
          <p className='text-gray-500'>Already have an account? <Link to={'/login'} className='text-blue-500 text-xl cursor-pointer'>Log in.</Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Register