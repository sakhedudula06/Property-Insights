import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import { Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import api from '../lib/axios.js';
import { useNavigate } from 'react-router'


const Tenants = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [propData, setPropData] = useState(null);
  const [selectedProp, setSelectedProp] = useState('')

  useEffect(() => {
    api.get('/tenants/')
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      }).catch(error =>{
        console.error('Error fetching properties:', error
      ), toast.error(error)
      })
  }, []);

  const navigate = useNavigate();
  
    useEffect(() => {
      const isAuthenticated = sessionStorage.getItem('access_token');
  
      if (isAuthenticated == null) {
        navigate('/login');
      }
    }, [navigate]);

  function getPropData() {
    api.get('/properties/')
      .then(res => {
        setPropData(res.data);
      })
      .catch(error => {console.error('Error fetching properties:', error
      ), toast.error(error)});
  }

  const handleSelectedProp = (event) => {
    setSelectedProp(event.target.value);
  }



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

  async function handleRegister(e) {
    try {
      e.preventDefault();

      if(propData?.is_occupied === true){
        toast.error('Property is occupied');
      }

      const request = await api.post('/tenants/insert', {
        'tenant_name': nameValue,
        'email': emailValue,
        'contact': contactValue,
        'property_id': selectedProp,
        'amount_due': 0
      })


      if (request.status === 200) {
        return (toast.success('Successfully'));
      }

    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Failed";
      toast.error(errorMsg);
      console.error('Failed!', error);
    }
  }

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex relative flex-row mt-10 content-center gap-20'>
        <Menu />
        <div className="overflow-x-auto" id='root'>

          {/* head */}
          <table className="table w-full text-lg">

            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Amount Due</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Property</th>
              </tr>
            </thead>
            {data && data.map(tenant => (

              <tbody key={tenant.id}>
                <tr className="hover">
                  <th>{tenant.id}</th>
                  <td>{tenant.tenant_name}</td>
                  <td>R{tenant.amount_due}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.contact}</td>
                  <td>{tenant.property_id?.name}</td>
                </tr>
              </tbody>


            ))}
          </table>



          <div className='mt-7' onClick={getPropData}>
            <button className="btn btn-success flex flex-row" onClick={() => document.getElementById('my_modal_1').showModal()}>
              <Plus />
              Add
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white">
                <form onSubmit={handleRegister}>
                  <p className='font-bold text-xl mb-5'>Full Name</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input onChange={(e) => setNameValue(e.target.value)} value={nameValue} name='Full Name' type='text' placeholder='Enter full name' className='w-full h-full border-none focus:outline-none' required></input>
                  </div>

                  <p className='font-bold text-xl mb-5'>Email</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} type='text' name='Email' placeholder='Enter email' className='w-full h-full border-none focus:outline-none' required>
                    </input>
                  </div>

                  <p className='font-bold text-xl mb-5'>Contact</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input onChange={(e) => setContactValue(e.target.value)} type='text' name='Email' placeholder='eg. 071-000-0000' className='w-full h-full border-none focus:outline-none' required>
                    </input>
                  </div>

                  <p className='font-bold text-xl mb-5'>Rent</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input type='text' name='Amount' placeholder='0.00' value={'R1500.00'} className='w-full h-full text-[rgb(161,161,161)] border-none focus:outline-none' readOnly>
                    </input>
                  </div>

                  <select className="select w-full max-w-max" value={selectedProp} onChange={handleSelectedProp}>

                    <option disabled selected>Properties</option>
                    {propData && propData.map(property => (

                      <option key={property.id} value={[property.id]}>
                        {`${property.name} - ${property.is_occupied ? 'Occupied' : 'Vacant'}`}
                      </option>
                    ))}
                  </select>

                  <button type='submit' className='flex bg-stone-400 text-secondary-content gap-7 justify-center text-3xl items-center p-5 mt-14 rounded-lg w-full hover:shadow-2xl active:bg-stone-500 transition duration-200 ease-in-out'>
                    Submit
                  </button>


                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
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