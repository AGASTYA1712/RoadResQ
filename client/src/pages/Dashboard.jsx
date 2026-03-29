import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-wrap">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>🚗 RoadResQ Dashboard</h1>
          <p>Welcome back, {user?.full_name || "User"} 👋</p>
        </div>

        <div className="dashboard-grid">
          <Link to="/add-vehicle" className="dashboard-box">
            <h3>🚘 Add Vehicle</h3>
            <p>Save your vehicle details for quick emergency assistance.</p>
          </Link>

          <Link to="/raise-request" className="dashboard-box">
            <h3>🆘 Raise Request</h3>
            <p>Request immediate help for breakdowns and roadside issues.</p>
          </Link>

          <Link to="/my-requests" className="dashboard-box">
            <h3>📋 My Requests</h3>
            <p>Track all your previous and active service requests.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}