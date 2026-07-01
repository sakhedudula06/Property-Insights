import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Menu from "../components/Menu.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
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
    const isAuthenticated = sessionStorage.getItem("access_token");

    if (isAuthenticated == null) {
      navigate("/login");
    } else {
      api
        .get("/payments")
        .then((res) => {
          setPaymentsData(res.data);
          console.log(res.data);
          console.log(Array.isArray(res.data));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tenants:", error);
          toast.error(error.message);
        });
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex relative flex-row mt-10 content-center gap-20">
          <Menu />
          <div className="flex w-2/4 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const statusCounts = (paymentsData || []).reduce(
    (acc, payment) => {
      const s = (payment.status || "").toLowerCase();
      if (s === "pending") acc.pending += 1;
      else if (s === "paid") acc.paid += 1;
      else if (s === "approved") acc.approved += 1;
      else acc.other += 1;
      return acc;
    },
    { pending: 0, paid: 0, approved: 0, other: 0 },
  );

  const paymentStatusChartData = {
    labels: ["Pending", "Paid", "Approved", "Other"],
    datasets: [
      {
        label: "Payments by Status",
        data: [
          statusCounts.pending,
          statusCounts.paid,
          statusCounts.approved,
          statusCounts.other,
        ],
        borderWidth: 1,
        hoverOffset: 4,
        backgroundColor: [
          "rgb(157, 182, 32)",
          "rgb(79, 107, 255)",
          "rgb(15, 23, 42)",
          "rgb(255, 255, 255)"
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex relative flex-row mt-10 content-center gap-20">
        <Menu />
        <div className="overflow-x-auto">
          <div>
            <p>Maintenance</p>
          </div>
          <div>
            <p>Payments</p>
            <div>
              <div style={{ width: 420, height: 320 }}>
                <Doughnut data={paymentStatusChartData} />
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
  );
};

export default Reports;
