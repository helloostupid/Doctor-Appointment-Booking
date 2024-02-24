import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (event) => {
    
    event.preventDefault();

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
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
    <div className="authentication">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="Login" />
        <CardContent>
          <Box
            component="form"
            onSubmit={onFinish}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="inputs">
              <TextField required id="email" label="Email" type="email" />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <CardActions>
              <Button size="small" type="submit">
                Login
              </Button>
              <Link to="/register">
                <Button size="small">New here?</Button>
              </Link>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
