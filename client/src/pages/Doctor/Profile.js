import React, { useState,  useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import Layout from "../../components/Layout";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null)

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
      const response = await axios.post("/api/doctor/update-doctor-profile", {
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

  const getDoctorData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id", {
          userId: params.userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      if(response.data.success){
        setDoctor(response.data.data)
      }
      
    } catch (error) {
      dispatch(hideLoading())
      
    }
  };

  useEffect(() => {
    
      getDoctorData();
    
  }, []);

  return (
    <div>
      <Layout />
      <h1 className="page-heading">Doctor Profile</h1>
      <hr></hr>
      {doctor && <DoctorForm onFinish={onFinish} initialvalues={doctor}/>}
    </div>
  )
}

export default Profile