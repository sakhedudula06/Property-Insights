import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import { Plus } from 'lucide-react'

const Tenants = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/v1/tenants/')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

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
  } //
  //return <div>{data.title}</div>;



  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex relative flex-row mt-10 content-center gap-20'>
        <Menu />
        <div className="overflow-x-auto" id='root'>

          {/* head */}
          {data && data.map(tenant => (
            <table className="table w-full text-lg">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Amount Due</th>
                    <th>Email</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={tenant.id} className="hover">
                    <th>{tenant.id}</th>
                    <td>{tenant.tenant_name}</td>
                    <td>R{tenant.amount_due}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.contact}</td>
                  </tr>
                </tbody>
              </table>
            </table>

          ))}

          <div>
            <button className="btn btn-success flex flex-row">
              <Plus />
              Add
            </button>
            {/* <button className="btn btn-square btn-outline">
              Delete
            </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Tenants