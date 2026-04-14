import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import React, { useState } from 'react'

function Login() {

  const [password, ShowPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(EyeOff);

  function handleShowPassword() {
    if (type === 'password') {
      setIcon(Eye);
      setType('text');
    } else {
      setIcon(EyeOff)
      setType('password')
    }
  }


  return (
    <div className='bg-white p-14 shadow-md rounded-xl'>
      <div className='text-center mb-14'>
        <p className='font-bold text-[#183450] text-5xl mb-10'>Welcome Back</p>
        <p className='text-2xl text-gray-500'>Sign in to your Property Insights account</p>
      </div>
      <div>
        <p className='font-bold text-xl mb-5'>Email Address</p>
        <div className='border-2 p-4 rounded-lg flex gap-7 mb-16'>
          <Mail />
          <input name='email' type='email' placeholder='Enter your email address' className='w-full h-full border-none focus:outline-none' required />
        </div>

        <p className='font-bold text-xl mb-5'>Password</p>
        <div className='border-2 p-4 rounded-lg flex gap-7 mb-16'>
          <Lock />
          <input name='password' type={password} placeholder='Enter your password' className='w-full h-full border-none focus:outline-none' required />
          <Eye className='cursor-pointer' onClick={handleShowPassword}/>
        </div>
      </div>
    </div>
  )
}

export default Login
