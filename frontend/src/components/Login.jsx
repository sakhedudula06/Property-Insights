import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import Loading from '../utils/Loading';

function Login() {

  const navigate = useNavigate();

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(Eye);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  async function handleSignIn(e) {
    try {
      e.preventDefault();

      if(!emailValue.trim() || !passwordValue.trim()){
        toast.error("All fields are required");
        return;
      }



      const request = await api.post("/users/signin", {
        'email': emailValue,
        'password': passwordValue
      })

      if (request.status === 200) {
        toast.success('Successfully');
        navigate('/dashboard');

      }

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid credentials")
      } else {
        toast.error("Sign in failed. Please try again.")
      }
      console.error('SignIn failed!', error);

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
      <div className='text-center mb-14'>
        <p className='font-bold text-[#183450] text-5xl mb-10'>Welcome Back</p>
        <p className='text-2xl text-gray-500'>Sign in to your Property Insights account</p>
      </div>

      <form onSubmit={handleSignIn}>
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

        <div className='flex flex-row-reverse'>
          <Link to={'/passwordreset'} className='justify-end text-blue-500 text-xl'>Forgot password?</Link>
        </div>

        <button type='submit' className='flex bg-secondary text-secondary-content gap-7 justify-center text-3xl items-center p-5 mt-14 rounded-lg w-full hover: '>
          <LogIn />
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login
