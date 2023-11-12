import { cibExpertsExchange } from "@coreui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Actions() {
  
  const [recentData, setRecentData] = useState([]);
  const [initialRecentData, setInitialRecentData] = useState([]);

  useEffect(() => {
    loadRecentData();
    // Kiểm tra dữ liệu mới mỗi 5 giây
    const intervalId = setInterval(() => {
      loadRecentData();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadRecentData = async () => {
    const result = await axios.get(
      "http://localhost:3001/api/recentActionData"
    );
    setRecentData(result.data);
    setInitialRecentData(result.data);
  };

  const recentDataToDisplay = recentData.slice(0, 10);

  return (
    <div className="container mt-3" style={{ backgroundColor: "#white" }}>
      <h2 className="text-center">Actions</h2>
      <table className="table table-striped border table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>N/O</th>
            <th>Action ID</th>
            <th>Action</th>
            <th>Led Name</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {recentDataToDisplay.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
                  <td>{item.id}</td>
                  <td>{item.action}</td>
                  <td>{item.led_name}</td>
                  <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Actions;
