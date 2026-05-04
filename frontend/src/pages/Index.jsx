import React from 'react'
import Login from '../components/Login.jsx'
import ForgotPassword from '../components/ForgotPassword.jsx';
import { House, ArrowLeft, CircleQuestionMark  } from 'lucide-react';
import Loading from '../utils/Loading.jsx';
import { useState } from 'react';
import cityImage from '../assets/transparent.png'
import logo from '../assets/MRI_Logo_transparent.svg'

const Index = () => {

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginIcon, setLoginIcon] = useState(CircleQuestionMark);
  

  function handleLoginIcon(){
    if (loginIcon === CircleQuestionMark && showForgotPassword === false) {

      try {
        setLoginIcon(ArrowLeft);
      } catch (error) {
        console.error('Error toggling view', error);
      }
    } else {
      setLoginIcon(CircleQuestionMark)
    }
  }



  // useEffect(() =>{
    

  //   if (loginIcon === CircleQuestionMark && showForgotPassword === false) {

  //     try {
  //       setLoginIcon(ArrowLeft);
  //     } catch (error) {
  //       console.error('Error toggling view', error);
  //     }
  //   } else {
  //     setLoginIcon(CircleQuestionMark)
  //   }

  // }, [loginIcon, setShowForgotPassword])
  

  return (

    <div className='min-h-screen bg-[rgb(250,250,250)] grid grid-cols-2'>
      <div className='bg-[rgba(235,245,250,1)] p-16'>
        <div className='mb-20'>
          <img src={logo} className='w-48' />
        </div>
        <div className='mb-5'>
          <div className='bg-sky-200 w-60 p-3 text-[#0d59b0] flex gap-5 rounded-lg mb-8'>
            <House />
            <p className='font-bold'>PROPERTY INSIGHTS</p>
          </div>

          <div className='mb-8'>
            <p className='font-bold text-[#183450] text-7xl'>Smarter Data.</p>
            <p className='font-bold text-[#183450] text-7xl'>Better Decisions.</p>
          </div>

          <div className='text-gray-500 text-3xl'>
            <p>Sign in to access powerful insights and</p>
            <p>streamline your property management.</p>
          </div>
        </div>
        <div>
          <img className='h-[290px]' src={cityImage} />
        </div>

      </div>
      <div className='p-16' id='card' onChange={handleLoginIcon}>
        {showForgotPassword ? (<ForgotPassword />) : (<Login />)}
        <div className='flex w-full justify-center'>
          <a className='flex items-center gap-2 content-center mt-5 text-blue-500 text-2xl cursor-pointer' onClick={() =>{ setShowForgotPassword(!showForgotPassword);} }>{React.createElement(showForgotPassword ? ArrowLeft : CircleQuestionMark)}
  {showForgotPassword ? 'Back to Login' : 'Forgot password'}</a>
        </div>
        <p></p>
      </div>


    </div>
  )
}

export default Index