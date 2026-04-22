import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import cityscape from '../assets/Stunning cityscape at golden hour.png'
import { UserStar } from 'lucide-react';
import { House } from 'lucide-react';
import Loading from '../utils/Loading.jsx'

function Roles() {

  {/*const [loading, setLoading] = useState(false);

  function handleClickedRole() {
    if (loading === false) {
      setLoading(true);
      const root = createRoot(document.getElementById('card'));
      root.render(<span className="loading loading-dots loading-lg"></span>);
    } else {
      setLoading(false);
    }
  }
*/}

  return (
    <div className='min-h-screen'>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${cityscape})`,
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md" id='card'>
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Welcome to Property Insights.
            </p>
            <ul className="menu bg-neutral rounded-box">
              <li>
                <a href='#'>
                  <House />
                  Tenant
                </a>
              </li>
              <li>
                <a href='/login' onClick={Loading}>
                  <UserStar />
                  Admin
                </a>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roles