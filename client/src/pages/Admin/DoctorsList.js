import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import toast from "react-hot-toast";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status, id) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(`/api/admin/${id}`, {doctorId: record._id, userId: record.userId, status: status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message)
        getDoctorsData();
      }
    } catch (error) {
        toast.error("Error in changing doctor status")
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <p className="doc-name">
          {record.firstName} {record.lastName}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
    },
  ];

  return (
    <div>
      <Layout />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataIndex}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                {columns.map((column) => (
                  <TableCell key={column.dataIndex}>
                    {column.dataIndex === "actions" ? (
                      <div className="admin-actions">
                        {doctor.status.trim() === "pending" && <p onClick={()=>changeDoctorStatus(doctor, 'approved')}>Approve</p>}
                        {doctor.status.trim() === "approved" && <p onClick={()=>changeDoctorStatus(doctor, 'blocked')}>Block</p>}
                      </div>
                    ) : column.render ? (
                      column.render(doctor[column.dataIndex], doctor)
                    ) : (
                      doctor[column.dataIndex]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DoctorsList;
