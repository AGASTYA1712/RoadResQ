import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>✨ Join RoadResQ</h1>
        <h2>Create your emergency assistance account</h2>

        <div className="input-group">
          <input
            placeholder="Full Name"
            onChange={(e) => setData({ ...data, full_name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Phone Number"
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button className="primary-btn" onClick={register}>
          Create Account
        </button>

        <p className="link-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}