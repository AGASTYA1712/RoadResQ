import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RaiseRequest() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [data, setData] = useState({
    vehicle_id: "",
    issue_type: "",
    description: "",
    location_text: "",
    latitude: "",
    longitude: ""
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVehicles(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load vehicles");
    }
  };

  const raiseRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/api/requests", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Request raised successfully 🚨");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to raise request");
      console.log(error);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🆘 Raise Request</h1>
        <h2>Get instant roadside assistance</h2>

        <div className="input-group">
          <select
            onChange={(e) => setData({ ...data, vehicle_id: e.target.value })}
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicle_number} - {vehicle.brand} {vehicle.model}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <select
            onChange={(e) => setData({ ...data, issue_type: e.target.value })}
          >
            <option value="">Select Issue</option>
            <option value="Puncture">Puncture</option>
            <option value="Battery">Battery</option>
            <option value="Fuel Delivery">Fuel Delivery</option>
            <option value="Engine Breakdown">Engine Breakdown</option>
            <option value="Towing">Towing</option>
          </select>
        </div>

        <div className="input-group">
          <textarea
            placeholder="Describe your issue"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Enter Location"
            onChange={(e) => setData({ ...data, location_text: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Latitude"
            onChange={(e) => setData({ ...data, latitude: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Longitude"
            onChange={(e) => setData({ ...data, longitude: e.target.value })}
          />
        </div>

        <button className="primary-btn" onClick={raiseRequest}>
          Submit Request
        </button>
      </div>
    </div>
  );
}