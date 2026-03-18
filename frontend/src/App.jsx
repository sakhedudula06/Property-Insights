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
//import toast from 'react-hot-toast'


const App = () => {
  return (
    <div data-theme="emarald">
      <Routes>
        <Route path='/dashboard' element ={<HomePage />} />
        <Route path='/forgetpass' element ={<ForgetPass />} />
        <Route path='/' element ={<Index />} />
        <Route path='/newuser' element={<NewUser />} />
        <Route path='/payments' element={<Payments />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/tenants' element={<Tenants />} />
      </Routes>
    </div>
  );
};

export default App