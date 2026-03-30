import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../components/CustomSelect";

export default function RaiseRequest() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    vehicle_id: "",
    issue_type: "",
    description: "",
    location: "",
    latitude: "",
    longitude: ""
  });

  const issueOptions = [
    "puncture",
    "battery",
    "fuel",
    "tow",
    "engine",
    "accident"
  ];

  const raiseRequest = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/api/requests", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Request submitted 🚨");
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
          <input
            placeholder="Vehicle ID"
            onChange={(e) => setData({ ...data, vehicle_id: e.target.value })}
          />
        </div>

        <CustomSelect
          options={issueOptions}
          value={data.issue_type}
          placeholder="Select Issue Type"
          onChange={(selected) => setData({ ...data, issue_type: selected })}
        />

        <div className="input-group">
          <textarea
            placeholder="Describe your issue"
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Location"
            onChange={(e) => setData({ ...data, location: e.target.value })}
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