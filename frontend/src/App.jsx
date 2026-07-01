import React from 'react'
import { Route, Routes } from 'react-router'
import ForgetPass from './pages/ForgetPass.jsx'
import HomePage from './pages/HomePage.jsx'
import Index from './pages/Index.jsx'
import NewUser from './pages/NewUser.jsx'
import Payments from './pages/Payments.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import Tenants from './pages/Tenants.jsx'
import Roles from './pages/Roles.jsx'
import Properties from './pages/Properties.jsx'
//import toast from 'react-hot-toast'


const App = () => {
  return (
    <div data-theme="emarald">
      <Routes>
        <Route path='/dashboard/properties' element={<Properties />} />
        <Route path='/dashboard' element ={<HomePage />} />
        <Route path='/passwordreset' element ={<ForgetPass />} />
        <Route path='/login' element ={<Index />} />
        <Route path='/register' element={<NewUser />} />
        <Route path='/dashboard/payments' element={<Payments />} />
        <Route path='/dashboard/reports' element={<Reports />} />
        <Route path='/dashboard/settings' element={<Settings />} />
        <Route path='/dashboard/tenants' element={<Tenants />} />
        <Route path='/' element={<Roles />} />
      </Routes>
    </div>
  );
};

export default App