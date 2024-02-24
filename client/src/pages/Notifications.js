import React from "react";
import Layout from "../components/Layout";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const [value, setValue] = React.useState("1");
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/mark-all-notifications-as-seen", {
        userId: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/delete-all-notifications", {
        userId: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Layout />
      <h1 className="page-heading">Notifications</h1>
      <hr></hr>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Unseen" value="1" />
              <Tab label="Seen" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="notif-action">
              <p className="anchor" onClick={()=>markAllAsSeen()}>Mark all as read</p>
            </div>

            {user?.unseenNotifications.map((notification) => (
              <div
                className="notif-text"
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </div>
            ))}
          </TabPanel>
          <TabPanel value="2">
          <div className="notif-action">
              <p className="anchor" onClick={()=>deleteAll()}>Delete all</p>
            </div>

            {user?.seenNotifications.map((notification) => (
              <div
                className="notif-text"
                onClick={() => navigate(notification.onClickPath)}
              >
                {notification.message}
              </div>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Notifications;
