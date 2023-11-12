import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import moment from "moment";

import {
  BsThermometerHalf,
  BsDropletHalf,
  BsBrightnessHighFill,
  BsLightbulbOff,
  BsLightbulb,
  BsFillLightbulbFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { HiOutlineLightBulb, HiOutlineLightBulbOff } from "react-icons/hi";
import { TbBulbOff } from "react-icons/tb";
import fanImage from "./image/hell_bound_fan_by_damikel-dauk9ee.png";
import turnOn from "./image/turnon.png";
import turnOff from "./image/turnoff.png";

import axios from "axios";

function Home() {
  const [latestData, setLatestData] = useState([]);

  const [initialLatestData, setInitialLatestData] = useState([]);

  useEffect(() => {
    loadLatestData();
    // Kiểm tra dữ liệu mới mỗi 5 giây
    const latestDataIntervalId = setInterval(() => {

      loadLatestData();
      
      
    }, 1000);
    return () => {
      clearInterval(latestDataIntervalId);
    };
  }, []);
  

  const loadLatestData = async () => {
    const result = await axios.get(
      "http://localhost:3001/api/latestSensorData"
    );
    setLatestData(result.data);
    setInitialLatestData(result.data);
    console.log(latestData);

    
  };

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

  const [led1Status, setLed1Status] = useState("off");
  const [led2Status, setLed2Status] = useState("off");

  const sendControlCommand = (ledId, action) => {
    axios
      .post("http://localhost:3001/api/controlLed", { ledId, action })
      .then((response) => {
        if (response.data.success) {
          console.log(`Đã ${action === "on" ? "bật" : "tắt"} đèn ${ledId}`);
        } else {
          console.error("Lỗi khi điều khiển đèn LED");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu đến server:", error);
      });
  };

  const [isOn, setIsOn] = useState(false);

  const toggleLed1 = () => {
    setIsOn(!isOn);
    const newStatus = led1Status === "on" ? "off" : "on";
    setLed1Status(newStatus);
    sendControlCommand("led1", newStatus);
  };
  const [isOn1, setIsOn1] = useState(false);

  const toggleLed2 = () => {
    setIsOn1(!isOn1);
    const newStatus = led2Status === "on" ? "off" : "on";
    setLed2Status(newStatus);
    sendControlCommand("led2", newStatus);
  };

  const cardStyle = {
    height: "200px", // Chiều cao mong muốn, bạn có thể điều chỉnh theo nhu cầu
  };


  return (
    <div className="container mt-3">
    <div className="row">
      <div className="col-md-4 mb-4">
        <div
          className={`card card-square ${
            latestData.temperature > 35 ? "high-temperature" : ""
          } `}
          style={cardStyle}
        >
          <div className="card-inner">
            <h3>TEMPERATURE {latestData.temperature > 35 ? "" : ""}</h3>
            <BsThermometerHalf className="card_icon" />
          </div>

          <div className="toggle-button-container">
            <h1>{latestData.temperature}°C</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div
          className={`card card-square ${
            latestData.humidity < 30 ? "low-humidity" : ""
          } `}
          style={cardStyle}
        >
          <div className="card-inner">
            <h3>HUMIDITY</h3>
            <BsDropletHalf className="card_icon" />
          </div>

          <div className="toggle-button-container">
            <h1>{latestData.humidity}%</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div
          className={`card card-square ${
            latestData.light > 2000
              ? "high-light"
              : latestData.light < 1000
              ? "low-light"
              : ""
          }`}
          style={cardStyle}
        >
          <div className="card-inner">
            <h3>LIGHT</h3>
            <BsBrightnessHighFill className="card_icon" />
          </div>
          <div className="toggle-button-container">
            <h1>{latestData.light} LUX</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div
        className="col-md-8 mb-1"
        style={{ display: "flex", flexDirection: "column" }}
      >
          <div className="card card-square" style={cardStyle}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={recentDataToDisplay} // Sử dụng recentDataToDisplay thay vì recentData
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 " />
                <XAxis
                  dataKey="timestamp"
                  tick={{ fill: "black" }}
                  tickFormatter={(tick) =>
                    moment(tick).format("YYYY-MM-DD HH:mm:ss")
                  }
                />
                <YAxis tick={{ fill: "black" }} />
               <Tooltip
                  labelFormatter={(timestamp) =>
                    moment(timestamp).format("YYYY-MM-DD HH:mm:ss")
                  }
                />
                <Legend iconSize={10} iconType="rect" />
                

                <Line
                  type="monotone"
                  dataKey="temperature"
                  name="Temperature (°C)"
                  stroke="#FF0000"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  name="Humidity (%)"
                  stroke="#005b96"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="light"
                  name="Light (LUX)"
                  stroke="#FFA500"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-4 mb-1">
          <div className="card card-square" style={cardStyle}>
            <div className={`card-inner ${isOn ? "on" : "off"}`}>
              {/* <h3>LED 1</h3> */}
              {/* <HiOutlineLightBulb className="button_icon" /> */}
              {isOn ? (
                <img
                  src="https://4.bp.blogspot.com/-d_s-yyAd0Fc/WwTEuVadFWI/AAAAAAAAO38/7t6KeVQcW90NZbG0ztdFfNKBKnw5QiHwQCLcBGAs/s1600/hell_bound_fan_by_damikel-dauk9ee.gif"
                  className="button_icon"
                  width="100"
                  height="100"
                />
              ) : (
                <img
                  src={fanImage}
                  className="button_icon"
                  width="100"
                  height="100"
                />
              )}
            </div>
            <div className={`toggle-button-container ${isOn ? "on" : "off"}`}>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  className="toggle-input"
                  onChange={toggleLed1}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="card card-square mt-4" style={cardStyle}>
            <div className={`card-inner ${isOn1 ? "on" : "off"}`}>
              {/* <h3>LED 2</h3> */}

              {isOn1 ? (
                <img
                  src={turnOn}
                  className="button_icon"
                  width="60"
                  height="80"
                />
              ) : (
                <img
                  src={turnOff}
                  className="button_icon"
                  width="60"
                  height="80"
                />
              )}
            </div>
            <div className={`toggle-button-container ${isOn1 ? "on" : "off"}`}>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  className="toggle-input"
                  onChange={toggleLed2}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
