import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";

function Navbar() {
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  const userMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Appointments",
      path: "/appointments",
    },
    {
      name: "Apply",
      path: "/apply-doctor",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Users",
      path: "/admin/userslist",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Appointments",
      path: "/appointments",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <nav className="nav container">
      <div className="logo">Medicare</div>
      <div id="nav__menu" className={clicked ? "active" : ""}>
        <ul className="nav__list">
          {menuToBeRendered.map((menuItem) => {
            const isActive = location.pathname === menuItem.path;

            const menuLabel =
              menuItem.name === "Profile" ? user?.name : menuItem.name;

            return (
              <li className="nav__item" key={menuItem.path}>
                <Link
                  to={menuItem.path}
                  className={`nav__link ${isActive ? "active-link" : ""}`}
                >
                  {menuLabel}
                </Link>
              </li>
            );
          })}
          <li
            className="nav__item"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <Link to="/login" className="nav__link">
              Logout
            </Link>
          </li>
          <li className="nav__item notif-icon">
            <Badge badgeContent={user?.unseenNotifications.length} color="primary" onClick={()=>navigate("/notifications")}>
              <i className="bx bx-bell icon"></i>
            </Badge>
          </li>
        </ul>
      </div>

      <div id="mobile" onClick={handleClick}>
        <i
          id="bar"
          className={clicked ? "bx bx-exit icon" : "bx bx-list-ul icon"}
        ></i>
      </div>
    </nav>
  );
}

export default Navbar;
