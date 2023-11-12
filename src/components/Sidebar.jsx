import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsPersonCircle,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">Dashboard</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/profile">
            <BsPersonCircle className="icon" /> Profile
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/datasensor">
            <BsFillGrid3X3GapFill className="icon" /> Data Sensor
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="/actions">
            <BsPeopleFill className="icon" /> Action
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
