import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Menu from '../components/Menu.jsx'
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  defaults,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


const Reports = () => {

  const [paymentsData, setPaymentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('access_token');

    if (isAuthenticated == null) {
      navigate('/login');
    } else {
      api.get('/payments')
        .then(res => {
          setPaymentsData(res.data);
          setIsLoading(false);
        }).catch(error => {
          console.error('Error fetching tenants:', error);
          toast.error(error.message);
        })
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
          <div>
            <p>Maintenance</p>
          </div>
          <div>
            <p>Payments</p>
            <div>
              <div>

                {paymentsData && paymentsData.map(paymentsData =>(
                  <Line
                  data={
                    {
                      labels: []
                    }
                  }
                />
                ))}
                
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>

          </div>
          <div>
            <p>Maintenance</p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Reports