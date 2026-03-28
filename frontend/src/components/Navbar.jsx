import { Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='navbar bg-base-100 flex flex-row items-center justify-between px-7 py-5 sticky top-0 z-50'>
      <div className='flex-1 gap-x-24 gap-y-24'>
        <Link to={"/dashboard"}>
          <img alt='logo' src='/src/assets/MRI_Software_logo.svg' className='w-48' />
        </Link>
        <p className='text-2xl font-extrabold'>Tenant Payment Tracker</p>
      </div>

      <div>
        <input type='search' name='search' className='w-80 h-9 relative z-0 border-2 border-solid border-neutral-950 rounded-2xl px-[10px] [&::-webkit-search-cancel-button]:hidden' />
        <Search className='w-6 h-6 absolute z-10 right-12' />
      </div>
    </header>
  )
}

export default Navbar