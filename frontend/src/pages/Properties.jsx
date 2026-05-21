import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast';
import api from '../lib/axios.js';


function Properties() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/properties')
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      }).catch(error => {
        console.error('Error fetching tenants:', error);
        toast.error(error.message);
      })
  }, [])

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('access_token');

    if (isAuthenticated == null) {
      navigate('/login');
    }
  }, [navigate]);

  if (isLoading) {
    return (<div className='min-h-screen'>
      <Navbar />
      <div className='flex relative flex-row mt-10 content-center gap-20'>
        <Menu />
        <div className="flex w-2/4 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>

      <Footer />
    </div>);
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex relative flex-row mt-10 content-center gap-20'>
        <Menu />
        <div className="overflow-x-auto">
          <table className="table w-full text-2xl">

            <thead>
              <tr>
                <th></th>
                <th>Tenant Name</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            {data && data.map(property => (

              <tbody key={property.id}>
                <tr className="hover">
                  <th>{property.id}</th>
                  <td>{property.tenant_id?.tenant_name}</td>
                  <td>{property.name}</td>
                  <td>{property.is_occupied ? 'Occupied' : 'Vacant'}</td>
                </tr>
              </tbody>


            ))}
          </table>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Properties