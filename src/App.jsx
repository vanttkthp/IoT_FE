import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Sử dụng phiên bản mới
import DataSensor from "./components/DataSensor";
import Action from "./components/Action";


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    
    <BrowserRouter>
      <div>
        <Header />
        
        
        <div className="grid-container">
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/datasensor" element={<DataSensor/>} />
            <Route path="/actions" element={<Action/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
