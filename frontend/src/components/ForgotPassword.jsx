import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { Mail, Send, Clock, ShieldCheck  } from 'lucide-react'
import Login from './Login.jsx';
import { MdMarkEmailRead } from "react-icons/md";
import lockImage from '../assets/ChatGPT Image Apr 23, 2026, 11_07_18 AM.png'


function ForgotPassword() {

  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');



  async function handleSignIn(e) {
    try {
      e.preventDefault();

      if (!emailValue.trim()) {
        toast.error("All fields are required");
        return;
      }

      const request = await api.post("/users/passwordreset", {
        'email': emailValue,
      })

      if (request.status === 200) {
        toast.success('Successfully');
        navigate('/dashboard');

      }

    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Password reset failed";
      toast.error(errorMsg);
      console.error('Login failed!', error);

    }
  }

  function successfullySentLink() {
    try {
      const root = createRoot(document.getElementById('card'));
      root.render(<div className="flex flex-col justify-center items-center mb-16">

        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">


          <circle cx="60" cy="60" r="50" fill="#E9F2E3" />

          <rect x="30" y="45" width="60" height="40" rx="10" fill="url(#blueGradient)" />

          <path d="M30 50 L60 70 L90 50 L90 50 Q90 45 85 45 L35 45 Q30 45 30 50 Z"
            fill="#FFFFFF" />


          <path d="M30 50 L60 70 L30 80 Z" fill="#4C6EF5" opacity="0.3" />
          <path d="M90 50 L60 70 L90 80 Z" fill="#4C6EF5" opacity="0.3" />


          <circle cx="85" cy="45" r="14" fill="#82C91E" />


          <path d="M79 45 L84 50 L92 40"
            stroke="#FFFFFF"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round" />


          <defs>
            <linearGradient id="blueGradient" x1="30" y1="45" x2="90" y2="85">
              <stop offset="0%" stop-color="#5C7CFA" />
              <stop offset="100%" stop-color="#1C4ED8" />
            </linearGradient>
          </defs>

        </svg>
        <div className='flex flex-col justify-center items-center gap-5 w-[500px]'>
          <p className='text-4xl font-bold'>Check Your Email!</p>
          <div className='flex flex-col justify-center items-center text-xl '>
            <p className='text-2xl text-gray-400'>We've sent a password reset link to </p>
            <span className='font-bold text-black'>johndoe@example.com</span>
          </div>

          <div>
            <div className='border-t-2 flex gap-5 justify-center items-center p-5'>
              <div className='bg-[rgb(232,246,254)] rounded-full'>
                <Mail className='w-7 h-7 m-3 text-[#68a4e8]' />
              </div>

              <div className='text-xl text-gray-400'>Click the link in the email to rest your password.</div>
            </div>

            <div className='border-t-2 flex gap-5 justify-center items-center p-5'>
              <div className='bg-[rgb(232,246,254)] rounded-full'>
                <Clock className='w-7 h-7 m-3 text-[#68a4e8]' />
              </div>

              <div className='text-xl text-gray-400'>The link will expire in 24 hours for security reasons</div>
            </div>

            <div className='border-t-2 flex gap-5 justify-center items-center p-5'>
              <div className='bg-[rgb(232,246,254)] rounded-full'>
                <ShieldCheck className='w-7 h-7 m-3 text-[#68a4e8]' />
              </div>

              <div className='text-xl text-gray-400'>If you don't see the email, check your spam or junk folder</div>
            </div>

            <button className='flex bg-secondary text-secondary-content gap-7 justify-center text-3xl items-center p-4 mt-14 rounded-lg w-full hover: '>
              Back to Sign In
            </button>

            <div className='flex justify-center items-center mt-8 text-xl text-gray-400'>
              <p>Didn't receive the email? <span className='text-blue-500 cursor-pointer' onClick={root.unmount()}>Resend Link</span></p>
            </div>
          </div>
        </div>
      </div>);
    } catch (error) {
      toast.error("Error")
      console.error('Client failed!', error);
    }
  }

  return (
    <div className='bg-white p-14 shadow-md rounded-xl' id='card'>
      <div className='flex flex-col justify-center mb-16'>
        <img className='bg-transparent' src={lockImage}></img>
        <div className='flex flex-col justify-center items-center gap-5'>
          <p className='text-4xl font-bold'>Forgot Password?</p>
          <p className='text-xl text-gray-400'>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSignIn} className='mb-10'>
          <p className='font-bold text-xl mb-5'>Email Address</p>
          <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
            <Mail />
            <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} name='email' type='email' placeholder='Enter your email address' className='w-full h-full border-none focus:outline-none' required />
          </div>

          <button type='submit' className='flex bg-secondary text-secondary-content gap-7 justify-center text-3xl items-center p-5 mt-14 rounded-lg w-full hover: ' onClick={successfullySentLink}>
            <Send />
            Send Reset Link
          </button>
        </form>
      </div>
      <div></div>
    </div>
  )
}

export default ForgotPassword