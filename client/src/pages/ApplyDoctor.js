import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import Layout from "../components/Layout";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (event) => {
    event.preventDefault();

    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const email = event.target.elements.email.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    const address = event.target.elements.address.value;
    const specialization = event.target.elements.specialization.value;
    const experience = event.target.elements.experience.value;
    const feePerConsultation = event.target.elements.feePerConsultation.value;
    const timings = event.target.elements.timings.value;

    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/apply-doctor-account", {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        specialization,
        experience,
        feePerConsultation,
        timings,
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout />
      <h1 className="page-heading">Apply</h1>
      <hr></hr>
      <DoctorForm onFinish={onFinish}/>
    </div>
    
  );
}

export default ApplyDoctor;
