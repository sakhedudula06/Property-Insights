import React, { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import { useNavigate } from 'react-router'

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('access_token');

    if (isAuthenticated == null) {
      navigate('/login');
    }
  }, []);

  // function checkIfAuthenticated() {
  //   const isAuthenticated = localStorage.getItem('token');

  //   if (isAuthenticated == null) {
  //     navigate('/login');
  //   }else{
  //     console.log('User is authenticated');
  //   }
  // }

  // checkIfAuthenticated();

  return (
    <div className='min-h-screen bg-[rgb(244,244,244)]'>
      <Navbar />
      <div className='flex relative flex-row mt-10 content-center gap-20'>
        <Menu />
        <div className='flex flex-col mt-20 gap-5 content-between'>
          <div className='grid grid-cols-2 items-center gap-5 content-start'>
            <div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Paid Tenants</div>
                  <div className="stat-value">12</div>
                </div>
              </div>
            </div>

            <div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Paid Tenants</div>
                  <div className="stat-value">12</div>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 items-center '>
            <table className='table'>
              <thead>
                <tr>
                  <th></th>
                  <th>Tenant Name</th>
                  <th>Unit</th>
                  <th>Rent Due Date</th>
                  <th>Status</th>
                  <th>Amount Due</th>
                </tr>
              </thead>
            </table>

          </div>
        </div>


      </div>

      <Footer />
    </div>
  )
}

// export async function loader() {

// }

export default HomePage