import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Doctor from "../components/Doctor";

export default function Home(){
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch();
    const getData = async() => {

        try {
            dispatch(showLoading())
            const response = await axios.get('/api/user/get-all-approved-doctors', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            console.log(response.data);
            dispatch(hideLoading())
            if(response.data.success){
                setDoctors(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return <div>
    <Layout />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {doctors.map((doctor) => (
              <TableCell ><Doctor doctor={doctor}/></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table>
    </TableContainer>
  </div>;
}