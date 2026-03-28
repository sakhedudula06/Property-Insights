import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'

const HomePage = () => {

  return (
    <div className='min-h-screen bg-[rgb(244,244,244)] h-[1000px]'>
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