import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Menu from "../components/Menu.jsx";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js";
import { Plus, X } from "lucide-react";

const Payments = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [notesValue, setNotesValue] = useState("");
  const [paymentsData, setPaymentsData] = useState(null);
  const [selectedProp, setSelectedProp] = useState("");
  const [selectedTenant, setSelectedTenant] = useState("");
  const [file, setFile] = useState(null);
  const [propData, setPropData] = useState(null);
  const [tenantsData, setTenantsData] = useState(null);
  const fileInputRef = useRef(null);
  const [amountValue, setAmountValue] = useState(1500);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("access_token");

    if (isAuthenticated == null) {
      navigate("/login");
    } else {
      api
        .get("/payments")
        .then((res) => {
          setPaymentsData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tenants:", error);
          toast.error(error.message);
        });

      api
        .get("/properties")
        .then((res) => {
          setPropData(res.data);
        })
        .catch((error) => {
          (console.error("Error fetching properties:", error),
            toast.error(error));
        });

      api
        .get("/tenants")
        .then((res) => {
          setTenantsData(res.data);
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

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleRegister(e) {
    try {
      e.preventDefault();

      if (!selectedTenant) {
        toast.error("Please select a tenant");
        return;
      }
      if (!selectedProp) {
        toast.error("Please select a property");
        return;
      }

      let fileName = null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await api.post("/payments/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fileName = uploadRes.data.fileName;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const lastDayOfNextMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 2,
        0,
      );
      const nextMonth = String(lastDayOfNextMonth.getMonth() + 1).padStart(
        2,
        "0",
      );
      const nextDay = String(lastDayOfNextMonth.getDate()).padStart(2, "0");

      await api.post("/payments/insert", {
        tenant_id: Number(selectedTenant),
        property_id: Number(selectedProp),
        amount: Number(amountValue),
        paid_date: `${year}-${month}-${day}`,
        status: "paid",
        notes: notesValue,
        proof_file: fileName,
        next_due_date: `${year}-${nextMonth}-${nextDay}`,
      });

      // const { data, error } = await supabase.storage.from('bucket_name').upload(file, file)
      // if (error) {
      //   // Handle error
      // } else {
      //   // Handle success
      // }

      toast.success("Payment recorded successfully");
      setNotesValue("");
      setFile(null);
      setSelectedTenant("");
      setSelectedProp("");
      document.getElementById("my_modal_1").close();

      const paymentsRes = await api.get("/payments");
      setPaymentsData(paymentsRes.data);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Failed";
      toast.error(errorMsg);
      console.error("Failed!", error);
    }
  }

  const handleSelectedTenant = (event) => {
    setSelectedTenant(event.target.value);
  };

  const handleSelectedProp = (event) => {
    setSelectedProp(event.target.value);
  };

  const handleApprovement = async (paymentId) => {
    try {
      await api.patch(`/payments/update/${paymentId}`, {
        status: "paid",
      });

      toast.success("Payment approved successfully");
      window.location.reload();
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || "Failed";
      toast.error(errorMsg);
      console.error("Failed!", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex relative flex-row mt-10 content-center gap-20">
        <Menu />
        <div className="overflow-x-auto">
          <table className="table w-full text-xl">
            <thead>
              <tr>
                <th></th>
                <th>Tenant Name</th>
                <th>Unit</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            {paymentsData &&
              paymentsData.map((payments) => (
                <tbody key={payments.id}>
                  <tr className="hover">
                    <th>{payments.id}</th>
                    <td>{payments.tenant_id?.tenant_name}</td>
                    <td>{payments.property_id?.name}</td>
                    <td>R{payments.amount}</td>
                    <td>{payments.notes}</td>
                    <td>{payments.completed_at}</td>
                    <td>{payments.status}</td>
                    <td>
                      {payments.status === "pending" && (
                        <button
                          className="btn"
                          onClick={() => handleApprovement(payments.id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>

          <div className="mt-7">
            <button
              className="btn btn-success flex flex-row"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <Plus />
              Add
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white">
                <form onSubmit={handleRegister}>
                  <p className="font-bold text-xl mb-5">Reference</p>
                  <div className="border-2 p-4 rounded-lg flex gap-7 mb-12">
                    <input
                      onChange={(e) => setNotesValue(e.target.value)}
                      value={notesValue}
                      name="Full Name"
                      type="text"
                      placeholder="description"
                      className="w-full h-full border-none focus:outline-none"
                      required
                    ></input>
                  </div>

                  <p className="font-bold text-xl mb-5">Amount</p>
                  <div className="border-2 p-4 rounded-lg flex gap-7 mb-12">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="Amount"
                      placeholder="0.00"
                      value={amountValue}
                      onChange={(e) => setAmountValue(e.target.value)}
                      className="w-full h-full text-[rgb(161,161,161)] border-none focus:outline-none"
                      required
                    ></input>
                  </div>

                  <p className="font-bold text-xl mb-5">Tenant</p>
                  <select
                    className="select w-full max-w-max"
                    value={selectedTenant}
                    onChange={handleSelectedTenant}
                    required
                  >
                    <option>Tenants</option>
                    {tenantsData &&
                      tenantsData.map((tenants) => (
                        <option key={tenants.id} value={tenants.id}>
                          {tenants.tenant_name}
                        </option>
                      ))}
                  </select>

                  <p className="font-bold text-xl mb-5 mt-10">Property</p>
                  <select
                    className="select w-full max-w-max"
                    value={selectedProp}
                    onChange={handleSelectedProp}
                    required
                  >
                    <option>Properties</option>
                    {propData &&
                      propData.map((property) => (
                        <option key={property.id} value={property.id}>
                          {`${property.name} - ${property.is_occupied ? "Occupied" : "Vacant"}`}
                        </option>
                      ))}
                  </select>

                  <p className="font-bold text-xl mb-5 mt-10">POP</p>
                  <div className="border-2 p-4 rounded-lg flex gap-7 mb-12">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="w-full h-full text-[rgb(161,161,161)] border-none focus:outline-none"
                      required
                    />
                    <X className="cursor-pointer" onClick={handleRemoveFile} />
                  </div>

                  <button
                    type="submit"
                    className="flex bg-stone-400 text-secondary-content gap-7 justify-center text-3xl items-center p-5 mt-14 rounded-lg w-full hover:shadow-2xl active:bg-stone-500 transition duration-200 ease-in-out"
                  >
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
  );
};

export default Payments;
