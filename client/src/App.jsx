import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import RaiseRequest from "./pages/RaiseRequest";
import MyRequests from "./pages/MyRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/raise-request" element={<RaiseRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
      </Routes>
    </Router>
  );
}

export default App;