import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    vehicle_number: "",
    vehicle_type: "",
    brand: "",
    model: "",
    fuel_type: ""
  });

  const addVehicle = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/vehicles", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Vehicle added successfully 🚘");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to add vehicle");
      console.log(error);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🚘 Add Vehicle</h1>
        <h2>Store your vehicle for faster assistance</h2>

        <div className="input-group">
          <input
            placeholder="Vehicle Number"
            onChange={(e) => setData({ ...data, vehicle_number: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Vehicle Type (Bike / Car)"
            onChange={(e) => setData({ ...data, vehicle_type: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Brand"
            onChange={(e) => setData({ ...data, brand: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Model"
            onChange={(e) => setData({ ...data, model: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Fuel Type"
            onChange={(e) => setData({ ...data, fuel_type: e.target.value })}
          />
        </div>

        <button className="primary-btn" onClick={addVehicle}>
          Save Vehicle
        </button>
      </div>
    </div>
  );
}