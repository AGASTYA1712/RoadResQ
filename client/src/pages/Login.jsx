import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Success");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🚗 RoadResQ</h1>
        <h2>Emergency roadside help, when you need it.</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button className="primary-btn" onClick={login}>
          Login
        </button>

        <p className="link-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}