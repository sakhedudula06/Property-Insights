import { Search, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
// import cityImage from '../assets/transparent.png'
import logo from '../assets/MRI_Logo_transparent.svg'

const Navbar = () => {

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }


  return (
    <header className='navbar bg-base-100 flex flex-row items-center justify-between px-7 py-5 sticky top-0 z-50'>
      <div className='flex-1 gap-x-24 gap-y-24'>
        <Link to={"/dashboard"}>
          <img alt='logo' src={logo} className='w-48' />
        </Link>
      </div>

      <div className='flex flex-row gap-16 items-center'>
        <div>
          <label className="flex cursor-pointer gap-2">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>


            <input type="checkbox" className="toggle theme-controller" value="propertydark" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>

        <div className='flex items-center gap-3'>

          <input type='search' name='search' className='w-80 h-9 relative z-0 border-2 border-solid border-neutral rounded-2xl px-[10px] [&::-webkit-search-cancel-button]:hidden'></input>
          <Search className='w-6 h-6  right-12' />
        </div>



        <div className="avatar placeholder dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} className="bg-neutral text-neutral-content rounded-full btn m-1">
            <span className="text-3xl">
              <User />
            </span>
          </div>

          <ul tabIndex={0} className="dropdown-content menu bg-neutral rounded-box z-[1] w-52 p-2 shadow" onClick={handleLogout}>
            <li className='text-base'><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar