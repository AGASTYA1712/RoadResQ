import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/requests/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRequests(res.data);
    } catch (error) {
      console.error("Fetch requests failed:", error.response?.data || error.message);
      const errorBody = error.response?.data;
      const errorText =
        typeof errorBody === "string"
          ? errorBody
          : errorBody?.message
          ? errorBody.message
          : errorBody
          ? JSON.stringify(errorBody)
          : error.message || "Failed to fetch requests";
      alert(errorText);
    }
  };

  return (
    <div className="list-container">
      <div className="list-inner">
        <h1 className="list-title">📋 My Requests</h1>

        {requests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No requests found</p>
        ) : (
          requests.map((req) => (
            <div className="request-card" key={req.id}>
              <span className="badge">{req.issue_type}</span>

              <p><strong>Vehicle:</strong> {req.vehicle_number}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Date:</strong> {req.created_at}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}