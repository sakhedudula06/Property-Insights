import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import { Plus, Trash, Pencil } from 'lucide-react'
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
  const [rentAmount, setRentAmount] = useState(1500);
  const [editingTenantId, setEditingTenantId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('access_token');

    if (isAuthenticated == null) {
      navigate('/login');
    } else {
      api.get('/tenants')
        .then(res => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tenants:', error);
          toast.error(error.message);
        });
    }
  }, [navigate]);



  function getPropData() {
    api.get('/properties')
      .then(res => {
        setPropData(res.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error
        ), toast.error(error)
      });
  }

  const handleSelectedProp = (event) => {
    setSelectedProp(event.target.value);
  }

  const handleEditClick = (tenant) => {
    setEditingTenantId(tenant.id);
    setEditFormData({
      tenant_name: tenant.tenant_name,
      email: tenant.email,
      contact: tenant.contact
    });
  }

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const handleSaveEdit = async () => {
    try {
      await api.patch(`/tenants/update/${editingTenantId}`, editFormData);
      toast.success('Tenant updated successfully');
      setEditingTenantId(null);
      const tenantsRes = await api.get('/tenants');
      setData(tenantsRes.data);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Failed to update";
      toast.error(errorMsg);
    }
  }

  const handleCancelEdit = () => {
    setEditingTenantId(null);
    setEditFormData({});
  }

  const handleDeleteTenant = async (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await api.delete(`/tenants/delete/${tenantId}`);
        toast.success('Tenant deleted successfully');
        const tenantsRes = await api.get('/tenants');
        setData(tenantsRes.data);
      } catch (error) {
        const errorMsg = error.response?.data?.error || error.message || "Failed to delete";
        toast.error(errorMsg);
      }
    }
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

  // function editAndDelete() {
  //   return (
  //     <div>
  //       <Pencil />
  //       <Trash />
  //     </div>

  //   )
  // }

  async function handleRegister(e) {
    try {
      e.preventDefault();

      const selectedProperty = propData?.find(prop => prop.id === Number(selectedProp));
      if (selectedProperty?.is_occupied === true) {
        toast.error('Property is occupied');
        return;
      }

      if (!selectedProp) {
        toast.error('Please select a property');
        return;
      }
      if (!propData?.length) {
        toast.error('No properties available');
        return;
      }

      const request = await api.post('/tenants/insert', {
        'tenant_name': nameValue,
        'email': emailValue,
        'contact': contactValue,
        'property_id': Number(selectedProp),
        'amount_due': 0
      })


      await api.post('/properties/insert', {
        'tenant_id': request.data?.tenant_id,
        'name': selectedProp,
        'is_occupied': true
      })

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      const lastDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      const nextMonth = String(lastDayOfNextMonth.getMonth() + 1).padStart(2, '0');
      const nextDay = String(lastDayOfNextMonth.getDate()).padStart(2, '0');

      await api.post('/payments/insert', {
        'tenant_id': request.data?.tenant_id,
        'property_id': Number(selectedProp),
        'amount': rentAmount,
        'paid_date': `${year}-${month}-${day}`,
        'status': 'paid',
        'notes': 'Monthly rent payment',
        'next_due_date': `${year}-${nextMonth}-${nextDay}`
      })

      setNameValue('');
      setEmailValue('');
      setContactValue('');
      setSelectedProp('');
      document.getElementById('my_modal_1').close();
      toast.success('Tenant added successfully');

      const tenantsRes = await api.get('/tenants');
      setData(tenantsRes.data);

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
          <table className="table w-full text-xl">

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
                <tr className="hover" onMouseOver={() => { }}>
                  <th>{tenant.id}</th>
                  <td>{tenant.tenant_name}</td>
                  <td>R{tenant.amount_due}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.contact}</td>
                  <td>{tenant.property_id?.name}</td>
                  <td className="flex gap-2">
                    <Pencil className="cursor-pointer p-2 rounded hover:bg-gray-200 w-8 h-8" onClick={() => handleEditClick(tenant)}/>
                    <Trash className="cursor-pointer p-2 rounded hover:bg-gray-200 w-8 h-8" onClick={() => handleDeleteTenant(tenant.id)}/>
                  </td>
                </tr>
                {editingTenantId === tenant.id && (
                  <tr className="bg-blue-50">
                    <td colSpan="7">
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-4">Edit Tenant</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block font-semibold mb-2">Name</label>
                            <input 
                              type="text" 
                              value={editFormData.tenant_name} 
                              onChange={(e) => handleEditFormChange('tenant_name', e.target.value)}
                              className="w-full border-2 p-2 rounded"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-2">Email</label>
                            <input 
                              type="email" 
                              value={editFormData.email} 
                              onChange={(e) => handleEditFormChange('email', e.target.value)}
                              className="w-full border-2 p-2 rounded"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-2">Contact</label>
                            <input 
                              type="text" 
                              value={editFormData.contact} 
                              onChange={(e) => handleEditFormChange('contact', e.target.value)}
                              className="w-full border-2 p-2 rounded"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={handleSaveEdit} className="btn btn-success">Save</button>
                          <button onClick={handleCancelEdit} className="btn btn-outline">Cancel</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
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
                    <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} type='email' name='Email' placeholder='Enter email' className='w-full h-full border-none focus:outline-none' required>
                    </input>
                  </div>

                  <p className='font-bold text-xl mb-5'>Contact</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input onChange={(e) => setContactValue(e.target.value)} type='text' name='Email' placeholder='eg. 071-000-0000' className='w-full h-full border-none focus:outline-none' required>
                    </input>
                  </div>

                  <p className='font-bold text-xl mb-5'>Rent</p>
                  <div className='border-2 p-4 rounded-lg flex gap-7 mb-12'>
                    <input type='text' name='Amount' placeholder='0.00' value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} className='w-full h-full text-[rgb(161,161,161)] border-none focus:outline-none'>
                    </input>
                  </div>

                  <p className='font-bold text-xl mb-5A'>Property</p>
                  <select className="select w-full max-w-max" value={selectedProp} onChange={handleSelectedProp}>

                    <option value="">Properties</option>
                    {propData && propData.map(property => (

                      <option key={property.id} value={property.id}>
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