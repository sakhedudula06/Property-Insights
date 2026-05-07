import React from 'react'
import { House } from 'lucide-react'
import { Users } from 'lucide-react';
import { Wallet } from 'lucide-react';
import { ClipboardPlus } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Link } from 'react-router';

const Menu = () => {
  return (
      <div className='menu rounded-box items-center static gap-x-3 flex flex-col gap-y-6 top-0 transition-none w-80'>
        <Link to={"/dashboard/properties"} className=' bg-[rgb(204,230,72)] justify-center items-center rounded-box gap-x-5 flex flex-row h-14 ml-5 py-[2px] px-[15px] w-[240px] gap-y-5 cursor-pointer transition duration-200 hover:shadow-lg active:bg-[rgb(157,182,32)]'>
          <div className='flex items-center justify-start w-full gap-x-5 pl-5'>
            <House className='h-[25px] w-[25px] text-black'/>
            <p className='text-[rgb(5,78,102)] font-bold text-2xl'>Properties</p>
          </div>
        </Link>
        <Link to={"/dashboard/tenants"} className='bg-[rgb(204,230,72)] justify-center items-center rounded-box gap-x-5 flex flex-row h-14 ml-5 py-[2px] px-[15px] w-[240px] gap-y-5 cursor-pointer transition duration-200 hover:shadow-lg active:bg-[rgb(157,182,32)]'>
          <div className='flex items-center justify-start w-full gap-x-5 pl-5'>
            <Users className='h-[25px] w-[25px] text-black'/>
            <p className='text-[rgb(5,78,102)] font-bold text-2xl'>Tenants</p>
          </div>
        </Link>
        <Link to={"/dashboard/payments"} className='bg-[rgb(204,230,72)] justify-center items-center rounded-box gap-x-5 flex flex-row h-14 ml-5 py-[2px] px-[15px] w-[240px] gap-y-5 cursor-pointer transition duration-200 hover:shadow-lg active:bg-[rgb(157,182,32)]'>
          <div className='flex items-center justify-start w-full gap-x-5 pl-5'>
            <Wallet className='h-[25px] w-[25px] text-black'/>
            <p className='text-[rgb(5,78,102)] font-bold text-2xl'>Payments</p>
          </div>
        </Link>
        <Link to={"/dashboard/reports"} className='bg-[rgb(204,230,72)] justify-center items-center rounded-box gap-x-5 flex flex-row h-14 ml-5 py-[2px] px-[15px] w-[240px] gap-y-5 cursor-pointer transition duration-200 hover:shadow-lg active:bg-[rgb(157,182,32)]'>
          <div className='flex items-center justify-start w-full gap-x-5 pl-5'>
            <ClipboardPlus className='h-[25px] w-[25px] text-black'/>
            <p className='text-[rgb(5,78,102)] font-bold text-2xl'>Reports</p>
          </div>
        </Link>
        <Link to={"/dashboard/settings"} className='bg-[rgb(204,230,72)] justify-center items-center rounded-box gap-x-5 flex flex-row h-14 ml-5 py-[2px] px-[15px] w-[240px] gap-y-5 cursor-pointer transition duration-200 hover:shadow-lg active:bg-[rgb(157,182,32)]'>
          <div className='flex items-center justify-start w-full gap-x-5 pl-5'>
            <Settings className='h-[25px] w-[25px] text-black'/>
            <p className='text-[rgb(5,78,102)] font-bold text-2xl'>Settings</p>
          </div>
        </Link>
      </div>

  )
}

export default Menu