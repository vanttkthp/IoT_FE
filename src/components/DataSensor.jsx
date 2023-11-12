import { cibExpertsExchange } from "@coreui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
function DataSensor() {

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
      "http://localhost:3001/api/recentSensorData"
    );
    setRecentData(result.data);
    setInitialRecentData(result.data);
  };

  const recentDataToDisplay = recentData.slice(0, 10);
  return (
    <div className="container mt-3" style={{ backgroundColor: "#white" }}>
      <h2 className="text-center">Data Sensor</h2>
      <table className="table table-striped border table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">N/O</th>
            <th scope="col">ID</th>
            <th scope="col">Temperature</th>
            <th scope="col">Humidity</th>
            <th scope="col">Light</th>
          </tr>
        </thead>
        <tbody>
          {recentDataToDisplay.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.id}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
              <td>{moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DataSensor;
