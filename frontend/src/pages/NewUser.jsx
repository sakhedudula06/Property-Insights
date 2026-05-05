import React from 'react'
import { House } from 'lucide-react';
import Register from '../components/Register';
import cityImage from '../assets/transparent.png'
import logo from '../assets/MRI_Logo_transparent.svg'

const NewUser = () => {
  return (
    <div className='min-h-screen bg-[rgb(250,250,250)] grid grid-cols-2'>
      <div className='bg-[rgba(235,245,250,1)] p-16'>
        <div className='mb-20'>
          <img src={logo} className='w-4/5' />
        </div>
        <div className='mb-5'>
          

          

          <div className='text-gray-500 text-3xl'>
            <p>Register to access powerful insights and</p>
            <p>streamline your property management.</p>
          </div>
        </div>
        <div>
          <img className='h-[290px]' src={cityImage} />
        </div>

      </div>
      <div className='p-16' id='card'>
        <Register/>
      </div>


    </div>
  )
}

export default NewUser